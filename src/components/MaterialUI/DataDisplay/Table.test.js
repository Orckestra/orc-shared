import React from "react";
import { mount } from "enzyme";
import Table from "./Table";
import TableMui from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCellMui from "@material-ui/core/TableCell";
import TableCell from "./TableCell";
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
								<TableCell cell="1" />
								<TableCell cell="2" />
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell cell="test11" />
								<TableCell cell="test12" />
							</TableRow>
							<TableRow>
								<TableCell cell="test21" />
								<TableCell cell="test22" />
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
								<TableCellMui>
									<Checkbox />
								</TableCellMui>
								<TableCell cell="1" />
								<TableCell cell="2" />
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell cell="test11" />
								<TableCell cell="test12" />
							</TableRow>
							<TableRow>
								<TableCell cell="test21" />
								<TableCell cell="test22" />
							</TableRow>
						</TableBody>
					</TableMui>
				</TableContainer>
			</Box>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});
});
