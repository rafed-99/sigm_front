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

  ngOnInit() :void{
   this.retrieveUsers();

   this.role = [
    {label: 'USER', value: 'User'},
    {label: 'ADMIN', value: 'Admin'},
    {label: 'GEOLOGIE ADMIN', value: 'Geologie Admin'},
    {label: 'GEOLOGIE USER', value: 'Geologie User'},
    {label: 'GEOLOGIE CONSULT', value: 'Geologie Consult'},
    {label: 'CENTRE ADMIN', value: 'Centre Admin'},
    {label: 'CENTRE USER', value: 'Centre User'},
    {label: 'CENTRE CONFIRM', value: 'Centre Confirm'},
  ]
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

  }

  updateUserRole(user : User){

  }
}
