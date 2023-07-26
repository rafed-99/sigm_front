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

    role :string = ""

    darkMode ?:boolean =false;

    constructor(public layoutService: LayoutService , private router:Router) { }

    ngOnInit() : void{
        
        
        
        this.profile = sessionStorage.getItem("profile")!;

        console.log("profile : ",this.profile);

        this.role = sessionStorage.getItem("role")!;

        console.log("role : ",this.role);
        
        
    }

    Logout(){
        sessionStorage.clear();
        this.router.navigate(['/auth/login']);
    }

    changeTheme(theme: string, colorScheme: string) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const newHref = themeLink.getAttribute('href')!.replace(this.layoutService.config.theme, theme);
        this.layoutService.config.colorScheme
        this.replaceThemeLink(newHref, () => {
            this.layoutService.config.theme = theme;
            this.layoutService.config.colorScheme = colorScheme;
            this.layoutService.onConfigUpdate();
        });
    }

    replaceThemeLink(href: string, onComplete: Function) {
        const id = 'theme-css';
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
            onComplete();
        });
    }

    buttonClicked(){
    
    if(!this.darkMode){
        this.changeTheme('vela-blue', 'dark')
        
    }
    else{
        this.changeTheme('lara-light-indigo', 'light')
    }
    this.darkMode = !this.darkMode;
    }
}
