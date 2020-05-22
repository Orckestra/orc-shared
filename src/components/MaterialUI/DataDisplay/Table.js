import React from "react";
import TableMui from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({}));

const Table = ({ headers, rows, customClasses }) => {
	const classes = useStyles();

	return (
		<TableContainer>
			<TableMui>
				<TableHead>
					<TableRow>
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
