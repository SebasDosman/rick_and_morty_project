import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CharactersComponent } from './characters/characters.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { LocationsComponent } from './locations/locations.component';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    CharactersComponent,
    EpisodesComponent,
    FavoritesComponent,
    LocationsComponent,
    ModalComponent,
    SearchComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    CharactersComponent,
    EpisodesComponent,
    FavoritesComponent,
    LocationsComponent,
    ModalComponent,
    SearchComponent
  ]
})
export class ComponentsModule { }
