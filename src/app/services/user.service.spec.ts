import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import {User} from "../models/user";

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
  });

  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('should return an empty array by default', inject([UserService], (service: UserService) => {
    expect(service.getAllUsers()).toEqual([]);
  }));

  it('should return all todos', inject([UserService], (service: UserService) => {
    let user1 = new User({
      email: 'email1@google.com', password: 'R3v3l@t104', role: 'user', status: 'active'
    });
    let user2 = new User({
      email: 'email2@google.com', password: 'R3v3l@t104', role: 'user', status: 'active'
    });
    service.addUser(user1);
    service.addUser(user2);
    expect(service.getAllUsers()).toEqual([user1, user2]);
  }));

  it('should automatically assign an incrementing id', inject([UserService], (service: UserService) => {
    let user1 = new User({email: 'email1@google.com', password: 'R3v3l@t104', role: 'user', status: 'active'});
    let user2 = new User({email: 'email2@google.com', password: 'R3v3l@t104', role: 'user', status: 'active'});
    service.addUser(user1);
    service.addUser(user2);
    expect(service.getUserById(1)).toEqual(user1);
    expect(service.getUserById(2)).toEqual(user2);
  }));

  it('should remove user service with the corresponding id', inject([UserService], (service: UserService) => {
    let user1 = new User({email: 'email1@google.com', password: 'R3v3l@t104', role: 'user', status: 'active'});
    let user2 = new User({email: 'email2@google.com', password: 'R3v3l@t104', role: 'user', status: 'active'});
    service.addUser(user1);
    service.addUser(user2);
    expect(service.getAllUsers()).toEqual([user1, user2]);
    service.deleteUserById(1);
    expect(service.getAllUsers()).toEqual([user2]);
    service.deleteUserById(2);
    expect(service.getAllUsers()).toEqual([]);
  }));

  it('should not removing anything if user with corresponding id is not found', inject([UserService], (service: UserService) => {
    let user1 = new User({email: 'email1@google.com', password: 'R3v3l@t104', role: 'user', status: 'active'});
    let user2 = new User({email: 'email2@google.com', password: 'R3v3l@t104', role: 'user', status: 'active'});
    service.addUser(user1);
    service.addUser(user2);
    expect(service.getAllUsers()).toEqual([user1, user2]);
    service.deleteUserById(3);
    expect(service.getAllUsers()).toEqual([user1, user2]);
  }));

  it('should return todo with the corresponding id and updated data', inject([UserService], (service: UserService) => {
    let user = new User({email: 'email1@google.com', password: 'R3v3l@t104', role: 'user', status: 'active'});
    service.addUser(user);
    let updatedUser = service.updateUserById(1, {
      email: "email2@google.com"
    });
    expect(updatedUser.email).toEqual('email2@google.com');
  }));

  it('should return null if user is not found', inject([UserService], (service: UserService) => {
    let user = new User({email: 'email1@google.com', password: 'R3v3l@t104', role: 'user', status: 'active'});
    service.addUser(user);
    let updatedUser = service.updateUserById(2, {
        email: 'email2@google.com'
    });
    expect(updatedUser).toEqual(null);
  }));

  it('should sign up user', inject([UserService], (service: UserService) => {
    let user = new User({id: 1, email: 'email1@google.com', password: 'R3v3l@t104', role: 'user', status: 'active'});
    service.createUser('email1@google.com', 'R3v3l@t104', 'R3v3l@t104');
    expect(service.getUserById(1)).toEqual(user);
  }));

  it('should sign in user', inject([UserService], (service: UserService) => {
    let user = new User({id: 1, email: 'email1@google.com', password: 'R3v3l@t104', role: 'user', status: 'active'});
    service.createUser('email1@google.com', 'R3v3l@t104', 'R3v3l@t104');
    expect(service.getUserByEmailAndPassword(user.email, user.password)).toEqual(user);
  }));

  it('should update user email', inject([UserService], (service: UserService) => {
    let user = new User({id: 1, email: 'email2@google.com', password: 'R3v3l@t104', role: 'user', status: 'active'});
    service.createUser('email1@google.com', 'R3v3l@t104', 'R3v3l@t104');
    let newUser = service.updateEmail(1, 'email2@google.com');
    expect(newUser.email).toEqual('email2@google.com');
    expect(service.getUserByEmailAndPassword('email2@google.com', user.password)).toEqual(user);
  }));

  it('should update user password', inject([UserService], (service: UserService) => {
    let user = new User({id: 1, email: 'email1@google.com', password: 'R3v3l@t104L0A', role: 'user', status: 'active'});
    service.createUser('email1@google.com', 'R3v3l@t104', 'R3v3l@t104');
    let newUser = service.updatePassword(1, 'R3v3l@t104L0A', 'R3v3l@t104L0A');
    expect(newUser.password).toEqual('R3v3l@t104L0A');
    expect(service.getUserByEmailAndPassword(user.email, 'R3v3l@t104L0A')).toEqual(user);
  }));

  it('should update current user email', inject([UserService], (service: UserService) => {
    let user = new User({id: 1, email: 'email2@google.com', password: 'R3v3l@t104', role: 'user', status: 'active'});
    service.createUser('email1@google.com', 'R3v3l@t104', 'R3v3l@t104');
    let newUser = service.updateUserEmail(1, 'email2@google.com');
    expect(newUser.email).toEqual('email2@google.com');
    expect(service.getUserByEmailAndPassword('email2@google.com', user.password)).toEqual(user);
  }));

  it('should update current user password', inject([UserService], (service: UserService) => {
    let user = new User({id: 1, email: 'email1@google.com', password: 'R3v3l@t104L0A', role: 'user', status: 'active'});
    service.createUser('email1@google.com', 'R3v3l@t104', 'R3v3l@t104');
    let newUser = service.updateUserPassword(1, 'R3v3l@t104L0A', 'R3v3l@t104L0A');
    expect(newUser.password).toEqual('R3v3l@t104L0A');
    expect(service.getUserByEmailAndPassword(user.email, 'R3v3l@t104L0A')).toEqual(user);
  }));

});
