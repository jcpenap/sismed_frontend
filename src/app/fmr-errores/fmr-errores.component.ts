import { Component, ElementRef, OnInit, Renderer2, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core'; 
import { FormBuilder } from '@angular/forms';
import { StorageService } from '../shared/storage.service';
import { ErroresService } from './errores.services'; 

import { faEraser,faEye,faDownload } from '@fortawesome/free-solid-svg-icons'; 


@Component({
  selector: 'app-fmr-errores',
  templateUrl: './fmr-errores.component.html',
  styleUrls: ['./fmr-errores.component.sass']
})
export class FmrErroresComponent implements OnInit {
  i_faEraser= faEraser;
  i_faEye=faEye;
  i_faDownload=faDownload;


  elements: any = [];

  Id: string; 
  message: string;
  messageSuccess: string;
  name:string;
  file: string;

  page = 1;
  count = 0;
  tableSize = 3;
  tableSizes = [3, 6, 9, 12];

  constructor(private cdRef: ChangeDetectorRef,
    private storageService: StorageService,
    private erroresService:ErroresService) { }

  ngOnInit( ): void {
    //this.hola();
    this.cargarTabla();
  }
    headElements = ['ID', 'Nombre', 'Fecha','Archivo'];//, 'Seleccionar'
   
    cargarTabla(){
      const token =  this.storageService.userinfo.token;
      this.erroresService.post(token).subscribe(response => {   
        this.elements= response.data;        
      });
    }
  
   mostrarValor(json){ 
    this.Id = json.id;
    this.name= json.name; 
    }
  
    limpiar(){
      this.Id = "";  
      this.message = '';
      this.messageSuccess= '';
    }
  
    descargarArchivo(){
      console.log(this.Id);
       if(this.Id == "" || this.Id == undefined)
       {
         this.message= "Por favor seleccione un archivo."
         this.messageSuccess= '';
         return;
       }else{
        this.message = '';
        this.messageSuccess= '';
       } 

      const token =  this.storageService.userinfo.token; 
      const formData ={'fileId': this.Id};
      this.erroresService.postErroes(formData,token).subscribe(response => {    
         this.file= String(response.data);  
         const setting = {
            element: {
              dynamicDownload: null as HTMLElement
            }
          };
          
          if (!setting.element.dynamicDownload) {
            setting.element.dynamicDownload = document.createElement('a');
          }
          const element = setting.element.dynamicDownload;
          const fileType = 'text/plain'; 
          element.setAttribute('href', `data:${fileType};base64,${ (this.file)}`);
          element.setAttribute('download', 'Log_Errores.txt');
          const event = new MouseEvent('click');
          element.dispatchEvent(event);
  
  
      }, error => { 
        this.message = error.error.message;
      });
      
    } 

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.cargarTabla();
  }   
  
  onTableDataChange(event){
    this.page = event;
    this.cargarTabla();
  }  
 
}
