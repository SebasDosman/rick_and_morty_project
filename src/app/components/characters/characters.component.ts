import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Character } from 'src/app/models/character.model';
import { CharactersService } from 'src/app/services/characters.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];
  currentPage: number = 1;
  MAX_PAGES: number = 42;

  constructor(
    private _charactersService: CharactersService,
    private _favoritesService: FavoritesService,
    private _modalController: ModalController,
    private _router: Router
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
    if (this.currentPage < this.MAX_PAGES) {
      this.currentPage++;
      this.loadCharacters(this.currentPage);
    } else {
      event.target.disabled = true;
    }

    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  addFavoriteCharacter(character: Character) {
    this._favoritesService.addFavorite(character);
  }

  removeFavoriteCharacter(character: Character) {
    this._favoritesService.removeFavorite(character);
  }

  isFavoriteCharacter(character: Character) {
    return this._favoritesService.isFavorite(character);
  }

  addOrRemoveFavoriteCharacter(character: Character) {
    if (this.isFavoriteCharacter(character)) this.removeFavoriteCharacter(character);
    else this.addFavoriteCharacter(character);
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
