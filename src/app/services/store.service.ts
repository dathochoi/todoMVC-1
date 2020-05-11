import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class Todo
{
  completed: Boolean;
  editing: Boolean;


   private _title: String;
  //title : String;

  get  title(){
    return this._title;
  }
  set title( value:String){
    this._title =value;
  }
  constructor (title: String){
    this.completed = false;
    this.editing = false;
    this.title = title
  }
}
@Injectable({
  providedIn: 'root'
})
export class TodoStore{
  StoreName = 'angular-todos';
  todos: Array<Todo>;

  constructor(){
    let persistedTodos = JSON.parse(localStorage.getItem(this.StoreName)|| '[]');
    console.log(persistedTodos);
    this.todos = persistedTodos.map((todo:{_title:String, completed:Boolean})=>{
        let ret =new Todo(todo._title);
        ret.completed = todo.completed;
        return ret;
    });
  }
    private updateStore(){
      localStorage.setItem(this.StoreName,JSON.stringify(this.todos));
    }

    private getWithCompleted(completed: Boolean){
      return this.todos.filter((todo:Todo)=> todo.completed === completed);
    }

    getCompleted(){
      return this.getWithCompleted(false);
    }


    allCompleted(){
      return this.todos.length ===  this.getCompleted().length;
    }

    setAllTo(completed: Boolean ){
      this.todos.forEach((t :Todo) => t.completed = completed);
    }

    removeCompleted(){
      this.todos = this.getWithCompleted(false);
      this.updateStore();
    }

    getRemaining(){
      return this.getWithCompleted(false);
    }

    toggleCompletion(todo:Todo){
      todo.completed =!todo.completed;
      this.updateStore();
    }

    remove(todo:Todo){
      this.todos.splice(this.todos.indexOf(todo),1);
      this.updateStore();
    }

    add(title:String){
      this.todos.push(new Todo(title));
      this.updateStore();
    }


}
