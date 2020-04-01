import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm,FormBuilder,Validators, FormGroup, FormControl, MaxLengthValidator } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from './crud.service';
import { EditdataComponent } from './editdata/editdata.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ctxComponent';
  crudData:any = "";

  constructor(private http:HttpClient, private fb:FormBuilder, private _snackBar: MatSnackBar,
     private dta: CrudService, public dialog: MatDialog){
    this.getData();
  };

  dataForm = this.fb.group({
    name : ['', Validators.required],
    email: ['', Validators.required],
    mobile: ['', Validators.maxLength(10)],
    address: ['', Validators.required]
  });
  
  onSubmit(){
    console.log(this.dataForm.value);
     this.dta.addData(this.dataForm.value).subscribe( (res:any) =>{
         this.getData();
     });
  }

  getData(){
    this.dta.getData().subscribe((res:any) => {
        this.crudData = res;
    });
  }

  deleteData(id){
    if(confirm("Confirm delete!!!")){
      this.dta.deleteData(id).subscribe( res =>{
        this.getData();
      });
    }
  }

  updateData(data){

      const dialogRef = this.dialog.open(EditdataComponent, {
        width: '450px',
        hasBackdrop: false,
        data: data
      });
  
      dialogRef.afterClosed().subscribe( (result:any) => {
         if(result != 'cancel'){
            const id = result._id;
            const data = {
              name: result.name,
              email: result.email,
              mobile: result.mobile,
              address: result.address
            };
            this.dta.editData(id, data).subscribe( res => {             
              this.getData();
              this._snackBar.openFromComponent(SnackBarComponent, {
                duration: 4000,
                data: {message:'Data updated successfully!!'},
                verticalPosition: 'top',
                panelClass:'snackbar-color'
              });
          });
        }
      });
  }

  searchFunction(txt) {
     
     if(txt.value.trim() != ""){
         this.dta.searchData({"stext":txt.value}).subscribe( (res:any) =>{
             this.crudData = res;
             //alert(JSON.stringify(res));
         });
     }
  }

}
