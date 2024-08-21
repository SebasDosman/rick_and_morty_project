import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent  implements OnInit {
  favoriteCharacters: Character[] = [];

  constructor(private _favoritesService: FavoritesService) { }

  ngOnInit() {
    this.loadFavorites();
  }

  private loadFavorites() {
    this._favoritesService.favoriteCharacters$.subscribe(favorites => {
      this.favoriteCharacters = favorites;
    });
  }
}
