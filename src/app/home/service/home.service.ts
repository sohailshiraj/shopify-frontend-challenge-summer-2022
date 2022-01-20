import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getMarsRoverPhotosBySol(sol: number): Observable<any> {
    return this.http.get(
      `${environment.serviceURL}/rovers/curiosity/photos?sol=${sol}&api_key=${environment.apiKey}`
    );
  }
}
