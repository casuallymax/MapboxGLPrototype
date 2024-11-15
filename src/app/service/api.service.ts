import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private fileJSONPath = '/public/geo.json';
  data: Observable<any> | null = null
  isError: boolean = false

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

  initDataFetch() {
    this.fetchDataJSON().subscribe({
        next: (jsonResponse) => {
          this.data = jsonResponse;
        },
        error: () => {
          console.error("Fehler beim Laden der Json")
          this.isError = true
        }
      }
    )
  }

}
