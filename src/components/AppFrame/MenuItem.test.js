import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Ignore } from "unexpected-reaction";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
import Icon from "../MaterialUI/DataDisplay/Icon";
import sharedMessages from "./../../sharedMessages";
import { extractMessages, TestWrapper } from "./../../utils/testUtils";

const messages = extractMessages(sharedMessages);

describe("MenuItem", () => {
	let store = {
		subscribe: () => {},
		dispatch: () => {},
		getState: () => ({}),
	};

	it("renders an icon and no label", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<MenuItem id="test" href="/foo/test" data-test-id="test" icon="cake" />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<Link id="test" data-test-id="test" to="/foo/test">
					<Icon id="cake" />
					<Ignore />
					<Ignore />
				</Link>
			</MemoryRouter>,
		));

	it("renders a menu toggle as an <a> tag", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<MenuItem id="test" icon="cake" menuToggle />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<a id="test">
					<Icon id="cake" />
					<Ignore />
					<Ignore />
				</a>
			</MemoryRouter>,
		));

	it("renders an icon and label", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<MenuItem id="test" href="/foo/test" icon="cake" label="Test" />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<Link id="test" to="/foo/test">
					<Icon id="cake" />
					<Ignore />
					<span>Test</span>
				</Link>
			</MemoryRouter>,
		));

	it("renders an open state", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<MenuItem id="test" href="/foo/test" icon="cake" open />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<Link id="test" to="/foo/test">
					<Icon id="cake" />
					<Ignore />
					<span></span>
				</Link>
			</MemoryRouter>,
		));

	it("shows activity marker", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<MenuItem id="test" href="/foo/test" icon="cake" label="Test" alert />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<Link id="test" to="/foo/test">
					<Icon id="cake" />
					<div className="show">
						<div></div>
					</div>
					<span>Test</span>
				</Link>
			</MemoryRouter>,
		));

	it("shows activity type", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<MenuItem id="test" href="/foo/test" icon="cake" label="Test" alert={{ type: "confirm" }} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<Link id="test" to="/foo/test">
					<Icon id="cake" />
					<div className="show">
						<div></div>
					</div>
					<span>Test</span>
				</Link>
			</MemoryRouter>,
		));

	it("shows activity message", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<MenuItem id="test" href="/foo/test" icon="cake" label="Test" alert={{ message: "Test message" }} />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<Link id="test" to="/foo/test">
					<Icon id="cake" />
					<div>
						<div className="show">Test message</div>
					</div>
					<span>Test</span>
				</Link>
			</MemoryRouter>,
		));

	it("shows activity type on messages", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<MenuItem
						id="test"
						href="/foo/test"
						icon="cake"
						label="Test"
						alert={{ message: "Test message", type: "warn" }}
					/>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<Link id="test" to="/foo/test">
					<Icon id="cake" />
					<div>
						<div className="show">Test message</div>
					</div>
					<span>Test</span>
				</Link>
			</MemoryRouter>,
		));

	it("shows nothing if isHidden is true", () => {
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<MenuItem
						id="test"
						href="/foo/test"
						icon="cake"
						label="Test"
						alert={{ message: "Test message", type: "warn" }}
						isHidden={true}
					/>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to equal",
			null,
		);
	});

	it("shows properly if hide selector returns false", () => {
		const hide = state => false;

		expect(
			<TestWrapper provider={{ store }} intlProvider={{ messages }} memoryRouter>
				<MenuItem
					id="test"
					href="/foo/test"
					icon="cake"
					label={{ id: "Test", defaultMessage: "Test" }}
					alert={{ message: "Test message", type: "warn" }}
					hide={hide}
				/>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }} intlProvider={{ messages }} memoryRouter>
				<Link id="test" to="/foo/test">
					<Icon id="cake" />
					<div>
						<div className="show">Test message</div>
					</div>
					<span>Test</span>
				</Link>
			</TestWrapper>,
		);
	});

	it("shows properly if hide is undefined", () => {
		expect(
			<Provider store={store}>
				<MemoryRouter>
					<MenuItem
						id="test"
						href="/foo/test"
						icon="cake"
						label="Test"
						alert={{ message: "Test message", type: "warn" }}
						hide={undefined}
					/>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<MemoryRouter>
				<Link id="test" to="/foo/test">
					<Icon id="cake" />
					<div>
						<div className="show">Test message</div>
					</div>
					<span>Test</span>
				</Link>
			</MemoryRouter>,
		);
	});
});
