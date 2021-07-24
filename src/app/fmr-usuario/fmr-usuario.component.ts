import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regExps } from '../login/login.component';
import { StorageService } from '../shared/storage.service';
import { User } from '../shared/user';
import { UserService } from './user.service';
import { faSave,faEye,faEdit,faEraser } from '@fortawesome/free-solid-svg-icons'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fmr-usuario',
  templateUrl: './fmr-usuario.component.html',
  styleUrls: ['./fmr-usuario.component.sass']
})
export class FmrUsuarioComponent implements OnInit {

  //Variables
  form: FormGroup;
  message: string;
  messageSuccess: string;
  id:string;
  userCreados:string= "0";

  //Botones
  guardar= true;
  modificar=false;
  cancelar=false;
  Admin = false;
  
  // Fa Fa-incosn
  i_faSave=faSave;
  i_faEye=faEye;
  i_faEdit=faEdit;
  i_faEraser=faEraser;

  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [5, 10, 15, 25];
  
  // Listar 
  elements: any = [  ];
  headElements = ['Id','Email', 'Nombre','Rol','Tipo Doc.'];//,'Nombre', 'Apellido','Código de Habilitación','Actor'

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private storageService: StorageService ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(regExps.password)]],
      roles: ['', Validators.required],
      documentTypes: ['', Validators.required],
      actor: ['', Validators.required],
      acode: ['', Validators.required],
    });
    this.ListarUsusario();
    let roles = [];
    roles =this.storageService.userinfo.roles;
    this.Admin= roles.includes('ROLE_ADMIN');
    if(!this.Admin){
      this.router.navigate(['../home'], { relativeTo: this.route });
    }
    //this.Admin= true;
    
  }

  async onSubmit() {
    try{ 
        if (this.form.valid) {
          const token = StorageService.STORAGE_USER["token"];
          const firstName = this.form.get('firstName').value;
          const lastName = this.form.get('lastName').value;
          const email = this.form.get('email').value;
          const password = this.form.get('password').value;
          const roles = this.form.get('roles').value;
          const documentTypes = this.form.get('documentTypes').value; 
          const actor = this.form.get('actor').value; 
          const avaliabilityCode = this.form.get('acode').value;   
    
          const user = new User();
          user.firstName = firstName;
          user.lastName = lastName;
          user.email = email;
          user.password =password ;
          user.roles = [];
          user.roles.push(roles);
          user.documentTypes =documentTypes;
          user.actor = actor; 
          user.avaliabilityCode= avaliabilityCode;
          
        this.userService.post(user,token).subscribe( response => {
          this.message = '';
          let email = this.form.get('email').value; 
          this.form.reset();
          this.messageSuccess = "Usuario "+email+", creado correctamente.";
          this.ListarUsusario();
        }, error => {
          this.message = error.error.message;
          this.messageSuccess = '';
        });
    
          
      } else {
        this.messageSuccess = "";
        this.message = 'Validar campos requeridos y que la contraseña sea válida';
      }
    }catch{
      this.message = "Ah ocurrido un error, avisa al administrador del sistema.";
    }
  }

  ListarUsusario(){
    const token =  this.storageService.userinfo.token;
    this.userService.get(token).subscribe(response => {   
      this.elements= response.data; 
      this.userCreados =this.elements.length;
    }, error => {
      this.message = error.error.message;
      this.messageSuccess = '';
    });
  }

  update() {
    try{  
        if (this.form.valid) {
          const token =  this.storageService.userinfo.token;
          const firstName = this.form.get('firstName').value;
          const lastName = this.form.get('lastName').value;
          const email = this.form.get('email').value;
          const password = this.form.get('password').value;
          const roles = this.form.get('roles').value;
          const documentTypes = this.form.get('documentTypes').value; 
          const actor = this.form.get('actor').value; 
          const avaliabilityCode = this.form.get('acode').value;   
    
          const user = new User();
          user.firstName = firstName;
          user.lastName = lastName;
          user.email = email;
          user.password =password ;
          user.roles = [];
          user.roles.push(roles);
          user.documentTypes =documentTypes;
          user.actor = actor; 
          user.avaliabilityCode= avaliabilityCode;
          
        this.userService.put(user,this.id,token).subscribe( response => {
          this.message = '';
          let email = this.form.get('email').value; 
          this.limpiar();
          this.messageSuccess = "Usuario "+user.email+", modificado correctamente.";
          this.id='';
          this.ListarUsusario();
        }, error => {
          this.message = error.error.message;
          this.messageSuccess = '';
        });
    
          
      } else {
        this.messageSuccess = "";
        this.message = 'Validar campos requeridos y que la contraseña sea válida';
      }
    }catch{
      this.message = "Ah ocurrido un error, avisa al administrador del sistema.";
    }
  }

  limpiar(){
    this.id='';
    this.form.reset();
    this.guardar= true;
    this.modificar=false;
    this.cancelar=false;
    this.message = "";
    this.messageSuccess = '';

  }
  
  mostrarValor(json){ 
    this.id = json.id;
    this.form.controls['firstName'].setValue(json.firstName);
    this.form.controls['lastName'].setValue(json.lastName);
    this.form.controls['email'].setValue(json.email);
    this.form.controls['password'].setValue('');
    this.form.controls['roles'].setValue(json.roles[0]);
    this.form.controls['documentTypes'].setValue(json.documentTypeName);
    this.form.controls['actor'].setValue(json.actorName);
    this.form.controls['acode'].setValue(json.avaliabilityCode);
    this.guardar= false;
    this.modificar=true;
    this.cancelar=true;
    this.messageSuccess = "";
    this.message = "";

     
  }
  
  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.ListarUsusario();
  }   
  
  onTableDataChange(event){
    this.page = event;
    this.ListarUsusario();
  } 

}
