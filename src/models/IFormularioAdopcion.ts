import { Address } from './IAddress';

interface IFormularioAdopcion {
    _id?: string;
    otraMascota: number;
    descripcionOtraMascota?: string;
    tiempoPresupuesto: number;
    estadoId?: string;
    accionViaje: string;
    vacunacionCastracion: number;
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
    accionImpedimento: string;
    composicionFamilia: string;
    cadaCuanto?: number;
    }
  
    export class FormularioAdopcion implements IFormularioAdopcion {
      _id?: string;
      otraMascota: number;
      descripcionOtraMascota?: string;
      tiempoPresupuesto: number;
      estadoId?: string;
      accionViaje: string;
      vacunacionCastracion: number;
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
      accionImpedimento: string;
      composicionFamilia: string;
      cadaCuanto?: number;
    
      constructor() {
        };
      }
    
  