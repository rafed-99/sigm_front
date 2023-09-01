import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { GisementService } from 'src/app/services/gisement.service';
import { PointService } from 'src/app/services/point.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;
    loggedIn='';
    profile='';

    pointCount !:number;
    gisementCount !:number;
    redeyefGisCount !:number;
    moularesGisCount !:number;
    metlaouiGisCount !:number;
    mdhillaGisCount !:number;
    redeyefPointCount !:number;
    moularesPointCount !:number;
    metlaouiPointCount !:number;
    mdhillaPointCount !:number;
 
    constructor(private productService: ProductService, public layoutService: LayoutService, private router:Router, private gisementService:GisementService, private pointService: PointService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.loggedIn=sessionStorage.getItem('LoggedIn')!;
        this.profile=sessionStorage.getItem('profile')!;
        console.log(this.loggedIn);
        
        if(this.loggedIn!='true'){
            this.router.navigate(['/auth/login']);
        }
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
        this.countPoint()
        this.countGisementBySecteur()
        this.countGisementBySecteurRedeyef()
        this.countGisementBySecteurMoulares()
        this.countGisementBySecteurMetlaoui()
        this.countGisementBySecteurMdhilla()
        this.countPointRedeyef()
        this.countPointMoulares()
        this.countPointMetlaoui()
        this.countPointMdhilla()
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    countGisementBySecteur(){
        this.gisementService.countGisementBySecteur().subscribe(
            data=>{
                this.gisementCount = this.processData(data)
                console.log("this.gisementCount :",this.gisementCount);
                
            }
        )
    }

    countGisementBySecteurRedeyef(){
        this.gisementService.countGisementByRedeyef().subscribe(
            data=>{
                this.redeyefGisCount = this.processData(data)
                console.log("this.redeyefGisCount :",this.redeyefGisCount);
                
            }
        )
    }

    countGisementBySecteurMoulares(){
        this.gisementService.countGisementByMoulares().subscribe(
            data=>{
                this.moularesGisCount = this.processData(data)
                console.log("this.moularesGisCount :",this.moularesGisCount);
                
            }
        )
    }

    countGisementBySecteurMetlaoui(){
        this.gisementService.countGisementByMetlaoui().subscribe(
            data=>{
                this.metlaouiGisCount = this.processData(data)
                console.log("this.metlaouiGisCount :",this.metlaouiGisCount);
                
            }
        )
    }

    countGisementBySecteurMdhilla(){
        this.gisementService.countGisementByMdhilla().subscribe(
            data=>{
                this.mdhillaGisCount = this.processData(data)
                console.log("this.mdhillaGisCount :",this.mdhillaGisCount);
                
            }
        )
    }

    countPoint(){
       this.pointService.countPoint().subscribe(
            data=>{
                this.countPoint = this.processData(data);
                console.log(this.countPoint);
                
                console.log(data);
            }
        )
        
    }

    countPointRedeyef(){
        this.pointService.countPointRedeyef().subscribe(
             data=>{
                 this.redeyefPointCount = this.processData(data);
                 console.log(this.redeyefPointCount);
                 
                 console.log(data);
             }
         )
         
     }

     countPointMoulares(){
        this.pointService.countPointMoulares().subscribe(
             data=>{
                 this.moularesPointCount = this.processData(data);
                 console.log(this.moularesPointCount);
                 
                 console.log(data);
             }
         )
         
     }

     countPointMetlaoui(){
        this.pointService.countPointMetlaoui().subscribe(
             data=>{
                 this.metlaouiPointCount = this.processData(data);
                 console.log(this.metlaouiPointCount);
                 
                 console.log(data);
             }
         )
         
     }

     countPointMdhilla(){
        this.pointService.countPointMdhilla().subscribe(
             data=>{
                 this.mdhillaPointCount = this.processData(data);
                 console.log(this.mdhillaPointCount);
                 
                 console.log(data);
             }
         )
         
     }

    processData(data :any){
        return data
    }
}
