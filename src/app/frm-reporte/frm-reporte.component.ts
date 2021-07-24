import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from '../shared/storage.service';
import { ReporteService } from './ReporteService.service';
import { faDownload } from '@fortawesome/free-solid-svg-icons'; 


@Component({
  selector: 'app-frm-reporte',
  templateUrl: './frm-reporte.component.html',
  styleUrls: ['./frm-reporte.component.sass']
})
export class FrmReporteComponent implements OnInit {

  message: string;
  messageSuccess: string;
  file: string;
  namefile: string;
  anio= 2021;
  periodo: string;
  tipo: string;
  fechaInicio : string;
  fechaFin : string;

  i_faDownload=faDownload;
 

  constructor(
        private storageService: StorageService,
        private formBuilder: FormBuilder,
        private reporteService: ReporteService ) { 
   }

  ngOnInit(): void {
  }

  descargarReporte(){ 
      try{
  
        const token =  this.storageService.userinfo.token;
        const email =  this.storageService.userinfo.username;
        this.message = "";
        this.messageSuccess = "";
        if(this.anio == undefined || this.anio < 2021 || this.anio > new Date().getFullYear())
          return this.message = "Por favor Ingrese un año válido, menor o igual a "+ new Date().getFullYear() +".";
        if(this.periodo == undefined)
          return this.message = "Por favor Seleccione el periodo.";
        if(this.tipo == undefined)
          return this.message = "Por favor Seleccione el tipo de Archivo.";
    
        this.buscarFechas(); 
        const formData ={
          initialDate: this.fechaInicio, 
          finishDate: this.fechaFin,
          fileType: this.tipo,
          email: email
        }; 
        this.reporteService.post(formData,token).subscribe(response => {    
          console.log(response);
          this.namefile= response.data.name;
          this.file= response.data.file; 
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
           element.setAttribute('download', this.namefile);
           const event = new MouseEvent('click');
           element.dispatchEvent(event);
           this.message = '';
       }, error => {   
         this.message = error.error.message;
       });
    }catch{
      this.message = "Ah ocurrido un error, avisa al administrador del sistema.";
    }
             
  }

  buscarFechas(){
    if("Enero - Marzo" == this.periodo){
      this.fechaInicio= this.anio+"-01-01";
      this.fechaFin=this.anio+"-03-31";
    }else if("Abril - Junio" == this.periodo){
      this.fechaInicio=this.anio+"-04-01";
      this.fechaFin= this.anio+"-06-30";
    }else if("Julio - Septiembre" == this.periodo){
      this.fechaInicio= this.anio+"-07-01";
      this.fechaFin= this.anio+"-09-30";
    }else if("Octubre - Diciembre" == this.periodo){
      this.fechaInicio=this.anio+"-10-01"; 
      this.fechaFin= this.anio+"-12-31";
    }
  } 

}

