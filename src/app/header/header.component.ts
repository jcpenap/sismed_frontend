import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../shared/storage.service';
import { faPaperclip,faDownload,faUserPlus,faExclamationTriangle,faNotesMedical,faSignOutAlt,faInfo } from '@fortawesome/free-solid-svg-icons'; 


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  
  i_faPaperclip = faPaperclip; 
  i_faDownload = faDownload;
  i_faUserPlus=faUserPlus;
  i_faExclamationTriangle=faExclamationTriangle;
  i_faNotesMedical=faNotesMedical;
  i_faSignOutAlt = faSignOutAlt;
  i_faInfo= faInfo;
  
  Admin = false;
  
  
  constructor(private router: Router,
              private storageService: StorageService,
              private route: ActivatedRoute ) { }

  ngOnInit(): void {
    try{
      if( this.storageService.userinfo.token == "" || this.storageService.userinfo.token == undefined)
      this.router.navigate(['../login'], { relativeTo: this.route });
    }catch{
      this.router.navigate(['../login'], { relativeTo: this.route });
    } 
    let roles = [];
    roles =this.storageService.userinfo.roles;
    this.Admin= roles.includes('ROLE_ADMIN');
  }

  loginout(){
    this.storageService.clear(); 
    this.router.navigate(['../login'], { relativeTo: this.route });

  }

}
