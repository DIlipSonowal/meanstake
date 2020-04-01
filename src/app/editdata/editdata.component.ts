import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CrudService } from '../crud.service';

export interface DialogData {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
}

@Component({
  selector: 'app-editdata',
  templateUrl: './editdata.component.html',
  styleUrls: ['./editdata.component.scss']
})
export class EditdataComponent implements OnInit {
  tempData:DialogData;
  constructor( private dta: CrudService,
    public dialogRef: MatDialogRef<EditdataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.tempData = {...data};
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void{
    
  }

  ngOnInit() {
  }

}
