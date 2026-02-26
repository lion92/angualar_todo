import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface TodoItemModel {
  id: number;
  title: string;
  completed?: boolean;
}

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css'
})
export class TodoItem {

  @Input() todo!: TodoItemModel;

  @Output() update = new EventEmitter<{id:number, title:string}>();
  @Output() delete = new EventEmitter<number>();

  editTitle = '';

}
