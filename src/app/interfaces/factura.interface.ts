export interface IFactura{ 
    numeroFactura: number;
    importe: number;
    cliente: string;
    fecha: Date;
}

export interface IFacturaResponse {
    numeroFactura?: number;
    importe: number;
    fecha: Date;
    cliente: string;
    clienteNombre: { nombre: string };
}

