import { Component } from '@angular/core';
import { FileService, UtilService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private fileService: FileService,
    private utilService: UtilService
  ) {

  }
  shortid = 'BygdqD8NZH';
  filetype = 'xlsx';
  parameter: any;
  // filetype= 'pdf';
  // shortid = 'rkJTnK2ce';
  show = false;

  populate() {
    return this.parameter = {
      "template": { "shortid": this.shortid },
      "options": { "preview": this.show },
      "authentication": {
          "username": "admin",
          "password": "password"
      }
    };
    
  }

  clickDownload() {
    this.show = false;
    // this.fileService.fetchFile(this.shortid).subscribe((res) => { // change to this if you used backend
    this.fileService.fetchFile(this.populate()).subscribe((res) => {
      // console.log(res);
      console.log(this.parameter);
      if (this.filetype == 'xlsx') {
        this.utilService.saveAs(res, 'report', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      } else {
        this.utilService.saveAs(res, 'invoice', this.filetype);
      }
    }, (err) => {
      console.error(err);
    });
  }

  showFile() {
    this.show = true;
    if (this.filetype == 'xlsx') {
      this.showxlsx();
    } else {
      this.showpdf();
    }
  }

  showxlsx() {
    // this.fileService.showFileXls(this.shortid).subscribe((res) => { // change to this if you used backend
    this.fileService.showFileXls(this.populate()).subscribe((res) => {
      var ele = document.createElement('div');
      ele.innerHTML = res;
      ele.querySelector('iframe').innerHTML = '';
      var file = ele.querySelector('iframe').src;
      document.querySelector("iframe").src = file;
    }, (err) => {
      console.error(err);
    });
  }

  showpdf() {
    // this.fileService.fetchFile(this.shortid).subscribe((res) => { // change to this if you used backend
    this.fileService.fetchFile(this.populate()).subscribe((res) => {
      var file = window.URL.createObjectURL(this.utilService.show(res, 'pdf'));
      document.querySelector("iframe").src = file;
    }, (err) => {
      console.error(err);
    });
  }
}
