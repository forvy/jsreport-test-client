import { Injectable } from '@angular/core';
import * as FileSaver from "file-saver";

@Injectable()
export class UtilService {

  constructor() { }

  saveAs(blob: Blob, fileName: string, type: string) {
    let file = new Blob([blob], { type: `application/${type}` });
    if (type == 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      type = 'xlsx';
    }
    FileSaver.saveAs(file, `${fileName}.${type}`);
  }

  show(blob: Blob, type: string) {
    let file = new Blob([blob], { type: `application/${type}` });
    return file;
  }
}
