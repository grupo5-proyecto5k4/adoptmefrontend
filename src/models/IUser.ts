import { Address } from './IAddress';
import {Donacion} from './IDonacion';

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
    Direccion?: Address; 
    Donacion?:Donacion;  
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
      Direccion?: Address; 
      Donacion?:Donacion; 
      
      constructor() {
        };
      }
    
  