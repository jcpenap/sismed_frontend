import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../shared/storage.service';
import { Login } from './login';
import { LoginService } from './login.service';
import { faPaperclip,faDownload,faUserPlus,faExclamationTriangle,faNotesMedical } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: string;
  i_faNotesMedical=faNotesMedical;

  constructor(private loginService: LoginService,
    private storage: StorageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }    

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {  
    try{  
      if (this.form.valid) {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        this.loginService.post(username, password).subscribe(response => {        
          const data = response.data;
          this.storage.create(StorageService.STORAGE_USER,
            {
              username: username,
              token: data['accessToken'],
              roles: data['roles'] 
            });
          this.router.navigate(['../home'], { relativeTo: this.route });
        }, error => {
          const status = error['status'];
          if(status == 401)
            this.message = 'Credenciales inválidas';
        });
      } else {
        this.message = 'Usuario o Contraseña inválido';
      }
    }catch{
      this.message = "Ah ocurrido un error, avisa al administrador del sistema.";
    }
  }
    


}

export const regExps: { [key: string]: RegExp } = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!.%*?&])[A-Za-z\d@$!.%*?&]{8,}$/gm
};
