import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { EMPTY, Observable, merge, of } from 'rxjs';
import { Sollicitatie } from '../../../../models/sollicitatie.interface';


/**
 * Data source for the Sollicitaties2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SollicitatiesDataSource extends DataSource<Sollicitatie> {
  public length = 0;
  
  constructor(
    public sollicitaties$: Observable<Sollicitatie[]>,
    public sort: MatSort = null!,
    public paginator: MatPaginator = null!
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Sollicitatie[]> {

    return merge(
      this.sollicitaties$,
      this.paginator?.page && of({}),
      this.sort?.sortChange && of({}),
    )
    .pipe(
      startWith(null),
        switchMap(() => this.sollicitaties$),
        map(data => this.getSortedData(data)),
        map(data => this.getPagedData(data)),
        tap(data => this.length = data.length),
        tap(data => console.log('Firestore data: ', data))
      );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Sollicitatie[]): Sollicitatie[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Sollicitatie[]): Sollicitatie[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'bedrijf': return compare(a.bedrijf, b.bedrijf, isAsc);
        case 'datum': return compare(+new Date(a.datum), +new Date(b.datum), isAsc);
        case 'sluitingsdatum': return compare(+new Date(a.sluitingsdatum), +new Date(b.sluitingsdatum), isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }
}

// Keep a public alias for table row item type so components can import it.
export type SollicitatiesItem = Sollicitatie;

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
