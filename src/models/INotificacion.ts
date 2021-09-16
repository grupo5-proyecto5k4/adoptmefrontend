interface INotificacion{
    _id?:number;
    tipoNotificacion?:string; //usuarioNormal //usuarioAdmin 
    nombreNotificacion: string;
    descripcion: string;
    remitenteId?: string;
    leida?: number;
    fechaCreacion?: Date;
    objetoAMostrar?: string; //indica el nombre de la coleccion en la que tengo que buscar después
    objetoAMostrarId?: string; //indica el id del objeto a mostrar de la coleccion indicada arriba
}

export class Notificacion implements INotificacion{
    _id?:number;
    tipoNotificacion?:string; //usuarioNormal //usuarioAdmin 
    nombreNotificacion: string;
    descripcion: string;
    remitenteId?: string;
    leida?: number;
    fechaCreacion?: Date;
    objetoAMostrar?: string; //indica el nombre de la coleccion en la que tengo que buscar después
    objetoAMostrarId?: string; //indica el id del objeto a mostrar de la coleccion indicada arriba


    constructor(){
        
    };
}