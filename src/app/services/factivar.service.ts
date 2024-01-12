import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICliente } from '../interfaces/cliente.interface';
import { environment } from 'src/environments/environment';
import { IFacturaResponse, IFactura } from '../interfaces/factura.interface';
import { IProveedor } from '../interfaces/proveedores.interface';

@Injectable({
  providedIn: 'root',
})
export class FactivarService {
  private urlAPI = environment.urlAPI;

  public constructor(private http: HttpClient) {}

  public getClientes(): Observable<ICliente[]> {
    return this.http.get<ICliente[]>(`${this.urlAPI}clientes`);
  }

  public addCliente(cliente: ICliente): Observable<ICliente> {
    return this.http.post<ICliente>(`${this.urlAPI}clientes`, cliente);
  }

  public updateCliente(cliente: ICliente): Observable<ICliente> {
    return this.http.put<ICliente>(
      `${this.urlAPI}clientes/${cliente.cif}`,
      cliente
    );
  }

  public deleteCliente(cif: string): Observable<ICliente> {
    return this.http.delete<ICliente>(`${this.urlAPI}clientes/${cif}`);
  }

  public getProveedor(): Observable<IProveedor[]> {
    return this.http.get<IProveedor[]>(`${this.urlAPI}proveedor`);
  }

  public addProveedor(proveedor: IProveedor): Observable<IProveedor> {
    return this.http.post<IProveedor>(`${this.urlAPI}proveedor`, proveedor);
  }

  public updateProveedor(proveedor: IProveedor): Observable<IProveedor> {
    return this.http.put<IProveedor>(
      `${this.urlAPI}clientes/${proveedor.cif}`,
      proveedor
    );
  }

  public deleteProveedor(cif: string): Observable<IProveedor> {
    return this.http.delete<IProveedor>(`${this.urlAPI}proveedor/${cif}`);
  }

  public getFacturas(): Observable<IFacturaResponse[]> {
    return this.http.get<IFacturaResponse[]>(`${this.urlAPI}facturas`);
  }

  public addFactura(factura: IFactura): Observable<IFactura> {
    console.log(new Date(factura.fecha).toLocaleDateString());

    const datos = {
      importe: factura.importe,
      fecha:
        new Date(factura.fecha).getFullYear() +
        '-' +
        (new Date(factura.fecha).getMonth() + 1) +
        '-' +
        new Date(factura.fecha).getDate(),
      cliente: factura.cliente,
    };

    return this.http.post<IFactura>(`${this.urlAPI}facturas`, datos);
  }

  public updateFactura(factura: IFactura): Observable<IFactura> {
    return this.http.put<IFactura>(
      `${this.urlAPI}facturas/${factura.numeroFactura}`,
      factura
    );
  }

  public deleteFactura(numeroFactura: number): Observable<IFactura> {
    return this.http.delete<IFactura>(
      `${this.urlAPI}facturas/${numeroFactura}`
    );
  }
}
