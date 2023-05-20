import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    profile :string = ""

    constructor(public layoutService: LayoutService , private router:Router) { }

    ngOnInit() : void{
        
        
        this.profile = sessionStorage.getItem("profile")!;
        console.log(this.profile);
        
    }

    Logout(){
        sessionStorage.clear();
        this.router.navigate(['/auth/login']);
    }
}
