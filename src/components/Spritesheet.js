import React from "react";
import { makeStyles } from "@material-ui/core";
import Icon from "./MaterialUI/DataDisplay/Icon";

const useStyles = makeStyles({
	wrapper: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflowY: "auto",
		height: "100%",
	},
	iconBlock: {
		flex: "0 0 30%",
		border: "1px solid #999",
		margin: "5px",
		padding: "5px 10px",
		fontSize: "24px",
	},
});

const arrify = thing => [].slice.call(thing);

const SpriteSheet = () => {
	const classes = useStyles();
	const iconIds = arrify(document.querySelectorAll('symbol[id^="icon-"]')).map(elm => elm.id.replace(/^icon-/, ""));
	return (
		<div className={classes.wrapper}>
			{iconIds.map(id => (
				<div className={classes.iconBlock} key={id}>
					<Icon id={id} /> {id}
				</div>
			))}
		</div>
	);
};

export default SpriteSheet;
