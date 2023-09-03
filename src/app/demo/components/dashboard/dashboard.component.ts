import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { GisementService } from 'src/app/services/gisement.service';
import { PointService } from 'src/app/services/point.service';
import { EchantillonService } from 'src/app/services/echantillon.service';
import { AnalyseService } from 'src/app/services/analyse.service';
import { BordereauService } from 'src/app/services/bordereau.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;
    loggedIn='';
    profile='';
    role='';
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
    countToVerifySample !:number;
    countSentSample !:number;
    countReceiveSample !:number;
    countAnalysedSample !:number;
    countNewAnalyse !:number;
    countConfirmAnalyse !:number;
    countValidAnalyse !:number;
    countVerifyReceipt !:number;
    countOnHoldReceipt !:number;
    countInProgressReceipt !:number;
    countAnalysedReceipt !:number;
    countAdminn !:number;
    countGeologieAdmin !:number;
    countGeologieUser !:number;
    countGeologieConsult !:number;
    countCentreAdmin !:number;
    countCentreUser !:number;
    countCentreConfirm !:number;
 
    constructor(public layoutService: LayoutService, private router:Router, private gisementService:GisementService, private pointService: PointService, private echantillonService : EchantillonService
        ,private analyseService: AnalyseService,private bordereauService:BordereauService,private adminService:AdminService) {
       
    }

    ngOnInit() {
        this.loggedIn=sessionStorage.getItem('LoggedIn')!;
        this.profile=sessionStorage.getItem('profile')!;
        this.role=sessionStorage.getItem('role')!;
        console.log(this.loggedIn);
        
        if(this.loggedIn!='true'){
            this.router.navigate(['/auth/login']);
        }
        if(this.profile==="GEOLOGIE"){
            this.geologystats()
        }
        else if(this.profile==="CENTRE"){
            this.centerStats()
        }
        else{
            this.adminStats()
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

     countToverify(){
        this.echantillonService.countToVerify().subscribe(
             data=>{
                 this.countToVerifySample = this.processData(data);
                 console.log(this.countToVerifySample);
                 
                 console.log(data);
             }
         )
         
     }

     countSent(){
        this.echantillonService.countSent().subscribe(
             data=>{
                 this.countSentSample = this.processData(data);
                 console.log(this.countSentSample);
                 
                 console.log(data);
             }
         )
         
     }

     countReceived(){
        this.echantillonService.countReceive().subscribe(
             data=>{
                 this.countReceiveSample = this.processData(data);
                 console.log(this.countReceiveSample);
                 
                 console.log(data);
             }
         )
         
     }

     countAnalysed(){
        this.echantillonService.countAnalysed().subscribe(
             data=>{
                 this.countAnalysedSample = this.processData(data);
                 console.log(this.countAnalysedSample);
                 
                 console.log(data);
             }
         )
         
     }

     geologystats(){
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
        this.countToverify()
        this.countAnalysed()
        this.countSent()
        this.countReceived()
     }

     countNewAnalysis(){
        this.analyseService.countNewAnalyse().subscribe(
             data=>{
                 this.countNewAnalyse = this.processData(data);
                 console.log(this.countNewAnalyse);
                 
                 console.log(data);
             }
         )
         
     }

     countConfirmAnalysis(){
        this.analyseService.countConfirmAnalyse().subscribe(
             data=>{
                 this.countConfirmAnalyse = this.processData(data);
                 console.log(this.countConfirmAnalyse);
                 
                 console.log(data);
             }
         )
         
     }

     countValidAnalysis(){
        this.analyseService.countValidAnalyse().subscribe(
             data=>{
                 this.countValidAnalyse = this.processData(data);
                 console.log(this.countValidAnalyse);
                 
                 console.log(data);
             }
         )  
     }

     countToVerifyReceipt(){
        this.bordereauService.countToVerify().subscribe(
             data=>{
                 this.countVerifyReceipt = this.processData(data);
                 console.log(this.countVerifyReceipt);
                 
                 console.log(data);
             }
         )  
     }

     countHoldReceipt(){
        this.bordereauService.countOnHold().subscribe(
             data=>{
                 this.countOnHoldReceipt = this.processData(data);
                 console.log(this.countOnHoldReceipt);
                 
                 console.log(data);
             }
         )  
     }

     countProgressReceipt(){
        this.bordereauService.countInProgress().subscribe(
             data=>{
                 this.countInProgressReceipt = this.processData(data);
                 console.log(this.countInProgressReceipt);
                 
                 console.log(data);
             }
         )  
     }

     countAnalyseReceipt(){
        this.bordereauService.countAnalysed().subscribe(
             data=>{
                 this.countAnalysedReceipt = this.processData(data);
                 console.log(this.countAnalysedReceipt);
                 
                 console.log(data);
             }
         )  
     }

     centerStats(){
        this.countAnalyseReceipt()
        this.countHoldReceipt()
        this.countProgressReceipt()
        this.countToVerifyReceipt()
        this.countConfirmAnalysis()
        this.countNewAnalysis()
        this.countValidAnalysis()
     }

     countAdmin(){
        this.adminService.countAdmin().subscribe(
             data=>{
                 this.countAdminn = this.processData(data);
                 console.log(this.countAdminn);
                 
                 console.log(data);
             }
         )  
     }

     countGeoAdmin(){
        this.adminService.countGeoAdmin().subscribe(
             data=>{
                 this.countGeologieAdmin = this.processData(data);
                 console.log(this.countGeologieAdmin);
                 
                 console.log(data);
             }
         )  
     }

     countGeoUser(){
        this.adminService.countGeoUser().subscribe(
             data=>{
                 this.countGeologieUser = this.processData(data);
                 console.log(this.countGeologieUser);
                 
                 console.log(data);
             }
         )  
     }

     countCenterAdmin(){
        this.adminService.countCenterAdmin().subscribe(
             data=>{
                 this.countCentreAdmin = this.processData(data);
                 console.log(this.countCentreAdmin);
                 
                 console.log(data);
             }
         )  
     }

     countCenterUser(){
        this.adminService.countCenterUser().subscribe(
             data=>{
                 this.countCentreUser = this.processData(data);
                 console.log(this.countCentreUser);
                 
                 console.log(data);
             }
         )  
     }

     countCenterConfirm(){
        this.adminService.countCenterConfirm().subscribe(
             data=>{
                 this.countCentreConfirm = this.processData(data);
                 console.log(this.countCentreConfirm);
                 
                 console.log(data);
             }
         )  
     }

     countGeoConsult(){
        this.adminService.countGeoConsult().subscribe(
             data=>{
                 this.countGeologieConsult = this.processData(data);
                 console.log(this.countGeologieConsult);
                 
                 console.log(data);
             }
         )  
     }

     adminStats(){
        this.countAdmin();
        this.countGeoAdmin();
        this.countGeoUser();
        this.countGeoConsult();
        this.countCenterAdmin();
        this.countCenterUser();
        this.countCenterConfirm();
     }

    processData(data :any){
        return data
    }
}
