import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

export default function InpuItem(props) {
	return (
		<form onSubmit={props.onSubmit}>
			<input
				className="form-control bg-info text-white"
				name="item"
				type="text"
				value={props.itemName}
				onChange={props.onChange}
				placeholder="Write a new task"
			/>
		</form>
	);
}

InpuItem.propTypes = {
	itemName: PropTypes.string,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func
};
