import { JsonpClientBackend } from "@angular/common/http";

export interface IUser {
    id?: number;
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
    direccion: string;   
    }
  
    export class User implements IUser {
      id?: number;
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
      direccion: string;
    
      constructor() {
        };
      }
    
  