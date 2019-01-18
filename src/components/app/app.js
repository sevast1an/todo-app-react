import React, { Component } from 'react';
import AppHeader from '../appHeader';
import ItemStatusFilter from '../itemStatusFilter';
import SearchPanel from '../searchPanel';
import TodoList from '../todoList';
import '../../styles/index.css';
import AddListItem from '../addListItem/addListItem';


class App extends Component {

	maxId = 100;

	state = {
		todoData : [
			this.createTodoItem('Drink coffee'),
			this.createTodoItem('Learn React'),
			this.createTodoItem('Have a lunch')
		],
		term: '',
		filter: 'all'
	}; 

	createTodoItem(label) {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++
		}
	}

	deleteItem = (id) => {
		this.setState( ( {todoData} ) => {
			const index = todoData.findIndex( (el) => el.id === id); 
			const before = todoData.slice(0, index);  //take all the elem before deleted one
			const after = todoData.slice(index + 1); //take all elem after deleted one
			const newArray = [ ...before, ...after]; //create new array with remaings elements to not modificate original array from state
			return {
				todoData: newArray
			}
		});
	}

	addItem = (text) => {
		//generate Id
		const newItem = this.createTodoItem(text);

		// update new array
		this.setState(({ todoData }) => {
				const newArray = [ ...todoData, newItem];
				return {
					todoData: newArray
				};
				
		});
	};

	search = (items, term) => {
		if (term.length === 0){
			return items;
		} else {
			 return items.filter( (item) => {
				return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
			});
		}
	}

	filter = (items, filter) => {
		if (filter === 'active'){
			return items.filter( (item) => !item.done);
		} else if(filter === 'done'){
			return items.filter( (item) => item.done);
		} else {
			return items; 
		}
	}

	toggleProperty( arr, id, propName) {
					//updade object
					const index = arr.findIndex( (el) => el.id === id); 
					const oldItem = arr[index];
		
					const newItem = { ...oldItem, [propName]: !oldItem[propName]} //spread operator
		
					return [...arr.slice(0, index), //take all the elem before deleted one
														newItem,	
														...arr.slice(index + 1)] //take all elem after deleted one
	}
	
	onToggleDone = (id) => {
		this.setState( ( { todoData }) => {
			return{
				todoData: this.toggleProperty(todoData, id, 'done')
			}
		});
	}

	onToggleImportant = (id) => {
		this.setState( ( { todoData }) => {
			return{
				todoData: this.toggleProperty(todoData, id, 'important')
			}
		});
	};
	
	onSearchChange = (term) => {
		this.setState({ term });
	}

	onFilterChange = (filter) => {
		this.setState({ filter });
	}

	render(){

		const { todoData, term, filter } = this.state

		const visibleItems = this.filter(
			this.search(todoData, term), filter);

		const doneCount = todoData.filter( (el) => el.done).length;

		const todoCount = todoData.length - doneCount;

		return (
			<div className="todo-app">
				<AppHeader toDo={todoCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SearchPanel onSearchChange={this.onSearchChange}/>
					<ItemStatusFilter 
						filter={filter}
						onFilterChange={this.onFilterChange}/>
				</div>
	
				<TodoList 
					todos={visibleItems}
					onDeleted = {this.deleteItem} 
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone}
				/>
				<AddListItem 
					onItemAdded = {this.addItem}
				/>
			</div>
		)
	};
};

export default App;