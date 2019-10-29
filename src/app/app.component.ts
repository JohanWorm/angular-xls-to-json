import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'XLSX TO JSON';
  jsonData;

  onChangeInputFile(eventFile: Event) {
    const reader: FileReader = new FileReader();
    const file = eventFile.target['files'][0];

    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.jsonData = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      console.log(this.jsonData );
    };
    reader.readAsBinaryString(file);
  }
}
