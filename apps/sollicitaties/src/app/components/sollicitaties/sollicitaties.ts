import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sollicitatie } from '../../../../models/sollicitatie.interface';
import { StorageService } from '../../services/StorageService';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-sollicitaties',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './sollicitaties.html',
  styleUrls: ['./sollicitaties.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class Sollicitaties {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatTable) table?: MatTable<Sollicitatie>;

  protected dataSource = new MatTableDataSource<Sollicitatie>();
  private router = inject(Router);
  private storageService = inject(StorageService);
  protected sollicitaties$!: Observable<Sollicitatie[]>
  
  ngOnInit(){
    this.sollicitaties$ = this.storageService.getSollicitaties()
  }

  ngAfterViewInit(): void {
    if(this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if(this.sort) {
      this.dataSource.sort = this.sort;
    }

    this.sollicitaties$.subscribe(data => this.dataSource.data = data)
  }

  getLimitedSentences(text: string): string {
    if (!text) return '';
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    return this.getEllipsedString(sentences.slice(0, 2).join('').trim(), text, '...');
  }

  getEllipsedString(truncatedString: string, orgString: string, suffix: string): string {
    return orgString.length > truncatedString.length ? truncatedString + suffix : orgString;
  }

  addNewSollicitatie(): void {
    this.router.navigate(['/add-sollicitatie']);
  }
}
