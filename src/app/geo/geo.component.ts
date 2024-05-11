import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ResultsComponent } from '../results/results.component';
import { debounceTime, map, Observable, of, switchMap, tap } from 'rxjs';
import { GeoService } from '../geo.service';
import { CountryDisplay } from '../geo.interface';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-geo',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    ResultsComponent,
    AsyncPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './geo.component.html',
  styleUrl: './geo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeoComponent {
  countries$?: Observable<CountryDisplay[] | null>;
  geoService = inject(GeoService);
  searchControl = new FormControl('');
  loading = signal(false);
  inputEmpty = signal(true);
  ngOnInit(): void {
    this.countries$ = this.searchControl.valueChanges.pipe(
      debounceTime(600),
      map(search => search?.trim()),
      tap(() => {
        this.loading.set(true), this.inputEmpty.set(false);
      }),
      switchMap(query => {
        if (!query) {
          this.inputEmpty.set(true);
          this.loading.set(false);
          return of([]);
        }

        return this.geoService.getGeo(query).pipe(tap(() => this.loading.set(false)));
      }),
    );
  }
}
