import React from "react";
import { mount } from "enzyme";
import Table from "./Table";
import TableMui from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";

describe("Table", () => {
	it("Renders Table", () => {
		const headers = ["1", "2"];

		const rows = [
			["test11", "test12"],
			["test21", "test22"],
		];

		const component = <Table rows={rows} headers={headers} />;

		const mountedComponent = mount(component);
		const expected = (
			<Box>
				<TableContainer>
					<TableMui>
						<TableHead>
							<TableRow>
								<TableCell>1</TableCell>
								<TableCell>2</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>test11</TableCell>
								<TableCell>test12</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>test21</TableCell>
								<TableCell>test22</TableCell>
							</TableRow>
						</TableBody>
					</TableMui>
				</TableContainer>
			</Box>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Renders Table with checkbox", () => {
		const headers = ["1", "2"];

		const checkbox = <Checkbox />;

		const rows = [
			["test11", "test12"],
			["test21", "test22"],
		];

		const component = <Table rows={rows} headers={headers} checkbox={checkbox} />;

		const mountedComponent = mount(component);
		const expected = (
			<Box>
				<TableContainer>
					<TableMui>
						<TableHead>
							<TableRow>
								<TableCell>
									<Checkbox />
								</TableCell>
								<TableCell>1</TableCell>
								<TableCell>2</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>test11</TableCell>
								<TableCell>test12</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>test21</TableCell>
								<TableCell>test22</TableCell>
							</TableRow>
						</TableBody>
					</TableMui>
				</TableContainer>
			</Box>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});
});
