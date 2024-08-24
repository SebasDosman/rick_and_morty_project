import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Episodes } from '../models/episodes.model';
import { environment } from 'src/environments/environment';
import { EpisodeFilter } from '../models/episode-filter.model';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {
  constructor(private http: HttpClient) { }

  public getEpisodes(): Observable<Episodes> {
    return this.http.get<Episodes>(`${ environment.apiUri }/api/episode`);
  }

  public getEpisodesByFilter(episodeFiler: EpisodeFilter): Observable<Episodes> {
    let params = new HttpParams();

    if (episodeFiler.name) params = params.set('name', episodeFiler.name);
    if (episodeFiler.episode) params = params.set('episode', episodeFiler.episode);

    return this.http.get<Episodes>(`${ environment.apiUri }/api/episode`, { params });
  }
}
