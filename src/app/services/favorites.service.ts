import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoriteCharactersSubject = new BehaviorSubject<Character[]>([]);
  favoriteCharacters$ = this.favoriteCharactersSubject.asObservable();

  constructor() { }

  public addFavorite(character: Character): void {
    const currentFavorites = this.favoriteCharactersSubject.value;

    if (!currentFavorites.some(c => c.id === character.id)) this.favoriteCharactersSubject.next([...currentFavorites, character]);
  }

  public removeFavorite(character: Character): void {
    const currentFavorites = this.favoriteCharactersSubject.value;

    if (currentFavorites.some(c => c.id === character.id)) {
      const updatedFavorites = currentFavorites.filter(c => c.id !== character.id);
      this.favoriteCharactersSubject.next(updatedFavorites);
    }
  }

  public isFavorite(character: Character): boolean {
    return this.favoriteCharactersSubject.value.some(c => c.id === character.id);
  }

  public getFavorites(): Character[] {
    return this.favoriteCharactersSubject.value;
  }
}
