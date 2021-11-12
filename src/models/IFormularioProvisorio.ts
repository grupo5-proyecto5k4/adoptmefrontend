import { Address } from './IAddress';

interface IFormularioProvisorio {
    _id?: string;
    otraMascota: number;
    descripcionOtraMascota?: string;
    gastosCubiertos: number;
    seguimiento: number;
    vivienda: number;
    permiso: number;
    tiempoTenencia: number;
    espacioAbierto: number;
    descripcionCercamiento?: string;
    tiempoSuficiente: number;
    estadoId?: string;
    Direccion: Address;   
    mascotaId: string;
    solitanteId: string;
    fechaCreacion?: Date;
    fechaModificacion?: Date;
    cadaCuanto?: number;
    fechaFinProvisor: Date;
    observacion?: string;
    }
  
    export class FormularioProvisorio implements IFormularioProvisorio {
      _id?: string;
      otraMascota: number;
      descripcionOtraMascota?: string;
      gastosCubiertos: number;
      seguimiento: number;
      vivienda: number;
      permiso: number;
      tiempoTenecia: number;
      espacioAbierto: number;
      descripcionCercamiento?: string;
      tiempoSuficiente: number;
      fechaCreacion?: Date;
      fechaModificacion?: Date;
      Direccion: Address;   
      mascotaId: string;
      solitanteId: string;
      tiempoTenencia: number;
      estadoId?: string;
      cadaCuanto?: number;
      fechaFinProvisor: Date;
      observacion?: string;
    
      constructor() {
        };
      }
    
  