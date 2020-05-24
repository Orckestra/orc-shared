import React from "react";
import TableMui from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({}));

const Table = ({ headers, rows, checkbox }) => {
	const classes = useStyles();

	return (
		<TableContainer>
			<TableMui>
				<TableHead>
					<TableRow>
						{checkbox != null ? (
							<TableCell padding="checkbox">{checkbox}</TableCell>
						) : null}
						{headers.map((header, index) => (
							<TableCell key={index}>{header}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<TableRow key={index}>
							{row.map((cell, cellIndex) => (
								<TableCell key={cellIndex}>{cell}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</TableMui>
		</TableContainer>
	);
};

export default Table;
