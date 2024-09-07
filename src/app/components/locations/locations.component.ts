import { Component, NgModule, OnInit } from '@angular/core';
import { Locations } from 'src/app/models/locations.model';
import { Character } from 'src/app/models/character.model';
import { LocationsService } from 'src/app/services/locations.service';
import { CharactersService } from 'src/app/services/characters.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { Location } from 'src/app/models/location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})

export class LocationsComponent implements OnInit {
  locations: Location[] = [];
  charactersMap: { [key: string]: Character[] } = {};
  currentPage: number = 1;
  MAX_PAGES: number = 7;
  expandedLocations: Set<number> = new Set();

  constructor(
    private _locationsService: LocationsService,
    private _charactersService: CharactersService,
    private _modalController: ModalController,
    private _router: Router
  ) {}

  ngOnInit() {
    this.loadLocations(this.currentPage);
  }

  private loadLocations(page: number) {
    this._locationsService.getLocationsByPage(page).subscribe((response) => {
      if (response.results)
        this.locations = [...this.locations, ...response.results];
      this.loadCharacters();
    });
  }

  private loadCharacters() {
    this.locations?.forEach((location) => {
      const ids = location.residents
        ?.map((character) => character.split('/').pop())
        .filter((id): id is string => !!id);

      this._charactersService.getCharactersByIds(ids!).subscribe((response) => {
        if (Array.isArray(response)) this.charactersMap[location.id!] = response;
        else this.charactersMap[location.id!] = [response];
      });
    });
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    if (this.currentPage < this.MAX_PAGES) {
      this.currentPage++;
      this.loadLocations(this.currentPage);
    } else {
      event.target.disabled = true;
    }

    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  toggleCharacters(locationId: number) {
    if (this.expandedLocations.has(locationId)) {
      this.expandedLocations.delete(locationId); 
    } else {
      this.expandedLocations.add(locationId); 
    }
  }
  
  isExpanded(locationId: number): boolean {
    return this.expandedLocations.has(locationId);
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
