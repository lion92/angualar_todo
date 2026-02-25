import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Todo} from './todo/todo';
import {NotFound} from './not-found/not-found.component';



const routes: Routes = [
  {path: '/todo', component: Todo},
  {path: '/', component: NotFound}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
