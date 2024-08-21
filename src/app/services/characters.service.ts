import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Characters } from '../models/characters.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';

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
}
