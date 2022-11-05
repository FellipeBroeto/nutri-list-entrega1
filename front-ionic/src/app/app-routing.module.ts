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

  /*CRIAR USUARIO */
  
  { path: 'criar-usuario',
    redirectTo: 'criar-usuario', 
    pathMatch: 'full' 
  }, 
  {
    path: 'criar-usuario',
    loadChildren: () => import('./user-create/user-create.module').then( m => m.UserLoginCreatePageModule)
  }, 
 
 
    /*FINALIZAR-CADASTRO*/
    { path: 'finalizar-cadastro',
    redirectTo: 'finalizar-cadastro-usuario'
    },
    {
      path: 'finalizar-cadastro-usuario',
      loadChildren: () => import('./finalizar-cadastro/finalizar-cadastro.module').then( m => m.FinalizarCadastroPageModule),
      pathMatch: 'full' 
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
    loadChildren: () => import('./dieta-list/dieta-list.module').then( m => m.DietaListPageModule)
  },

  
  { path: 'dieta-criar',
    redirectTo: 'dieta-criar',     
  },
  {
    path: 'dieta-criar',
    loadChildren: () => import('./dieta-create/dieta-create.module').then( m => m.DietaCreatePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
