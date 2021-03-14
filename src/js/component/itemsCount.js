import React from "react";
import PropTypes from "prop-types";

export default function ItemsCount(props) {
	return (
		<div className="alert alert-dark font-weight-bold">
			{" "}
			Total Task: {props.itemsCount}{" "}
		</div>
	);
}

ItemsCount.propTypes = {
	itemsCount: PropTypes.number
};
