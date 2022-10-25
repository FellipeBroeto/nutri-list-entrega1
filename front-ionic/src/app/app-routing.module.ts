import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  //HOME
  { path: '',
    redirectTo: 'login-usuario', 
    pathMatch: 'full' 
  }, 
  {
    path: 'login-usuario',
    loadChildren: () => import('./user-login/user-login.module').then( m => m.UserLoginPageModule)
  },

  
  { path: 'criar-usuario',
    redirectTo: 'criar-usuario', 
    pathMatch: 'full' 
  }, 
  {
    path: 'criar-usuario',
    loadChildren: () => import('./user-create/user-create.module').then( m => m.UserLoginCreatePageModule)
  },

  
  /*ALIMENTOS*/
   
  { path: 'alimento-listar',
    redirectTo: 'alimento-listar', 
    pathMatch: 'full' 
  }, 
  {
    path: 'alimento-listar',
    loadChildren: () => import('./alimento-list/alimento-list.module').then( m => m.AlimentoListPageModule)
  },



  { 
    path: 'alimento-criar',
    redirectTo: 'alimento-criar', 
    pathMatch: 'full' 
  },
  {
    path: 'alimento-criar',
    loadChildren: () => import('./alimento-create/alimento-create.module').then( m => m.AlimentoCreatePageModule)
  },


 
  /*DIETA*/
  { path: 'dieta-listar',
    redirectTo: 'dieta-listar', 
    pathMatch: 'full' 
  }, 
  {
    path: 'dieta-listar',
    loadChildren: () => import('./listar-dieta/listar-dieta.module').then( m => m.ListarDietaPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
