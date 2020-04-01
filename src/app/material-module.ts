import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {
 MatNativeDateModule,MatDatepickerModule,
 MatIconModule,MatButtonModule,MatCheckboxModule,
  MatToolbarModule, MatCardModule,MatFormFieldModule,
  MatInputModule,MatRadioModule,MatListModule,MatSidenavModule,
  MatTableModule,MatMenuModule,MatProgressBarModule ,
  MatProgressSpinnerModule ,
  MatSliderModule,
   MatSelectModule, MatSnackBarModule
} from '@angular/material';
// import { DialogComponent } from './dialog/dialog.component';

@NgModule({
 declarations:[],
 imports: [MatNativeDateModule,MatDatepickerModule,MatIconModule,MatButtonModule,
 MatCheckboxModule, MatToolbarModule,FormsModule, MatCardModule,MatFormFieldModule,
 MatInputModule,MatListModule,MatRadioModule,MatSidenavModule,MatTableModule,
 MatMenuModule, MatSelectModule, MatSliderModule,MatSnackBarModule,
 MatProgressBarModule,MatProgressSpinnerModule,MatDialogModule  ],
 
exports: [MatNativeDateModule,FormsModule,MatSidenavModule,MatProgressBarModule ,
MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule,MatMenuModule,
MatTableModule,MatToolbarModule, MatCardModule,MatFormFieldModule,MatInputModule,MatSnackBarModule,
MatListModule,MatRadioModule,MatProgressSpinnerModule, MatSelectModule, MatSliderModule,MatDialogModule ],
 
})
export class MaterialModule { }