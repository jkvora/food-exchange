import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UpdateordersComponent } from './components/updateorders/updateorders.component';
import { OrdersComponent } from './components/orders/orders.component';

const appRoutes: Routes = [
  { path: 'update', component: UpdateordersComponent },
  { path: 'orders', component: OrdersComponent },

  {
    path: '**', redirectTo: 'orders',
    pathMatch: 'full'
  }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);