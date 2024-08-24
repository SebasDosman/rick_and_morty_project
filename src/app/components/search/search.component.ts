import { Component, OnInit } from '@angular/core';
import { CharacterFilter } from 'src/app/models/character-filter.model';
import { Character } from 'src/app/models/character.model';
import { EpisodeFilter } from 'src/app/models/episode-filter.model';
import { Episode } from 'src/app/models/episode.model';
import { LocationFilter } from 'src/app/models/location-filter.model';
import { Location } from 'src/app/models/location.model';
import { CharactersService } from 'src/app/services/characters.service';
import { EpisodesService } from 'src/app/services/episodes.service';
import { LocationsService } from 'src/app/services/locations.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent  implements OnInit {
  results: { characters?: Character[], episodes?: Episode[], locations?: Location[] } = {};

  constructor(
    private _charactersService: CharactersService,
    private _episodesService: EpisodesService,
    private _locationsService: LocationsService
  ) { }

  ngOnInit() {}

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm && searchTerm.trim() !== '') {
      const characterFilter: CharacterFilter = { name: searchTerm };
      const episodeFilter: EpisodeFilter = { name: searchTerm };
      const locationFilter: LocationFilter = { name: searchTerm };

      this._charactersService.getCharactersByFilter(characterFilter).subscribe(response => {
        this.results.characters = response.results;
      });

      this._episodesService.getEpisodesByFilter(episodeFilter).subscribe(response => {
        this.results.episodes = response.results;
      });

      this._locationsService.getLocationsByFilter(locationFilter).subscribe(response => {
        this.results.locations = response.results;
      });
    } else {
      this.results = {};
    }
  }
}
