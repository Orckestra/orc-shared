import React from "react";
import { MemoryRouter } from "react-router-dom";
import Spritesheet from "./Spritesheet";
import DevPages from "./DevPages";

const TestComp = () => <div />;

describe("DevPages", () => {
	describe("route '/outside'", () => {
		it("shows child", () =>
			expect(
				<MemoryRouter initialEntries={["/outside"]}>
					<DevPages>
						<TestComp />
					</DevPages>
				</MemoryRouter>,
				"when deeply rendered",
			).then(render =>
				expect(render, "to contain", <TestComp />).and(
					"not to contain",
					<Spritesheet />,
				),
			));
	});

	describe("route '/dev/sprites'", () => {
		it("shows a sprite sheet", () =>
			expect(
				<MemoryRouter initialEntries={["/dev/sprites"]}>
					<DevPages>
						<TestComp />
					</DevPages>
				</MemoryRouter>,
				"when deeply rendered",
			).then(render =>
				expect(render, "not to contain", <TestComp />).and(
					"to contain",
					<Spritesheet />,
				),
			));
	});
});
