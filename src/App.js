import React, { Component } from 'react';
import './App.css';
import ToDo from './components/ToDo.js';


class App extends React.Component {
       constructor(props) {
     super(props);
      this.state = {
       todos: [
         { description: 'Walk the cat', isCompleted: true },
         { description: 'Throw the dishes away', isCompleted: false },
         { description: 'Buy new dishes', isCompleted: false }
       ],
       newTodoDescription: ''
			};
      this.deleteToDo = this.deleteToDo.bind(this)
    }

    deleteToDo(index) {
       const todos = this.state.todos.filter((el, i) => i !== index);
       this.setState({ todos });
     }   

    handleChange(e) {
      this.setState({ newTodoDescription: e.target.value })
   }

    handleSubmit(e) {
     e.preventDefault();
     if (!this.state.newTodoDescription) { return }
     const newTodo = { description: this.state.newTodoDescription, isCompleted: false };
     this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '' });
   }



  toggleComplete(index) {
    const todos = this.state.todos.slice();
    const todo = todos[index];
    todo.isCompleted = todo.isCompleted ? false : true;
    this.setState({ todos: todos });
  }

   render() {
    return (
      <div className="App">
        <ul>
          { this.state.todos.map( (todo, index) => 
             <ToDo key={ index } index={index} description={ todo.description } isCompleted={ todo.isCompleted } toggleComplete={ this.toggleComplete } deleteToDo={this.deleteToDo } />
           )}
         </ul>
         <form onSubmit={ (e) => this.handleSubmit(e) }>
           <input type="text" value={ this.state.newTodoDescription } onChange={ (e) => this.handleChange(e) } />
           <input type="submit" />
         </form>
       </div>
     );
   }
 }

class ToDo extends React.Component {
       render() {
      return (
         <li>
             <button type="button" onClick={() => this.props.deleteToDo(this.props.index)} > delete </button>
         <input type="checkbox" checked={ this.props.isCompleted } onChange={ this.props.toggleComplete } />
         <span>{ this.props.description }</span>
       </li>
     );
   }
 }

export default App;
