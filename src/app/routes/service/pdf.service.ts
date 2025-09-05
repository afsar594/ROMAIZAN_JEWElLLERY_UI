import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  PrintPDF(elementId: string, css: string) {
    try {
      let printContents, popupWin;
      // document.getElementById(elementId).hidden = false
      printContents = document.getElementById(elementId);
      popupWin = window.open('', '_blank');
      popupWin.document.open();
      popupWin.document.write(`<html>
      <style> ${css} </style>
      <body > ${printContents.outerHTML} </body>
      </html>`);
      // document.getElementById(elementId).hidden = true
      popupWin.print();
      popupWin.close();
    } catch (error) {
      console.log("error in PrintPDF = " + error)
    }
  }
}
