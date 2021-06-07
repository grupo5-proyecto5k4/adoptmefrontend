export interface IRescatistUser {
    id?: number;
    createdAt: Date;
    updateAt?: Date;
    roleId?: number;
    password: string;
    }
  
    export class RescatistUser implements IRescatistUser {
        id?: number;
        createdAt: Date;
        updateAt?: Date;
        roleId?: number;
        password: string;
    
      constructor() {
        };
      }