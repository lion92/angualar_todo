import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TodoItem} from '../todo-item/todo-item';

@Component({
  selector: 'app-todo',
  imports: [
    FormsModule,
    TodoItem,
  ],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
  standalone: true
})
export class Todo {
  todo: { id: number, text: string }= {id: 0, text: ''};
  todos: { id: number, text: string }[] = [];
  newTodo: string="";
  constructor() {
  }

  addTodo() {
    if (this.todo && this.todo.text) {
      this.todos.push({id: Date.now(), text: this.todo.text});
      this.todo = {id: 0, text: ''};
    }
  }
    update(event:{id:number, text:string}): void {
      const todo = this.todos.find(t => t.id === event.id);
      if (todo) {
        todo.id=event.id;
        todo.text =event.text;
      }
    }

    delete(event: number): void {
      this.todos = this.todos.filter(t => t.id !== event);
    }

}
