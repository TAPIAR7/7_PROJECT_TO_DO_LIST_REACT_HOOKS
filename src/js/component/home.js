import React, { useState } from "react";

//include images into your bundle

//create your first component
export function Home() {
	// Hooks
	const [task, setTask] = useState("");
	const [listTask, setlistTask] = useState([]);
	const [showItem, setshowItem] = useState("");

	// Handle when user press the enter key and create a new element.
	const handleOnKeyPress = e => {
		if (e.key === "Enter") {
			console.log("Me preseionaste" + task);
			let temp = {
				idTask: idNumber(),
				detailTask: task
			};
			setlistTask([...listTask, temp]);
			setTask("");
		}
	};

	// Function to create an Id number for each task
	const idNumber = () => {
		return new Date().getTime();
	};
	// Delete function
	const deleteItem = event => {
		console.log("Donde lo genero: " + event.target.id);
		const result = listTask.filter(function(item) {
			console.log("filtro" + item.idTask);
			return item.idTask != event.target.id;
		});
		console.log(result);
		setlistTask(result);
	};

	// Change visible or insivible
	const visibleorNot = id => {
		let visible = "btn btn-outline-secondary float-right visible";
		let invisible = "btn btn-outline-secondary float-right invisible";
		if (id != showItem) {
			return invisible;
		} else {
			return visible;
		}
	};
	const NotVisible = id => {
		setshowItem("");
	};
	// Create li item to display on webpage
	const createItem = detalle => {
		return (
			<li
				onMouseOver={e => {
					setshowItem(e.target.id);
				}}
				onMouseOut={NotVisible}
				id={detalle.idTask}
				key={"key-" + detalle.idTask}
				className="list-group-item text-secondary">
				<p className="d-inline-block">{detalle.detailTask}</p>
				<button
					id={"btn-" + detalle.idTask}
					className={visibleorNot(detalle.idTask)}>
					<i
						id={detalle.idTask}
						onClick={e => deleteItem(e)}
						className="fas fa-times"></i>
				</button>
			</li>
		);
	};

	// Create the list to render
	const createList = () => {
		return listTask.map(detalle => {
			return createItem(detalle);
		});
	};

	// Return for rendering
	return (
		<div id="main-div" className="container">
			<h1 className="text-center">To Do List</h1>
			<input
				type="text"
				placeholder="Enter your task"
				className="form-control mb-2 text-secondary"
				value={task}
				onChange={e => setTask(e.target.value)}
				onKeyPress={e => handleOnKeyPress(e)}></input>
			<ul className="list-group">{createList()}</ul>
			<div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item text-secondary">
						{listTask.length + " left"}
					</li>
				</ul>
			</div>
		</div>
	);
}
