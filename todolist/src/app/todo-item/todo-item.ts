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

  @Output() update = new EventEmitter<{id: number; title: string; completed?: boolean}>();
  @Output() delete = new EventEmitter<number>();

  editTitle = '';
  editMode = false;

  startEdit() {
    this.editTitle = this.todo.title;
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.editTitle = '';
  }

  confirmUpdate() {
    if (this.editTitle.trim()) {
      this.update.emit({ id: this.todo.id, title: this.editTitle.trim(), completed: this.todo.completed });
    }
    this.editMode = false;
  }

  toggleCompleted() {
    this.update.emit({ id: this.todo.id, title: this.todo.title, completed: !this.todo.completed });
  }

}
