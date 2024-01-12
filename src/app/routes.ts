import { Routes } from '@angular/router';
import { canActivate } from './guards/can-activate';
  
export const routes: Routes = [
    { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  
    // Rutas no protegidas por el guard
    {
      path: 'login',
      loadComponent: () =>
        import('@app/views/login/login.component').then(
          (c) => c.LoginComponent
        ),
    },
    {
      path: 'register',
      loadComponent: () =>
        import('@app/views/register/register.component').then(
          (c) => c.RegisterComponent
        ),
    },
  
    // Rutas protegidas por el guard
    {
      path: 'clientes',
      loadComponent: () =>
        import('@components/clientes/clientes.component').then(
          (c) => c.ClientesComponent
        ),
      //canActivate: [() => canActivate()],
    },
    {
      path: 'facturas',
      loadComponent: () =>
        import('@components/facturas/facturas.component').then(
          (c) => c.FacturasComponent
        ),
      //canActivate: [() => canActivate()],
    },
    {
      path: 'proveedores',
      loadComponent: () =>
        import('@components/proveedores/proveedores.component').then(
          (c) => c.ProveedoresComponent
        ),
      canActivate: [() => canActivate()],
    },
  
    // 404NotFound
    {
      path: '**',
      loadComponent: () =>
        import('@components/not-found/not-found.component').then(
          (c) => c.NotFoundComponent
        ),
    },
  ];