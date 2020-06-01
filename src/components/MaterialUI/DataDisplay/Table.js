import React from "react";
import TableMui from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
	container: {
		width: "100%",
		borderTop: "1px solid" + theme.palette.grey.borders,
	},
	cellRoot: {
		maxWidth: theme.spacing(15),
		whiteSpace: "nowrap",
		overflowX: "hidden",
		textOverflow: "ellipsis",
	},
}));

const Table = ({ headers, rows, checkbox }) => {
	const classes = useStyles();

	// Table props

	// Table body props

	// Table cell props

	// Table container props

	// Table footer props

	// Table head props

	// Table row props

	return (
		<Box className={classes.container}>
			<TableContainer>
				<TableMui>
					<TableHead>
						<TableRow>
							{checkbox != null ? <TableCell>{checkbox}</TableCell> : null}
							{headers.map((header, index) => (
								<TableCell
									key={index}
									classes={{
										root: classNames(classes.cellRoot),
									}}
								>
									{header}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, index) => (
							<TableRow key={index}>
								{row.map((cell, cellIndex) => (
									<TableCell
										key={cellIndex}
										classes={{
											root: classNames(classes.cellRoot),
										}}
									>
										{cell}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</TableMui>
			</TableContainer>
		</Box>
	);
};

export default Table;
