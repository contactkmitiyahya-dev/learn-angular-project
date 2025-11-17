import { UserService } from './../../../../data-access/UserService';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent{
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getAllUsers();
  }

  calculateUsers() {
    const customerCount = this.userService.fetchNbInList(this.users, "accountCategory", "Customer");
    console.log(customerCount);
  }
}
