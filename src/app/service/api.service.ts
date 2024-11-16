import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private fileJSONPath = '/public/geo.json';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Ruft Daten aus einer JSON-Datei ab.
   * @returns Ein Observable, das ein JSON-Objekt ausgibt.
   */
  fetchDataJSON(): Observable<any> {
    return this.http.get<any>(this.fileJSONPath);
  }

}
