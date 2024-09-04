import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Locations } from '../models/locations.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationFilter } from '../models/location-filter.model';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private readonly locationsUrl: string = `${ environment.apiUri }/location`;

  constructor(private http: HttpClient) { }

  public getLocations(): Observable<Locations> {
    return this.http.get<Locations>(`${ this.locationsUrl }`);
  }

  public getLocationsByPage(page: number): Observable<Locations> {
    return this.http.get<Locations>(`${ this.locationsUrl }`, { params: new HttpParams().set('page', page.toString()) });
  }

  public getLocationsByFilter(locationFilter: LocationFilter): Observable<Locations> {
    const params = this.buildFilterParams(locationFilter);

    return this.http.get<Locations>(`${ this.locationsUrl }`, { params });
  }

  private buildFilterParams(locationFilter: LocationFilter): HttpParams {
    let params = new HttpParams();

    if (locationFilter.name) params = params.set('name', locationFilter.name);

    return params;
  }
}
