import { Address } from './IAddress';

interface IFormularioProvisorio {
    _id?: string;
    otraMascota: number;
    descripcionOtraMascota?: string;
    tiempoPresupuesto: number;
    estadoId?: string;
    accionViaje: string;
    seguimiento: number;
    vivienda: number;
    fotoVivienda?: string;
    fechaCreacion?: Date;
    fechaModificacion?: Date;
    permiso: number;
    espacioAbierto: number;
    descripcionCercamiento?: string;
    Direccion: Address;   
    mascotaId: string;
    solitanteId: string;
    tiempoSolo: number;

    tiempoTenencia: number;
    }
  
    export class FormularioProvisorio implements IFormularioProvisorio {
      _id?: string;
      otraMascota: number;
      descripcionOtraMascota?: string;
      tiempoPresupuesto: number;
      estadoId?: string;
      accionViaje: string;
      seguimiento: number;
      vivienda: number;
      fotoVivienda?: string;
      fechaCreacion?: Date;
      fechaModificacion?: Date;
      permiso: number;
      espacioAbierto: number;
      descripcionCercamiento?: string;
      Direccion: Address;   
      mascotaId: string;
      solitanteId: string;
      tiempoSolo: number;

      tiempoTenencia: number;
    
      constructor() {
        };
      }
    
  