import { Component, inject, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { StorageService } from '../../services/StorageService';
import { Sollicitatie } from '../../../../models/sollicitatie.interface';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-sollicitatie',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
  ],
  templateUrl: './add-sollicitatie.html',
  styleUrls: ['./add-sollicitatie.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSollicitatieComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private datePipe = new DatePipe('nl-NL');
  protected form!: FormGroup;
  private id: string | null = null;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private storageService = inject(StorageService);

  ngOnInit(): void {
    this.initializeForm();
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    if(this.id) {
      this.updateForm(this.id);
    }
  }
  
  initializeForm(sollicitatie: Sollicitatie | null = null): void {
    this.form = this.fb.group({
      datum: [sollicitatie ? this.convertFirestoreTimestamp(sollicitatie.datum) : '', Validators.required],
      bedrijf: [sollicitatie?.bedrijf || '', Validators.required],
      functie: [sollicitatie?.functie || '', Validators.required],
      sluitingsdatum: [sollicitatie ? this.convertFirestoreTimestamp(sollicitatie.sluitingsdatum) : '', Validators.required],
      sollicitatie: [sollicitatie?.sollicitatie || '', Validators.required],
      status: [sollicitatie?.status || 'pending', Validators.required],
    });
 
    this.cdr.markForCheck();
  }

  async updateForm(id: string) {
    this.storageService.getSollicitatie(id)
    .subscribe(sollicitaties => this.initializeForm(sollicitaties));
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
      // TODO: Implement submission logic (e.g., add to datasource)
      this.storageService.addSollicitatie(this.form.value)
      this.activateRoute('sollicitaties')
    }
  }

  onCancel(): void {
    this.form.reset({ status: 'pending' });
  }

  activateRoute(route: string): void {
    this.router.navigate([route]);
  }

}