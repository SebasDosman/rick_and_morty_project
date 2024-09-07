import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Character } from 'src/app/models/character.model';
import { Episode } from 'src/app/models/episode.model';
import { CharactersService } from 'src/app/services/characters.service';
import { EpisodesService } from 'src/app/services/episodes.service';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
})
export class EpisodesComponent  implements OnInit {
  episodes: Episode[] = [];
  charactersMap: { [key: string]: Character[] } = {};
  currentPage: number = 1;
  MAX_PAGES: number = 3;
  expandedEpisodes: Set<number> = new Set();

  constructor(
    private _episodesService: EpisodesService,
    private _charactersService: CharactersService,
    private _modalController: ModalController,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.loadEpisodes(this.currentPage);
  }

  private loadEpisodes(page: number) {
    this._episodesService.getEpisodesByPage(page).subscribe(response => {
      if (response.results) this.episodes = [...this.episodes, ...response.results];
      this.loadCharacters();
    });
  }

  private loadCharacters() {
    this.episodes?.forEach(episode => {
      const ids = episode.characters
        ?.map(character => character.split('/').pop())
        .filter((id): id is string => !!id);

      this._charactersService.getCharactersByIds(ids!).subscribe(response => {
        if (Array.isArray(response)) this.charactersMap[episode.id!] = response;
        else this.charactersMap[episode.id!] = [response];
      });
    });
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    if (this.currentPage < this.MAX_PAGES) {
      this.currentPage++;
      this.loadEpisodes(this.currentPage);
    } else {
      event.target.disabled = true;
    }

    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  toggleCharacters(episodeId: number) {
    if (this.expandedEpisodes.has(episodeId)) {
      this.expandedEpisodes.delete(episodeId); 
    } else {
      this.expandedEpisodes.add(episodeId); 
    }
  }
  
  isExpanded(episodeId: number): boolean {
    return this.expandedEpisodes.has(episodeId);
  }

  openModal(character: Character) {
    this._modalController.create({
      component: ModalComponent,
      componentProps: {
        character: character
      }
    }).then(modal => modal.present());
  }

  openCharacter(characterId: number) {
    this._router.navigate(['/tab6', characterId]);
  }
}
