import { Address } from './IAddress';

interface IFormularioAdopcion {
    _id?: number;
    otraMascota?: number;
    descripcionOtraMascota?: string;
    tiempoPresupuesto: number;
    estadoId?: number;
    accionViaje?: string;
    vacunacionCastracion: number;
    seguimiento?: number;
    vivienda?: number;
    fotoVivienda?: string;
    fechaCreacion: Date;
    fechaModificacion?: Date;
    permiso?: number;
    espacioAbierto: number;
    descripcionCercamiento: string;
    Direccion?: Address;   
    mascotaID: string;
    }
  
    export class FormularioAdopcion implements IFormularioAdopcion {
        _id?: number;
        otraMascota?: number;
        descripcionOtraMascota?: string;
        tiempoPresupuesto: number;
        estadoId?: number;
        accionViaje?: string;
        vacunacionCastracion: number;
        seguimiento?: number;
        vivienda?: number;
        fotoVivienda?: string;
        fechaCreacion: Date;
        fechaModificacion?: Date;
        permiso?: number;
        espacioAbierto: number;
        descripcionCercamiento: string;
        Direccion?: Address; 
        mascotaID: string;
        //SolitanteId: string;
    
      constructor() {
        };
      }
    
  