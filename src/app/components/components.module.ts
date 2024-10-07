import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CharacterComponent } from './character/character.component';
import { CharactersComponent } from './characters/characters.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { LocationsComponent } from './locations/locations.component';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ScanComponent } from './scan/scan.component';

@NgModule({
  declarations: [
    CharacterComponent,
    CharactersComponent,
    EpisodesComponent,
    FavoritesComponent,
    LocationsComponent,
    ModalComponent,
    ScanComponent,
    SearchComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    CharacterComponent,
    CharactersComponent,
    EpisodesComponent,
    FavoritesComponent,
    LocationsComponent,
    ModalComponent,
    ScanComponent,
    SearchComponent
  ]
})
export class ComponentsModule { }
