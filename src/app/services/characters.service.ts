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
  private readonly charactersUrl: string = `${ environment.apiUri }/character`;

  constructor(private http: HttpClient) { }

  public getCharacters(): Observable<Characters> {
    return this.http.get<Characters>(`${ this.charactersUrl }`);
  }

  public getCharactersByPage(page: number): Observable<Characters> {
    return this.http.get<Characters>(`${ this.charactersUrl }`, { params: new HttpParams().set('page', page.toString()) });
  }

  public getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${ this.charactersUrl }/${ id }`);
  }

  public getCharactersByIds(ids: string[]): Observable<Character[]> {
    return this.http.get<Character[]>(`${ this.charactersUrl }/${ ids.join(',') }`);
  }

  public getCharactersByFilter(characterFilter: CharacterFilter): Observable<Characters> {
    const params = this.buildFilterParams(characterFilter);

    return this.http.get<Characters>(this.charactersUrl, { params });
  }

  private buildFilterParams(characterFilter: CharacterFilter): HttpParams {
    let params = new HttpParams();

    if (characterFilter.name) params = params.set('name', characterFilter.name);

    return params;
  }
}
