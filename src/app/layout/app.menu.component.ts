import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Gisement } from '../model/gisement';
import { GisementService } from '../services/gisement.service';
import { LayoutService } from './service/app.layout.service';
import { Routes } from '@angular/router';
import { PointComponent } from '../geologie/point/point.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    Points_routes:any[]=[];
    gisements :Gisement[]=[];
    _routes:Routes=[];
    url:string='';


    constructor(public layoutService: LayoutService, private gisementService : GisementService) { }

    ngOnInit() {
        if(sessionStorage.getItem('profile')==='GEOLOGIE'){
            this.generate_points_routes();
        }
        
        else if(sessionStorage.getItem('profile')=='CENTRE'){
            this.generate_centre_routes();
        }
        else if(sessionStorage.getItem('profile')=='ADMIN'){
            this.generate_admin_routes();
        }
       
    }

    generate_centre_routes(){
        let routes:any;
        
            
            this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                    ]
                },
                {
                    label: 'Research Center',
                    items: [
                        { label: 'Receipts', icon: 'pi pi-fw pi-ticket', routerLink: ['/centre/bordereau'] },
                        { label: 'Elements', icon: 'pi pi-fw pi-book', routerLink: ['/centre/element'] },
                        { label: 'Archives', icon: 'pi pi-fw pi-save', routerLink: ['/centre/archive'] },          
                    ]
                },
            ]
        
    }
    
    generate_points_routes(){
        let routes:any;
        let secteurList:string[]=[]
        this.gisementService.retrieveGisements().subscribe(data => {
            this.gisements=data;
            this.gisements.forEach(gisement=>{
                let name = gisement.secteur;
                if(!secteurList.some(e => e === name)){
                    secteurList.push(name!);
            }
         })
         console.warn('secteurList',  secteurList);
         
            secteurList.forEach(secteur=>{

                let gisListSecteur=[];
                let items=[]
                gisListSecteur =this.gisements.filter(gis=>{
                   
                    return gis.secteur==secteur;
                
                })
                console.log('gisListSecteur', gisListSecteur);
                
                for( let gis of gisListSecteur){
                    console.log(gis.gisementId);
                    
                items.push({
                    label : gis.gisementLibelle, routerLink:['/geologie/point/'+gis.gisementId]
                })
                    
                    
                           
                   }
                   routes =  {
                    label : secteur, items 
                    
                } 
                this.Points_routes.push(routes);



            })
            this.gisements.forEach(gis=>{
                 // genrate Routes for point routing module
                 let url=gis.gisementId?.toString()
                 this._routes.push({
                     path:url,
                     component:PointComponent
                 })
            })
            localStorage.setItem('_routes',JSON.stringify(this._routes));
            
            console.log(this.Points_routes);
            console.log(' _routes: ', this._routes);
            
            this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                    ]
                },
                {
                    label: 'Geology',
                    items: [
                        { label: 'Field', icon: 'pi pi-fw pi-map', routerLink: ['/geologie/gisement'] },
                        { label: 'Archives', icon: 'pi pi-fw pi-save', routerLink: ['/geologie/archive'] },
                        { label: 'Layers', icon: 'pi pi-fw pi-align-justify', routerLink: ['/geologie/couche'] },
                        { label: 'Points', icon: 'pi pi-fw pi-map-marker', items : 
                            // {
                            //     label : 'metlaoui', items : [ 
                            //         {
                            //             label : 'rdf', routerLink:['/geologie/point/1']
                            //         }
                            //     ]
                            // },
                            // {
                            //     label : 'redeyef', items : [ 
                            //         {
                            //             label : 'sat7a zarge', routerLink:['/geologie/point/2']
                            //         }
                            //     ]
                            // },
                            // {
                            //     label : 'moulares', items : [ 
                            //         {
                            //             label : 'molares', routerLink:['/geologie/point/3']
                            //         }
                            //     ]
                            // }
                            this.Points_routes
                        },
                    ]
                },
            ];
        });


        // this.gisementService.retrieveGisements().subscribe(
        //     {
        //         next:(data)=>{this.gisements=data;},
        //         error:(e)=>{console.log(e);
        //         },
        //         complete:()=>{ console.log('complete', this.gisements);}
            
        //     }
        // );
       
        
    }

    generate_admin_routes(){
        console.warn("this.generate_admin_routes");
        
        let routes:any;
        
            
            this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                    ]
                },
                {
                    label: 'User',
                    items: [
                        { label: 'User Management', icon: 'pi pi-fw pi-ticket', routerLink: ['/admin/users'] },         
                    ]
                },
            ]
        
    }
}
