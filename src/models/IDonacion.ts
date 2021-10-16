interface IDonacion {
    _id?:string;
    banco?: string;
    cbu?: number;
    alias?: string;
    }
  
    export class Donacion implements IDonacion {
        _id?:string; //id del centro
        banco?: string;
        cbu?: number;
        alias?: string;
    
      constructor() {
        };
      }