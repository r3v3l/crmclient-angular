import { Injectable } from '@angular/core';
import {User} from "../models/user";

@Injectable()
export class UserService {

  lastId: number = 0;

  users: User[] = [];

  constructor() { }

  // Simulate POST /users or /signUp
  addUser(user: User): UserService {
    if(!user.id) {
      user.id = ++this.lastId;
    }
    this.users.push(user);
    return this;
  }

  // Simulate PUT /users/:id
  updateUserById(id: number, values: Object = {}): User {
    let user = this.getUserById(id)
    if(!user){
      return null;
    }
    Object.assign(user, values);
    return user;
  }

  // Simulate DELETE /users/:id
  deleteUserById(id: number): UserService {
    this.users = this.users.filter(user => user.id !== id);
    return this;
  }

  // Simulate GET /users
  getAllUsers(): User[] {
    return this.users;
  }

  // Simulate GET /users/:id
  getUserById(id: number): User {
    return this.users.filter(user => user.id === id).pop();
  }

  //POST /users/signUp
  createUser(email: string, password: string, confirmPassword: string): UserService {
    let user = new User({email: email, password: password, role: 'user', status: 'active'});
    if(!user.id) {
      user.id = ++this.lastId;
    }
    this.users.push(user);
    return this;
  }

  // Simulate POST /users/signIn
  getUserByEmailAndPassword(email: string, password: string): User {
    return this.users.filter(user => user.email === email && user.password === password).pop();
  }

  // Simulate PUT /users/updateEmail/:id
  updateEmail(id: number,  email: string): User {
     let user = this.getUserById(id)
    if(!user){
      return null;
    }
    return this.updateUserById(id, { email: email});
  }

  // Simulate PUT /users/updatePassword/:id
  updatePassword(id: number,  password: string, confirmPassword): User {
    let user = this.getUserById(id)
    if(!user){
      return null;
    }
    return this.updateUserById(id, {password: password});
  }

  // Simulate PUT /users/updateEmail/:id
  updateUserEmail(id: number,  email: string): User {
    let user = this.getUserById(id)
    if(!user){
      return null;
    }
    return this.updateUserById(id, { email: email});
  }

  // Simulate PUT /users/updatePassword/:id
  updateUserPassword(id: number, password: string, confirmPassword): User {
    let user = this.getUserById(id)
    if(!user){
      return null;
    }
    return this.updateUserById(id, {password: password});
  }

}
