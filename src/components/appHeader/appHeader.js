import React from 'react';
import '../../styles/components/appHeader.css'

const AppHeader = ( {toDo, done}) => {
	return (
		<div className="app-header d-flex">
			<h1>Todo list</h1>
			<h2>{toDo} more to do, {done} done</h2>
		</div>
	);
};

export default AppHeader;