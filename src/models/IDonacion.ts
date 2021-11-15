interface IDonacion {
    id_Centro?:string;
    banco?: string;
    cbu?: number;
    alias?: string;
    }
  
    export class Donacion implements IDonacion {
        id_Centro?:string; //id del centro
        banco?: string;
        cbu?: number;
        alias?: string;
    
      constructor() {
        };
      }