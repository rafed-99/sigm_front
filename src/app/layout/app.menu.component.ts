import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Gisement } from '../model/gisement';
import { GisementService } from '../services/gisement.service';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    Points_routes:any[]=[];
    gisements :Gisement[]=[];


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
                    label: 'Centre',
                    items: [
                        { label: 'Bordereaux', icon: 'pi pi-fw pi-ticket', routerLink: ['/centre/bordereau'] },
                        { label: 'Elements', icon: 'pi pi-fw pi-book', routerLink: ['/centre/element'] },
                        { label: 'Archive', icon: 'pi pi-fw pi-save', routerLink: ['/geologie/archive'] },          
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
            
            
            console.log(this.Points_routes);
            
            this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                    ]
                },
                {
                    label: 'Geologie',
                    items: [
                        { label: 'gisement', icon: 'pi pi-fw pi-map', routerLink: ['/geologie/gisement'] },
                        { label: 'archive', icon: 'pi pi-fw pi-save', routerLink: ['/geologie/archive'] },
                        { label: 'couche', icon: 'pi pi-fw pi-align-justify', routerLink: ['/geologie/couche'] },
                        { label: 'point', icon: 'pi pi-fw pi-map-marker', items : 
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
