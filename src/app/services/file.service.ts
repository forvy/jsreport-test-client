import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as FileSaver from "file-saver";

@Injectable()
export class FileService {

  constructor(private http: HttpClient) { }
  // host = 'http://localhost:8001'; // activating this and uncommenting which use host would enabled access to auth
  hosturl = 'http://localhost:5488/api/report';
  // key = 'YWRtaW46cGFzc3dvcmQ=';
  // header = { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + this.key };

  saveAs(blob: Blob, fileName: string, type: string) {
    let file = new Blob([blob], { type: `application/${type}` });
    if (type == 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      type = 'xlsx';
    }
    FileSaver.saveAs(file, `${fileName}.${type}`);
  }

  fetchFile(parameter) {
    // return this.http.post(this.hosturl, parameter, { headers: this.header, responseType: 'blob' });
    return this.http.post(this.hosturl, parameter, { responseType: 'blob' });
    // return this.http.get(this.host + '/test2?shortid=' + shortid + '&preview=true', { responseType: 'blob' });
  }

  showFileXls(parameter) {
    // return this.http.post(this.hosturl, parameter, { headers: this.header, responseType: 'text' });
    // return this.http.get(this.host + '/test2?shortid=' + shortid + '&preview=true', { responseType: 'text' });
    return this.http.post(this.hosturl, parameter, { responseType: 'text' });
  }
}
