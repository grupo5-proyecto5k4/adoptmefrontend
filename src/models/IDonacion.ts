interface IDonacion {
    _id?:string;
    banco?: string;
    CBU?: number;
    alias?: string;
    }
  
    export class Donacion implements IDonacion {
        _id?:string; //id del centro
        banco?: string;
        CBU?: number;
        alias?: string;
    
      constructor() {
        };
      }