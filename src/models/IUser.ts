import { Address } from './IAddress';

interface IUser {
    _id?: number;
    nombres?: string;
    apellidos?: string;
    correoElectronico: string;
    idEstado?: number; 
    dni?: number;
    numeroContacto: number;
    fechaNacimiento?: Date;
    facebook?: string;
    instagram?: string;
    fechaCreacion: Date;
    fechaModificacion?: Date;
    tipoUsuario?: number;
    contrasenia: string;
    Direccion: Address;   
    }
  
    export class User implements IUser {
      _id?: number;
      nombres?: string;
      apellidos?: string;
      correoElectronico: string;
      idEstado?: number; 
      dni?: number;
      numeroContacto: number;
      fechaNacimiento?: Date;
      facebook?: string;
      instagram?: string;
      fechaCreacion: Date;
      fechaModificacion?: Date;
      tipoUsuario?: number;
      contrasenia: string;
      Direccion: Address; 
    
      constructor() {
        };
      }
    
  