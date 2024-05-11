import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from './geo.interface';

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  httpClient = inject(HttpClient);
  private BASE_URL = 'https://restcountries.com/v3.1/name/';

  getGeo(query: string): Observable<any> {
    return this.httpClient.get<Country[]>(`${this.BASE_URL}${query}`).pipe(
      map((res: Country[]) => {
        return res.map((item: any) => ({
          commonName: item?.name?.common,
          capital: item?.capital,
          currencies: Object.keys(item?.currencies ?? {}),
          languages: Object.values(item?.languages ?? {}),
          population: item?.population,
          flags: {
            png: item?.flags?.png,
            svg: item?.flags?.svg,
          },
        }));
      }),
      catchError(() => {
        return of([]);
      }),
    );
  }
}
