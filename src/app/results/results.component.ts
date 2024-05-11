import { ChangeDetectionStrategy, Component, OnChanges, input } from '@angular/core';
import { CountryDisplay } from '../geo.interface';
import { DecimalPipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [MatTableModule, DecimalPipe, MatPaginatorModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnChanges {
  countries = input<CountryDisplay[] | null>();
  totalCountries: number = 0;
  dataSource!: MatTableDataSource<CountryDisplay>;
  dataSourceDisplay = new MatTableDataSource<CountryDisplay>([]);
  displayedColumns: string[] = ['commonName', 'capital', 'currencies', 'languages', 'population', 'flags'];

  ngOnChanges(): void {
    this.totalCountries = this.countries()?.length ?? 0;
    this.dataSource = new MatTableDataSource<CountryDisplay>(this.countries() ?? []);
    this.dataSourceDisplay.data = this.dataSource.data.slice(0, 10);
  }

  onPaginateChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSourceDisplay.data = this.dataSource.data.slice(startIndex, endIndex);
  }
}
