interface IAddress {
    calle?: string;
    numero?: number;
    referencia: string;
    barrio?: string; 
    localidad?: string;
    }
  
    export class Address implements IAddress {
        calle?: string;
        numero?: number;
        referencia: string;
        barrio?: string; 
        localidad?: string;
    
      constructor() {
        };
      }