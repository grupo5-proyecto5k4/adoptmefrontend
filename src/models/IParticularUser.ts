export interface IParticularUser {
    id?: number;
    name?: string;
    lastname?: string;
    email: string;
    statusId?: number;
    dni?: number;
    contactNumber?: string;
    birthDate: Date;
    facebook: string;
    instagram: string;
    createdAt: Date;
    updateAt?: Date;
    roleId?: number;
    password: string;
    }
  
    export class ParticularUser implements IParticularUser {
        id?: number;
        name?: string;
        lastname?: string;
        email: string;
        statusId?: number;
        dni?: number;
        contactNumber?: string;
        birthDate: Date;
        facebook: string;
        instagram: string;
        createdAt: Date;
        updateAt?: Date;
        roleId?: number;
        password: string;
    
      constructor() {
        };
      }
    
  