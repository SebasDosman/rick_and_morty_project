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
  private readonly episodesUrl: string = `${ environment.apiUri }/api/episode`;

  constructor(private http: HttpClient) { }

  public getEpisodes(): Observable<Episodes> {
    return this.http.get<Episodes>(`${ this.episodesUrl }`);
  }

  public getEpisodesByFilter(episodeFiler: EpisodeFilter): Observable<Episodes> {
    const params = this.buildFilterParams(episodeFiler);

    return this.http.get<Episodes>(`${ this.episodesUrl }`, { params });
  }

  private buildFilterParams(episodeFilter: EpisodeFilter): HttpParams {
    let params = new HttpParams();

    if (episodeFilter.name) params = params.set('name', episodeFilter.name);

    return params;
  }
}
