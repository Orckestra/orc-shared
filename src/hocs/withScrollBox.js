import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { safeGet } from "../utils";
import Measure from "react-measure";

const useStyles = makeStyles({
	scrollbox: {
		flex: "0 1 100%",
		overflowX: "hidden",
		overflowY: "auto",
	},
});

const withScrollBox = WrappedComp =>
	React.forwardRef(({ onScroll, ...otherProps }, externalRef) => {
		const classes = useStyles();

		const mergeRef = (node, measureRef) => {
			measureRef(node);

			if (externalRef) externalRef.current = node;
		};

		return (
			<Measure bounds>
				{({ measureRef, contentRect }) => (
					<div className={classes.scrollbox} onScroll={onScroll} ref={node => mergeRef(node, measureRef)}>
						<WrappedComp
							{...otherProps}
							height={safeGet(contentRect, "bounds", "height")}
							width={safeGet(contentRect, "bounds", "width")}
						/>
					</div>
				)}
			</Measure>
		);
	});

export default withScrollBox;
