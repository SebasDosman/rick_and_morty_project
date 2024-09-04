import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Character } from 'src/app/models/character.model';
import { CharactersService } from 'src/app/services/characters.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];
  currentPage: number = 1;
  private MAX_PAGES: number = 42;

  constructor(
    private _charactersService: CharactersService,
    private _favoritesService: FavoritesService,
    private _modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadCharacters(this.currentPage);
  }

  private loadCharacters(page: number) {
    this._charactersService.getCharactersByPage(page).subscribe(response => {
      if (response.results) this.characters = [...this.characters, ...response.results];
    });
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadCharacters(this.currentPage);

    setTimeout(() => {
      event.target.complete();

      if (this.currentPage >= this.MAX_PAGES) event.target.disabled = true;
    }, 500);
  }

  addFavoriteCharacter(character: Character) {
    this._favoritesService.addFavorite(character);
  }

  openModal(character: Character) {
    this._modalController.create({
      component: ModalComponent,
      componentProps: {
        character: character
      }
    }).then(modal => modal.present());
  }
}
