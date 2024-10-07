import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private foundSubject = new BehaviorSubject<any[]>(this.loadFound());
  found$ = this.foundSubject.asObservable();

  constructor() { }

  private loadFound(): Character[] {
    try {
      return JSON.parse(localStorage.getItem('found') || '[]');
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return [];
    }
  }

  getFound(): Character[] {
    return this.foundSubject.value;
  }

  addFound(character: Character) {
    const currentFound = this.getFound();

    currentFound.push(character);
    this.updateFound(currentFound);
  }

  removeFound(character: Character) {
    const currentFound = this.getFound().filter(found => found.id !== character.id);

    this.updateFound(currentFound);
  }

  isFound(characterId: number): boolean {
    return this.getFound().some(found => found.id.toString() === characterId.toString());
  }

  private updateFound(found: Character[]) {
    localStorage.setItem('found', JSON.stringify(found));

    this.foundSubject.next(found);
  }
}
