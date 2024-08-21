import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Episodes } from '../models/episodes.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {
  constructor(private http: HttpClient) { }

  public getEpisodes(): Observable<Episodes> {
    return this.http.get<Episodes>(`${ environment.apiUri }/api/episode`);
  }
}
