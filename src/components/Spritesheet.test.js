import React from "react";
import Spritesheet from "./Spritesheet";
import Icon from "./MaterialUI/DataDisplay/Icon";

describe("Spritesheet", () => {
	beforeEach(() => {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.id = "spritesheet";
		svg.innerHTML = `<symbol id="icon-test-1" /><symbol id="icon-test-2" /><symbol id="icon-test-3" />`;
		document.body.appendChild(svg);
	});
	afterEach(() => {
		const svg = document.getElementById("spritesheet");
		document.body.removeChild(svg);
	});

	it("renders a list of icons available in svg sprite sheet", () =>
		expect(
			<Spritesheet />,
			"when mounted",
			"to satisfy",
			<div>
				<div>
					<Icon id="test-1" /> {"test-1"}
				</div>
				<div>
					<Icon id="test-2" /> {"test-2"}
				</div>
				<div>
					<Icon id="test-3" /> {"test-3"}
				</div>
			</div>,
		));
});
