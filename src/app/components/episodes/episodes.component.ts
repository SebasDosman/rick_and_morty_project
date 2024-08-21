import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { Episodes } from 'src/app/models/episodes.model';
import { CharactersService } from 'src/app/services/characters.service';
import { EpisodesService } from 'src/app/services/episodes.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss'],
})
export class EpisodesComponent  implements OnInit {
  episodes: Episodes = new Episodes();
  characters: Character[] = [];

  constructor(
    private _episodesService: EpisodesService,
    private _charactersService: CharactersService
  ) { }

  ngOnInit() {
    this.loadEpisodes();
  }

  private loadEpisodes() {
    this._episodesService.getEpisodes().subscribe(response => {
      this.episodes = response;
      this.loadCharacters();
    });
  }

  private loadCharacters() {
    const characterIdsList: string[] = [];

    this.episodes.results?.forEach(episode => {
      const ids = episode.characters
        ?.map(character => character.split('/').pop())
        .filter((id): id is string => !!id);

      if (ids) characterIdsList.push(...ids);
    });

    const uniqueIds = Array.from(new Set(characterIdsList));

    if (uniqueIds.length) {
      this._charactersService.getCharactersByIds(uniqueIds).subscribe(response => {
        if (Array.isArray(response)) this.characters = response;
      });
    }
  }
}
