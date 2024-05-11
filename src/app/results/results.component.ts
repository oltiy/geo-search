import { ChangeDetectionStrategy, Component, OnChanges, input } from '@angular/core';
import { CountryDisplay } from '../geo.interface';
import { DecimalPipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [MatTableModule, DecimalPipe],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnChanges {
  countries = input<CountryDisplay[] | null>();
  dataSource?: MatTableDataSource<CountryDisplay>;

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource<CountryDisplay>(this.countries() ?? []);
  }

  displayedColumns: string[] = ['commonName', 'capital', 'currencies', 'languages', 'population', 'flags'];
}
