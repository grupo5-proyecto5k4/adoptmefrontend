
interface IVacuna{
 _id?:string;
 nombre:string;
 cantidadDosis:number;
 fechaCreacion?: Date;
 fechaModificacion?: Date;
 
}

export class vacuna implements IVacuna{
    _id?:string;
    nombre:string;
    cantidadDosis:number;
    fechaCreacion?: Date;
    fechaModificacion?: Date;

    constructor(public nombreVac:string, public dosis: number) {
    };
}