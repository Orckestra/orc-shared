import React from "react";
import { Branch } from "./Branch";

describe("Branch", () => {
	it("renders a <ul>", () => expect(<Branch />, "when mounted", "to satisfy", <ul />));

	it("renders a dark <ul>", () => expect(<Branch dark />, "when mounted", "to satisfy", <ul />));
});
