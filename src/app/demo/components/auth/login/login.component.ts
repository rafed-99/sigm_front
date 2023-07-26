import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/services/admin.service';
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

    email!: string;

    responsedata : any;

    user : User = new User();

    log : boolean = false;

    log1 : boolean = false;

    log2 : boolean = true;

    constructor(public layoutService: LayoutService,private router:Router,private loginService : LoginService, private adminService : AdminService) { }

    // LogIn(){
        
    //     this.loginService.getUsers().subscribe(
    //         data=>{
    //             this.users = data
    //             console.log(this.users);
    //             let user=this.users.find(user=>{
    //                 return user.username==this.username && user.password==this.password;
    //             }) as User;
    //             if (user){
    //                 sessionStorage.setItem('LoggedIn','true');
    //                 sessionStorage.setItem('profile',user.profile!)
    //                 this.router.navigate(['/']);
    //             }
    //             else{
    //                 console.error('Check User  or Password');
                    
    //             }
    //         }
    //     )
        
    // }

    // retrieveUsers(){
    //     this.adminService.retrieveUsers().subscribe(
    //         data =>{
    //             this.users = data;
    //         }
    //     )
    // }

    logIn(){
                this.loginService.authenticate(this.user.email!,this.user.password!).subscribe(
                data=>{
                    this.responsedata = data;
                    sessionStorage.setItem('LoggedIn','true');
                    // console.log(this.user!.role!);
                    console.log("++++++",this.user.email);
                    sessionStorage.setItem('email',this.user.email!)
                    console.log("--------",this.user.password);
                    sessionStorage.setItem('access_token',this.responsedata.access_token)
                    console.warn("access_token" , this.responsedata.access_token);
                    
                    var decoded = jwtDecode(this.responsedata.access_token);
                    console.log(decoded);
                    var  tokenString = JSON.stringify(decoded)
                    console.warn(tokenString);
                    let index = tokenString.indexOf("_")
                    let index1 =tokenString.lastIndexOf("_")
                    console.warn(index);
                    console.warn(index1);
                    if(index==index1){
                        let profile = tokenString.substring(index+1,tokenString.length-2) 
                        console.warn(profile); 
                        sessionStorage.setItem('profile',profile)
                    }else{
                        let profile = tokenString.substring(index+1,index1)
                        console.warn(profile); 
                        sessionStorage.setItem('profile',profile)
                    }
                    
                    

                    let index2 = tokenString.lastIndexOf("_")
                    let role = tokenString.substring(index2+1,tokenString.length-2)
                    console.warn("role ", role);

                    sessionStorage.setItem('role',role)
                            
                    // sessionStorage.setItem('role',this.user!.role!)
                    this.router.navigate(['/']);
                }
            )
       
        
    }

    register(){
        this.loginService.register(this.user).subscribe(
        data=>{
            this.responsedata = data;
            console.warn(data);
            
            console.warn(this.user.firstname);
            console.warn(this.user.lastname);
            // sessionStorage.setItem('LoggedIn','true');
            // // console.log(this.user!.role!);
            // console.log("++++++",this.user.email);
            // sessionStorage.setItem('email',this.user.email!)
            // console.log("--------",this.user.password);
            sessionStorage.setItem('access_token',this.responsedata.access_token)
            console.warn("access_token" , this.responsedata.access_token);
            
            
           
            // sessionStorage.setItem('role',this.user!.role!)
            alert("Registration done with success , wait until ADMIN assign your role");
        }
    )


}

    decodeToken(){
        let access_token = this.responsedata.access_token;
        var decoded = jwtDecode(access_token);
        console.log(decoded);
       var  token = JSON.stringify(decoded)
       console.warn(token);
        let index = token.indexOf("_")
        let index1 =token.lastIndexOf("_")
        console.warn(index);
        console.warn(index1);
        let token1 = token.substring(index+1,index1)
        console.warn(token1); 
    }

    buttonA(){
        this.log = true;
        this.log1 = false;
        this.log2 = false;
    }

    buttonB(){
        this.log1 = true;
        this.log = false
        this.log2 = false;
    }

    returnBack(){
        this.log2 = true;
    }
}
