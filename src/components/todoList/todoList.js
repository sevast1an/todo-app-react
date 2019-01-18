import React from 'react';
import TodoListItem from '../todoListItem';
import '../../styles/components/todoList.css'

 const TodoList = ({ todos, 
										onDeleted, 
										onToggleImportant,
										onToggleDone }) => {

	const elements = todos.map( (item) => {
		const { id, ...itemProps} = item;  // when we want to take from object only the props we need, and to acces them easily (destructuring)

		return (
			<li key={id} className="list-group-item">
				<TodoListItem 
				{ ...itemProps}
				onDeleted={ () => onDeleted(id)}
				onToggleDone={ () => onToggleDone(id)}
				onToggleImportant={ () => onToggleImportant(id)}
				/>
			</li>
		);
	})

	return (
		<ul className="list-group todo-list">
			{ elements }
		</ul>
	);
};

export default TodoList;

// <TodoListItem 
// label={item.label}
// important={item.important}
// />

// with Spread Operator, when we want to give all object props to component:

// <TodoListItem { ...item} />