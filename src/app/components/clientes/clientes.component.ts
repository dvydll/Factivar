import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ICliente } from 'src/app/interfaces/cliente.interface';
import { FactivarService } from 'src/app/services/factivar.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
  providers: [ConfirmationService],
})
export class ClientesComponent implements OnInit {
  @ViewChild('formulario') formulario!: NgForm;
  email: any;
  visibleError = false;
  mensajeError = '';
  clientes: ICliente[] = [];
  visibleConfirm = false;
  editar = false;
  cliente: ICliente = {
    cif: '',
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
  };

  constructor(
    private factivarService: FactivarService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.factivarService.getClientes().subscribe({
      next: (data) => {
        this.visibleError = false;
        this.clientes = data;
      },
      error: (err) => {
        this.visibleError = true;
        this.mensajeError = err.error.error;
      },
    });
  }

  guardar() {
    if (this.editar === false) {
      this.factivarService.addCliente(this.cliente).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.formulario.reset();
          this.getClientes();
        },
        error: (err) => {
          console.log(err);
          this.visibleError = true;
          this.mensajeError = err.error.error;
        },
      });
    } else {
      this.factivarService.updateCliente(this.cliente).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.cancelarEdicion();
          this.formulario.reset();
          this.getClientes();
          this.editar = false;
        },
        error: (err) => {
          this.visibleError = true;
          this.mensajeError = err.error.error;
        },
      });
    }
  }

  edit(cliente: ICliente) {
    this.cliente = { ...cliente };
    this.editar = true;
  }

  cancelarEdicion() {
    this.cliente = {
      cif: '',
      nombre: '',
      direccion: '',
      telefono: '',
      email: '',
    };
    this.editar = false;
  }

  confirmDelete(cliente: ICliente) {
    this.confirmationService.confirm({
      message: `¿Eliminar cliente ${cliente.nombre}?`,
      header: '¿Está seguro?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteCliente(cliente.cif),
    });
  }

  deleteCliente(cif: string) {
    this.factivarService.deleteCliente(cif).subscribe({
      next: (data) => {
        this.visibleError = false;
        this.formulario.reset({
          cif: '',
          nombre: '',
          direccion: '',
          telefono: '',
          email: '',
        });
        this.getClientes();
      },
      error: (err) => {
        this.visibleError = true;
        this.mensajeError = err.error.error;
      },
    });
  }
}
