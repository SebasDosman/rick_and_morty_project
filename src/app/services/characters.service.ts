import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Characters } from '../models/characters.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';
import { CharacterFilter } from '../models/character-filter.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  constructor(private http: HttpClient) { }

  public getCharacters(): Observable<Characters> {
    return this.http.get<Characters>(`${ environment.apiUri }/api/character`);
  }

  public getCharactersByPage(page: number): Observable<Characters> {
    return this.http.get<Characters>(`${ environment.apiUri }/api/character/?page=${ page }`);
  }

  public getCharactersByIds(ids: string[]): Observable<Character[]> {
    return this.http.get<Character[]>(`${ environment.apiUri }/api/character/${ ids.join(',') }`);
  }

  public getCharactersByFilter(characterFilter: CharacterFilter): Observable<Characters> {
    let params = new HttpParams();

    if (characterFilter.name) params = params.set('name', characterFilter.name);
    if (characterFilter.status) params = params.set('status', characterFilter.status);
    if (characterFilter.species) params = params.set('species', characterFilter.species);
    if (characterFilter.type) params = params.set('type', characterFilter.type);
    if (characterFilter.gender) params = params.set('gender', characterFilter.gender);

    return this.http.get<Characters>(`${ environment.apiUri }/api/character`, { params });
  }
}
