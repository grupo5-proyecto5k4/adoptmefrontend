
interface Ifoto{
    _id?: string;
    foto:File;
    esPrincipal:Boolean;
}
    

export class Foto implements Ifoto{
    _id?: string;
    foto:File;
    esPrincipal:Boolean;
        
    constructor(){};
}

