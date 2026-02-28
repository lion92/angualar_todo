import { Routes } from '@angular/router';
import { Todo } from './todo/todo';
import { NotFound } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: Todo },
  { path: '**', component: NotFound }
];

