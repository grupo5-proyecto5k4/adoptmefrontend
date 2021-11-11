interface ISeguimiento{
    _id?:string;
    SolicitudId:string;
    estadoId:string;
    cadaCuanto: Number;
    fechaCreacion?: Date;
    fechaModificacion?: Date;
    fecha: Date;
   }
   
   export class Seguimiento implements ISeguimiento{
       _id?:string;
       SolicitudId:string;
       estadoId:string;
       cadaCuanto: Number;
       fechaCreacion?: Date;
       fechaModificacion?: Date;
       fecha: Date;
       constructor() { };
   }