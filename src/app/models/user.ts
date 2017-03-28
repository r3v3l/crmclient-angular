export class User {

  id: number;
  email: string;
  password: string;
  role: string;
  status: string;

  constructor(values: Object = {}){
    Object.assign(this, values);
  }

}
