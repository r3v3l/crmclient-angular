import {User} from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });
  it('should accept values in the constructor', () => {
    let user = new User({
      email: 'adrian.stolarski@gmail.com',
      password: 'P3psiM@x',
      role: 'user',
      status: 'active'
    });
    expect(user.email).toEqual('adrian.stolarski@gmail.com');
    expect(user.password).toEqual('P3psiM@x');
    expect(user.role).toEqual('user');
    expect(user.status).toEqual('active');
  });
});
