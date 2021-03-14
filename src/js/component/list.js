import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function List(props) {
	const [textList, settextList] = useState(props.tarea.title);
	let tarea = props.tarea;

	return (
		<li className="list-group-item d-flex">
			<input
				className="input-group border-0"
				type="text"
				value={textList}
				onChange={event => {
					settextList(event.target.value);
				}}
			/>
			<a
				className="btn"
				value="Save"
				onClick={event => {
					props.onClickSave(tarea.id, textList);
				}}>
				<i className="fas fa-save fa-lg"></i>
			</a>
			<a
				className="btn"
				value="Delete"
				onClick={event => {
					props.onClickDelete(tarea.id);
				}}>
				<i className="fas fa-trash fa-lg"></i>
			</a>
		</li>
	);
}

List.propTypes = {
	tarea: PropTypes.object,
	onClickSave: PropTypes.func,
	onClickDelete: PropTypes.func
};
