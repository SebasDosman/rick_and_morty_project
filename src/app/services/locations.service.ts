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
  constructor(private http: HttpClient) { }

  public getLocations(): Observable<Locations> {
    return this.http.get<Locations>(`${ environment.apiUri }/api/location`);
  }

  public getLocationsByFilter(locationFilter: LocationFilter): Observable<Locations> {
    let params = new HttpParams();

    if (locationFilter.name) params = params.set('name', locationFilter.name);
    if (locationFilter.type) params = params.set('type', locationFilter.type);
    if (locationFilter.dimension) params = params.set('dimension', locationFilter.dimension);

    return this.http.get<Locations>(`${ environment.apiUri }/api/location`, { params });
  }
}
