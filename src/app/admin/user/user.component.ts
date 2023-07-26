import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(private adminService : AdminService){}
  users : User[] = []
  submitted ?: boolean;
  deleteDialog ?: boolean;
  updateDialog ?: boolean;
  currentUser : User = new User();
  role ?: any[];

  role1 : string =""

  ngOnInit() :void{
   this.retrieveUsers();

   this.role = [
    {label: 'USER', value: 'USER'},
    {label: 'ADMIN', value: 'ADMIN'},
    {label: 'GEOLOGIE ADMIN', value: 'GEOLOGIE_ADMIN'},
    {label: 'GEOLOGIE USER', value: 'GEOLOGIE_USER'},
    {label: 'GEOLOGIE CONSULT', value: 'GEOLOGIE_CONSULT'},
    {label: 'CENTRE ADMIN', value: 'CENTRE_ADMIN'},
    {label: 'CENTRE USER', value: 'CENTRE_USER'},
    {label: 'CENTRE CONFIRM', value: 'CENTRE_CONFIRM'},
  ]

  this.role1 = sessionStorage.getItem('role')!;
  }

  retrieveUsers(){
    this.adminService.retrieveUsers().subscribe(
      data =>{
        this.users = data
        console.log(data);
      }
    )
  }


  deleteUserModal(userHtml :User){
    this.currentUser = userHtml;
    this.deleteDialog = true;
  }

  updateUserRoleModal(userHtml :User){
    console.log(userHtml.role);
    
    this.currentUser = userHtml;
    this.updateDialog = true;
  }

  hideDeleteDialog() {
    this.submitted = false;
    this.deleteDialog = false;
  }

  hideUpdateDialog() {
    this.updateDialog = false;
    this.submitted = false;
  }

  deleteUser(){
    this.adminService.deleteUser(this.currentUser.id!).subscribe(
      ()=>{
        // this.messageService.add({severity:'error', summary:'Archive '+this.currentArchive.archiveLibelle, detail:'Deleted with success' , life:3000});
        this.users.forEach((element,index)=>{
          if(element.id==this.currentUser.id!) this.users.splice(index,1);
       });
      }
     )
     this.deleteDialog = false;
  }

  updateUserRole(user : User){
    this.adminService.updateUser(user).subscribe(
      data => {
        console.log(data);
        
      }
    )
    this.updateDialog = false;
  }
}
