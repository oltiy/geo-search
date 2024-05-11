import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, EMPTY, map, Observable, startWith } from 'rxjs';
import { CountryDisplay, CountryFromApi } from './geo.interface';

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  httpClient = inject(HttpClient);
  private BASE_URL = 'https://restcountries.com/v3.1/name/';

  getGeo(query: string): Observable<CountryDisplay[] | null> {
    return this.httpClient.get<CountryFromApi[]>(`${this.BASE_URL}${query}`).pipe(
      map((res: CountryFromApi[]) => {
        if (!res.length) return null;
        return res.map((item: CountryFromApi) => ({
          commonName: item.name?.common,
          capital: item.capital,
          currencies: Object.keys(item.currencies ?? {}),
          languages: Object.values(item.languages ?? {}),
          population: item.population,
          flags: {
            png: item.flags?.png,
            svg: item.flags?.svg,
          },
        }));
      }),
      catchError(() => {
        return EMPTY.pipe(startWith(null));
      }),
    );
  }
}
