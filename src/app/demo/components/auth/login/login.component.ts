import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    username!: string;

    users : User[] = []

    constructor(public layoutService: LayoutService,private router:Router,private loginService : LoginService) { }

    LogIn(){
        
        this.loginService.getUsers().subscribe(
            data=>{
                this.users = data
                console.log(this.users);
                let user=this.users.find(user=>{
                    return user.username==this.username && user.password==this.password;
                }) as User;
                if (user){
                    sessionStorage.setItem('LoggedIn','true');
                    sessionStorage.setItem('profile',user.profile!)
                    this.router.navigate(['/']);
                }
                else{
                    console.error('Check User  or Password');
                    
                }
            }
        )
        
    }
}
