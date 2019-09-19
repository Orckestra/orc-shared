import insertIcons from "./insertIcons";

describe("insertIcons", () => {
	let svgString;
	beforeEach(() => {
		svgString = `<svg xmlns="http://www.w3.org/2000/svg">
		<symbol id="icon-abc-book" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 203.505 203.505" style="enable-background:new 0 0 203.505 203.505;" xml:space="preserve"><g viewBox="0 0 203.505 203.505"><path d="M161.379,203.505H29.875c-5.652,0-10.25-4.598-10.25-10.25V11.316C19.625,5.076,24.702,0,30.941,0h127.688 c13.923,0,25.25,11.327,25.25,25.251v155.754C183.879,193.411,173.786,203.505,161.379,203.505z M24.625,50.566v142.688 c0,2.895,2.355,5.25,5.25,5.25h131.504c9.649,0,17.5-7.851,17.5-17.5V64.501c0-11.166-9.084-20.251-20.25-20.251H30.941 C27.458,44.25,24.625,47.084,24.625,50.566z M158.629,39.25h2.75c6.796,0,12.898,3.029,17.027,7.808 c-2-9.078-10.108-15.891-19.777-15.891H30.941c-3.482,0-6.315,2.834-6.315,6.316v3.216c1.536-0.92,3.333-1.449,5.25-1.449H158.629z M30.941,26.167h127.688c8.214,0,15.524,3.942,20.139,10.035c-1.068-10.168-9.692-18.118-20.139-18.118H30.941 c-3.482,0-6.315,2.833-6.315,6.315v3.698C26.43,26.879,28.604,26.167,30.941,26.167z M30.941,13.084h127.688 c8.214,0,15.524,3.942,20.139,10.034C177.699,12.951,169.075,5,158.629,5H30.941c-3.482,0-6.315,2.834-6.315,6.316v3.698 C26.43,13.796,28.604,13.084,30.941,13.084z M34.252,189.768c-1.381,0-2.5-1.119-2.5-2.5v-20.75c0-1.381,1.119-2.5,2.5-2.5 s2.5,1.119,2.5,2.5v20.75C36.752,188.648,35.633,189.768,34.252,189.768z M75.049,165.337H59.789c-1.381,0-2.5-1.119-2.5-2.5 s1.119-2.5,2.5-2.5h5.943l10.118-25.085c0.018-0.048,0.036-0.094,0.057-0.14l22.689-56.251h-3.927c-1.381,0-2.5-1.119-2.5-2.5 s1.119-2.5,2.5-2.5h7.572c0.021,0,0.038-0.001,0.06-0.001c0.02,0,0.038,0.001,0.058,0.001h9.762c0.039,0,0.078,0,0.115,0h8.122 c1.381,0,2.5,1.119,2.5,2.5s-1.119,2.5-2.5,2.5h-4.475l32.85,81.441h5.02c1.381,0,2.5,1.119,2.5,2.5s-1.119,2.5-2.5,2.5H129.55 c-1.381,0-2.5-1.119-2.5-2.5s1.119-2.5,2.5-2.5h3.913l-8.748-21.687H79.884l-8.761,21.721h3.926c1.381,0,2.5,1.119,2.5,2.5 S76.43,165.337,75.049,165.337z M138.854,160.303h4.488l-32.851-81.441h-4.487l22.697,56.27c0.014,0.033,0.027,0.067,0.04,0.102 L138.854,160.303z M81.902,133.616h40.797L102.3,83.045L81.902,133.616z M34.252,134.512c-1.381,0-2.5-1.119-2.5-2.5v-20.75 c0-1.381,1.119-2.5,2.5-2.5s2.5,1.119,2.5,2.5v20.75C36.752,133.393,35.633,134.512,34.252,134.512z M34.252,79.255 c-1.381,0-2.5-1.119-2.5-2.5v-20.75c0-1.381,1.119-2.5,2.5-2.5s2.5,1.119,2.5,2.5v20.75C36.752,78.136,35.633,79.255,34.252,79.255z"/></g></symbol>
		<symbol id="icon-accept-green" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg"><g fill="green"><g viewBox="0 0 32 32" stroke="none" fill="green"><polygon points="4,16 8,12 14,18 26,6 30,10 14,26"/></g></g></symbol>
		<symbol id="icon-accept" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg"><g ><g viewBox="0 0 32 32" stroke="none"><polygon points="4,16 8,12 14,18 26,6 30,10 14,26"/></g></g></symbol>
	</svg>`;
	});
	afterEach(() => {
		while (document.querySelectorAll("svg").length) {
			document.body.querySelector("svg").remove();
		}
	});

	it("inserts an SVG icon sheet from a string", () =>
		expect(insertIcons, "when called with", [svgString]).then(() => {
			expect(document.querySelectorAll("svg").length, "to be", 1);
			expect(document.getElementById("icon-abc-book"), "to be ok");
			expect(document.getElementById("icon-accept-green"), "to be ok");
			expect(document.getElementById("icon-accept"), "to be ok");
		}));

	it("does not insert an SVG element if the string fails to parse", () =>
		expect(insertIcons, "when called with", ["<Definitely not svg>"]).then(
			() => {
				expect(document.querySelectorAll("svg").length, "to be", 0);
				expect(document.getElementById("icon-abc-book"), "to be", null);
				expect(document.getElementById("icon-accept-green"), "to be", null);
				expect(document.getElementById("icon-accept"), "to be", null);
				expect(console.error, "to have a call satisfying", {
					args: ["SVG failed to parse: ", "<Definitely not svg>"],
				});
			},
		));
});
