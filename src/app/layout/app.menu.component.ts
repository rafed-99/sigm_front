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
        if(sessionStorage.getItem('profile')=='geologie'){
            this.generate_points_routes();
        }
        
        else if(sessionStorage.getItem('profile')=='centre'){
            this.generate_centre_routes();
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
                        { label: 'Bordereaux', icon: 'pi pi-fw pi-id-card', routerLink: ['/centre/bordereau'] },
                        { label: 'Elements', icon: 'pi pi-fw pi-id-card', routerLink: ['/centre/element'] },
                               
                    ]
                },
            ]
        
    }
    
    generate_points_routes(){
        let routes:any;
        this.gisementService.retrieveGisements().subscribe(data => {
            this.gisements=data;
            
            
            for( let gis of this.gisements){
                
             routes =  {
                            label : gis.secteur, items : [ 
                                {
                                    label : gis.gisementLibelle, routerLink:['/geologie/point/'+gis.gisementId]
                                }
                            ]
                        } 
                        this.Points_routes.push(routes);
                    
            }
            
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
                        { label: 'gisement', icon: 'pi pi-fw pi-id-card', routerLink: ['/geologie/gisement'] },
                        { label: 'archive', icon: 'pi pi-fw pi-id-card', routerLink: ['/geologie/archive'] },
                        { label: 'couche', icon: 'pi pi-fw pi-id-card', routerLink: ['/geologie/couche'] },
                        { label: 'point', icon: 'pi pi-fw pi-id-card', items : 
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
                {
                    label: 'UI Components',
                    items: [
                        { label: 'rafed', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                        { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                        { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                        { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                        { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                        { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                        { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                        { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                        { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                        { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                        { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                        { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                        { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                        { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                        { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                        { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                    ]
                },
                {
                    label: 'Prime Blocks',
                    items: [
                        { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                        { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                    ]
                },
                {
                    label: 'Utilities',
                    items: [
                        { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
                        { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                    ]
                },
                {
                    label: 'Pages',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        {
                            label: 'Landing',
                            icon: 'pi pi-fw pi-globe',
                            routerLink: ['/landing']
                        },
                        {
                            label: 'Auth',
                            icon: 'pi pi-fw pi-user',
                            items: [
                                {
                                    label: 'Login',
                                    icon: 'pi pi-fw pi-sign-in',
                                    routerLink: ['/auth/login']
                                },
                                {
                                    label: 'Error',
                                    icon: 'pi pi-fw pi-times-circle',
                                    routerLink: ['/auth/error']
                                },
                                {
                                    label: 'Access Denied',
                                    icon: 'pi pi-fw pi-lock',
                                    routerLink: ['/auth/access']
                                }
                            ]
                        },
                        {
                            label: 'Crud',
                            icon: 'pi pi-fw pi-pencil',
                            routerLink: ['/pages/crud']
                        },
                        {
                            label: 'Timeline',
                            icon: 'pi pi-fw pi-calendar',
                            routerLink: ['/pages/timeline']
                        },
                        {
                            label: 'Not Found',
                            icon: 'pi pi-fw pi-exclamation-circle',
                            routerLink: ['/notfound']
                        },
                        {
                            label: 'Empty',
                            icon: 'pi pi-fw pi-circle-off',
                            routerLink: ['/pages/empty']
                        },
                    ]
                },
                {
                    label: 'Hierarchy',
                    items: [
                        {
                            label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                {
                                    label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                    items: [
                                        { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                        { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                        { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                                    ]
                                },
                                {
                                    label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                    items: [
                                        { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                                    ]
                                },
                            ]
                        },
                        {
                            label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                {
                                    label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                    items: [
                                        { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                        { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    ]
                                },
                                {
                                    label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                    items: [
                                        { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {
                    label: 'Get Started',
                    items: [
                        {
                            label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                        },
                        {
                            label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
                        }
                    ]
                }
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
}
