import { Privileges } from './../models/privileges';
import { UserService } from './../models/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  userId: number;
  user: User;
  permissions = [];
  assignedPermissions = [];
  checkedList:any;
  masterSelected:boolean;
  newPermissions = [];
  roleName: string;
  assignPrivilegeInfo: Privileges;

  
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() {
    this.masterSelected = false;

    this.userService.getPermissionsAll().subscribe(
        (res) => {
        this.permissions = res;
        this.roleName = "ROLE_ADMIN";
        this.getPermissionByRoleName(this.roleName);
        
        //this.getNewObjectPermissions();

        },
        (error) => {
           this.router.navigate(['login']);
        }
    );
    
   
 

  }

  getNewObjectPermissions() {
         for (let i = 0; i < this.permissions.length; i++) {
        let newPermission = {
          id: this.permissions[i].privilegeId,
          name: this.permissions[i].name,
          isSelected: ((this.assignedPermissions.some(el => el.privilegeId === this.permissions[i].privilegeId)) ? true : false)
        };
        this.newPermissions.push(newPermission);
    }

    console.log(this.newPermissions);
  }

  ddroleChange(event) {
    this.roleName = event.target.options[event.target.options.selectedIndex].text;
    this.newPermissions = [];
    this.getPermissionByRoleName(this.roleName);
    
  }

  getPermissionByRoleName(rolename){
    this.userService.getPermissionsByRoleName(rolename).subscribe(
        (res) => {
          this.assignedPermissions = res.privileges;
        this.getNewObjectPermissions();
        this.getCheckedItemList();

        },
        (error) => {
          console.log(error);
        }
      );
  }



  checkUncheckAll() {
    for (var i = 0; i < this.newPermissions.length; i++) {
      this.newPermissions[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.newPermissions.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.newPermissions.length; i++) {
      if(this.newPermissions[i].isSelected)
      this.checkedList.push(this.newPermissions[i]);
    }
    this.checkedList = this.checkedList;
  }

  AssignPermission() {
    let privileges = [];
    for (var i = 0; i < this.checkedList.length; i++){
      privileges.push(this.checkedList[i].name);
    }
    this.assignPrivilegeInfo = new Privileges();
    this.assignPrivilegeInfo.roleName = this.roleName;
    this.assignPrivilegeInfo.privileges = privileges;
    

    this.userService.assignPermissionsByRoleName(this.assignPrivilegeInfo).subscribe(
      (res) => {
        alert(res);
        location.reload();
      },
        (error) => {
          console.log(error);
        }
      );
    

  }

  DeletePermissions() {
    
    var check = confirm("Are you sure to delete permissions?")
        if(check){
               let privileges = [];

    this.assignPrivilegeInfo = new Privileges();
    this.assignPrivilegeInfo.roleName = this.roleName;
    this.assignPrivilegeInfo.privileges = privileges;
    this.userService.assignPermissionsByRoleName(this.assignPrivilegeInfo).subscribe(
      (res) => {
        alert("Permissions Delete Successfully");
        location.reload();
      },
        (error) => {
          console.log(error);
        }
      );
        }else{
            

        }
 
  }

}
