import React from "react";
import { useState, useEffect } from "react";
import List from "./list";
import Input from "./input";
import ItemsCount from "./itemsCount";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

export function Home() {
	const [tareas, setTareas] = useState([]);
	const [newTarea, setNewTarea] = useState("");

	useEffect(() => {
		getData();
	}, []);

	function getData() {
		fetch(BASE_URL + "todos/", {
			method: "GET",
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then(response => {
				if (!response.ok) {
					throw Error("ERROR");
				}
				return response.json();
			})
			.then(json => {
				setTareas(json);
			})
			.catch(error => {
				console.log(error);
			});
	}

	function crearElementoArray(tareas, responsejson) {
		let tareasCopy = [...tareas, responsejson];

		return tareasCopy;
	}

	function postData() {
		event.preventDefault();
		fetch(BASE_URL + "todos/", {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({
				title: newTarea,
				body: "",
				userId: 1
			})
		})
			.then(response => {
				if (!response.ok) {
					throw Error("ERROR");
				}
				return response.json();
			})
			.then(responsejson => {
				setTareas(crearElementoArray(tareas, responsejson));
			})
			.catch(error => {
				console.log(error);
			});
		setNewTarea("");
	}

	function putData(id, newTitulo) {
		fetch(BASE_URL + "todos/" + id, {
			method: "PUT",
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({
				id: id,
				title: newTitulo,
				body: "",
				userId: 1
			})
		})
			.then(response => {
				if (!response.ok) {
					throw Error("ERROR");
				}
				return response.json();
			})
			.then(json => {
				let newTareas = [...tareas];
				let positionTareaUpdate = newTareas.findIndex(tarea => {
					if (tarea.id === json.id) {
						return true;
					}
				});
				newTareas[positionTareaUpdate].title = json.title;
				setTareas(newTareas);
			})
			.catch(error => {
				console.log(error);
			});
	}

	function deleteData(id) {
		fetch(BASE_URL + "todos/" + id, {
			method: "DELETE"
		})
			.then(response => {
				if (!response.ok) {
					throw Error("ERROR");
				}
				let newTareas = [...tareas];
				let positionTareaDelete = newTareas.findIndex(tarea => {
					if (tarea.id === id) {
						return true;
					}
				});
				newTareas.splice(positionTareaDelete, 1);
				setTareas(newTareas);
			})
			.catch(error => {
				console.log(error);
			});
	}

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-6">
					<div className="card-header font-weight-bold">
						<h1> What you going to do?! </h1>
					</div>
					<Input
						onSubmit={postData}
						itemName={newTarea}
						onChange={event => setNewTarea(event.target.value)}
					/>
					<ul className="list-group">
						{tareas.map(tarea => {
							return (
								<List
									key={tarea.id}
									tarea={tarea}
									onClickSave={putData}
									onClickDelete={deleteData}
								/>
							);
						})}
					</ul>
					<ItemsCount itemsCount={tareas.length} />
				</div>
			</div>
		</div>
	);
}
