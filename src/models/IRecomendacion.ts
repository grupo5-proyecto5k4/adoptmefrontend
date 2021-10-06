interface IRecomendacion {
    _id?: number;
    tipoRecomendacion: number;
    nombre: string;
    calle: string;
    numero: number;
    sitioWeb?: string;
    abierto24hs: number;
    latitud: number;
    longitud: number;
    fechaAlta?: Date;
    fechaModificacion?: Date;
    estado?: number;
}

export class Recomendacion implements IRecomendacion {
    _id?: number;
    tipoRecomendacion: number;
    nombre: string;
    calle: string;
    numero: number;
    sitioWeb?: string;
    abierto24hs: number;
    latitud: number;
    longitud: number;
    fechaAlta?: Date;
    fechaModificacion?: Date;
    estado?: number;

    constructor() {
    };
}

