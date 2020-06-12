import React from "react";
import TableMui from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "./TableCell";
import TableCellMui from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	container: {
		width: "100%",
		borderTop: "1px solid" + theme.palette.grey.borders,
	}
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
							{checkbox != null ? <TableCellMui>{checkbox}</TableCellMui> : null}
							{headers.map((header, index) => (
								<TableCell
									key={index}
									cell={header}
								/>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, index) => (
							<TableRow key={index}>
								{row.map((cell, cellIndex) => (
									<TableCell
										key={cellIndex}
										cell={cell}
									/>
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
