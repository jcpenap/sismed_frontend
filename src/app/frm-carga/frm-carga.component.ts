import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ByteFile } from '../shared/bite.file';
import { StorageService } from '../shared/storage.service';
import { CargaService } from './carga.service'; 
import { DownloadService } from './download.service';
import { faDownload,faUpload } from '@fortawesome/free-solid-svg-icons'; 


@Component({
  selector: 'app-frm-carga',
  templateUrl: './frm-carga.component.html',
  styleUrls: ['./frm-carga.component.sass']
})
export class FrmCargaComponent implements OnInit {
  i_faUpload=faUpload;
  i_faDownload=faDownload;


  uploadForm: FormGroup;
  file: string;
  documento: string;
  message: string;
  messageSuccess: string;
  fileName: string;
  fileUploaded: string;  
  publicKeyNameFile: string;
  nombreArchivo: string;
  archivo: ByteFile;     
  

  constructor( private formBuilder: FormBuilder, 
              private cargaService: CargaService, 
              private storageService: StorageService,
              private downloadService:DownloadService
              ) { 
    
  }
 
  ngOnInit(): void {  
    this.uploadForm = this.formBuilder.group({
      file: ['']
    }); 
  }

  seleccionarArchivo(event: any) {
    event.preventDefault();
    const fileHiden = document.getElementById('fileHiden');
    fileHiden.click();
  } 

  onPublicKeyFileChange(event: any) {
    try{
      const reader = new FileReader();
      if (event.target && event.target.files.length > 0) {
        const file = event.target.files[0];
        this.uploadForm.get('keyFile').setValue(file);
          reader.readAsDataURL(file);
          reader.onload = (() => {
            this.publicKeyNameFile = file.name;
          });
      }
    }catch{
      this.message = "Ah ocurrido un error, avisa al administrador del sistema.";
    }
  }

  onFileChange(event: any) {
    try{
      const reader = new FileReader();
      if (event.target && event.target.files.length > 0) {
        const file = event.target.files[0];
        const nombre = file.name;
        const extesion = nombre.substring(nombre.lastIndexOf('.'),nombre.length);
        console.log(extesion);
        
         if(extesion.trim() != '.xls' && extesion.trim() != '.xlsx'){
           alert('Suba un documente de excel (xls,xlsx)');
           this.fileUploaded = undefined;
           return;
         }
        this.uploadForm.get('file').setValue(file);
          reader.readAsDataURL(file);
          reader.onload = (() => {
            this.fileUploaded = file.name;
          });
      }
    }catch{
      this.message = "Ah ocurrido un error, avisa al administrador del sistema.";
    }
  }

  selectPublicKey(event: any) {
    event.preventDefault();
    const fileHiden = document.getElementById('publicKeyFileHiden');
    fileHiden.click();
  }

  subirArchivo(){
    try{ 
      const token =  this.storageService.userinfo.token;
      const username = this.storageService.userinfo.username;
      const formData = new FormData();    
      
      if(this.documento == null || this.documento =="" || this.documento == undefined)
        {
          this.message = "Por favor Seleccione el tipo de Archivo.";
          return;
        }
      if(this.uploadForm.get('file').value  ==  "")
      {
        this.message = "Por favor Seleccione el Archivo.";
        return;
      } 
  
      const request = JSON.stringify({
        fileType: this.documento,
        username: username
      });
      
      formData.append('file', this.uploadForm.get('file').value);
      formData.append('request', request);
  
      this.cargaService.post(formData,token).subscribe( response => {
          this.message = "";
          this.messageSuccess = "Cargado Correctamente"
      }, error => { 
        this.message = error.error.message;
        this.messageSuccess = "";
      });
    }catch{
      this.message = "Ah ocurrido un error, avisa al administrador del sistema.";
      this.messageSuccess = ""
    }                                          
  } 
 
  descargarArchivo(){ 
    try{
      const token =  this.storageService.userinfo.token;
      this.downloadService.post(token).subscribe(response => {   
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
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        element.setAttribute('href', `data:${fileType};base64,${(this.file)}`);
        element.setAttribute('download', 'plantilla.xls');
        const event = new MouseEvent('click');
        element.dispatchEvent(event);
  
      }, error => {
        this.message = error.error.message;
      });
    }catch{
      this.message = "Ah ocurrido un error, avisa al administrador del sistema.";
    }      
  } 
 
}
