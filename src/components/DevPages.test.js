import React from "react";
import { BrowserRouter } from "react-router-dom";
import Spritesheet from "./Spritesheet";
import DevPages from "./DevPages";

const TestComp = () => <div />;

describe("DevPages", () => {
	describe("route '/outside'", () => {
		beforeEach(() => {
			jsdom.reconfigure({ url: "http://localhost/outside" });
		});

		it("shows child", () =>
			expect(
				<BrowserRouter>
					<DevPages>
						<TestComp />
					</DevPages>
				</BrowserRouter>,
				"when deeply rendered",
			).then(render =>
				expect(render, "to contain", <TestComp />).and(
					"not to contain",
					<Spritesheet />,
				),
			));
	});

	describe("route '/dev/sprites'", () => {
		beforeEach(() => {
			jsdom.reconfigure({ url: "http://localhost/dev/sprites" });
		});

		it("shows a sprite sheet", () =>
			expect(
				<BrowserRouter>
					<DevPages>
						<TestComp />
					</DevPages>
				</BrowserRouter>,
				"when deeply rendered",
			).then(render =>
				expect(render, "not to contain", <TestComp />).and(
					"to contain",
					<Spritesheet />,
				),
			));
	});
});
