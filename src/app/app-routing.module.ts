import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { RepoComponent } from './repo/repo.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'repos',component: RepoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
