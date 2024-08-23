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
  charactersMap: { [key: string]: Character[] } = {};

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
    this.episodes.results?.forEach(episode => {
      const ids = episode.characters
        ?.map(character => character.split('/').pop())
        .filter((id): id is string => !!id);

      this._charactersService.getCharactersByIds(ids!).subscribe(response => {
        if (Array.isArray(response)) this.charactersMap[episode.id!] = response;
        else this.charactersMap[episode.id!] = [response];
      });
    });
  }
}
