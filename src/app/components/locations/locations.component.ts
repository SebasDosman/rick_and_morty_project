import { Component, OnInit } from '@angular/core';
import { Locations } from 'src/app/models/locations.model';
import { Character } from 'src/app/models/character.model';
import { LocationsService } from 'src/app/services/locations.service';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit {
  locations: Locations = new Locations();
  charactersMap: { [key: string]: Character[] } = {};

  constructor(
    private _locationsService: LocationsService,
    private _charactersService: CharactersService
  ) { }

  ngOnInit() {
    this.loadLocations();
  }

  private loadLocations() {
    this._locationsService.getLocations().subscribe(response => {
      this.locations = response;
      this.loadCharacters();
    });
  }

  private loadCharacters() {
    this.locations.results?.forEach(location => {
      const ids = location.residents
        ?.map(character => character.split('/').pop())
        .filter((id): id is string => !!id);

      this._charactersService.getCharactersByIds(ids!).subscribe(response => {
        if (Array.isArray(response)) this.charactersMap[location.id!] = response;
        else this.charactersMap[location.id!] = [response];
      });
    });
  }
}
