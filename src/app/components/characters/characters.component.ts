import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Character } from 'src/app/models/character.model';
import { Characters } from 'src/app/models/characters.model';
import { CharactersService } from 'src/app/services/characters.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent  implements OnInit {
  constructor(
    private _charactersService: CharactersService,
    private _favoritesService: FavoritesService
  ) { }

  @ViewChild('characterModal') modal: IonModal | undefined;
  selectedCharacter: Character | undefined;
  characters: Characters = new Characters();

  ngOnInit() {
    this.loadCharacters();
  }

  private loadCharacters() {
    let MAX_PAGES: number = 42;

    for (let i = 1; i <= MAX_PAGES; i++) {
      this._charactersService.getCharactersByPage(i).subscribe(response => {
        if (response?.results) this.characters.results = [...(this.characters.results || []), ...response.results];
      });
    }
  }

  selectCharacter(index: number) {
    this.selectedCharacter = this.characters.results?.[index];
  }

  addFavoriteCharacter(index: number) {
    const character = this.characters.results?.[index];

    if (character) this._favoritesService.addFavorite(character);
  }

  openModal() {
    this.modal?.present();
  }

  cancelModal() {
    this.modal?.dismiss();
  }
}
