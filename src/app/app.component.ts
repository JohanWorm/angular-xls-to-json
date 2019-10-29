import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';  

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'XLSX TO JSON';
  data;

  onChangeInputFile(eventFile: Event) {
    const reader: FileReader = new FileReader();
    const file = eventFile.target['files'][0];

    reader.onload = (e: any) => {
      this.clearJsonData();
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      console.log(this.data );

      /* download json file */
      this.data = JSON.stringify(this.data);  
      const data: Blob = new Blob([this.data], { type: "application/json" });  
      FileSaver.saveAs(data, "JsonFile" + new Date().getTime() + '.json');  
    };
    reader.readAsBinaryString(file);
  }

  clearJsonData() {
    this.data = [];
  }

}
