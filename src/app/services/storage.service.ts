import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private foundSubject = new BehaviorSubject<any[]>(this.loadFound());
  found$ = this.foundSubject.asObservable();

  constructor() {}

  private loadFound(): any[] {
    try {
      return JSON.parse(localStorage.getItem('found') || '[]');
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return [];
    }
  }

  getFound(): any[] {
    return this.foundSubject.value;
  }

  addFound(character: any) {
    const currentFound = this.getFound();
    currentFound.push(character);
    this.updateFound(currentFound);
  }

  removeFound(character: any) {
    const currentFound = this.getFound().filter(found => found.id !== character.id);
    this.updateFound(currentFound);
  }

  isFound(characterId: any): boolean {
    return this.getFound().some(found => found.id.toString() === characterId.toString());
  }  

  private updateFound(found: any[]) {
    localStorage.setItem('found', JSON.stringify(found));
    this.foundSubject.next(found);
  }
}
