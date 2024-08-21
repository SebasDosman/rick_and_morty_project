import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Locations } from '../models/locations.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  constructor(private http: HttpClient) { }

  public getLocations(): Observable<Locations> {
    return this.http.get<Locations>(`${ environment.apiUri }/api/location`);
  }
}
