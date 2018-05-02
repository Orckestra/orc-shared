import React from "react";
import Immutable from "immutable";
import { FormattedMessage, defineMessages } from "react-intl";
import { breadcrumbs } from "./breadcrumbs";

const messages = defineMessages({
	grandchild: "Grandchild",
	child: "Child",
	routeless: "Routeless",
	parent: "Parent",
	paramChild: "Child - {test}",
	stateChild: "Child - {testFunc}",
});

describe("breadcrumb selector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			data: {
				abcd123: {
					label: "Letters ABCD",
				},
			},
			router: {
				// Outermost route is set directly on router state, not in result
				route: "/parent/child/grandchild",
				result: {
					title: messages.grandchild,
					// Note absence of 'route' field - this is how redux-little-router does it
					parent: {
						title: messages.child,
						route: "/parent/child",
						parent: {
							title: messages.routeless,
							parent: {
								title: messages.parent,
								route: "/parent",
							},
						},
					},
				},
				params: {
					test: "value",
					ident: "abcd123",
				},
			},
		});
	});

	it("derives a breadcrumb trail from a matched path", () =>
		expect(breadcrumbs, "when called with", [state], "to satisfy", [
			{
				label: expect.it(
					"to exhaustively satisfy",
					<FormattedMessage {...messages.parent} />,
				),
			},
			{
				label: expect.it(
					"to exhaustively satisfy",
					<FormattedMessage {...messages.routeless} />,
				),
			},
			{
				label: expect.it(
					"to exhaustively satisfy",
					<FormattedMessage {...messages.child} />,
				),
			},
			{
				label: expect.it(
					"to exhaustively satisfy",
					<FormattedMessage {...messages.grandchild} />,
				),
			},
		]));

	it("replaces parameters with their value in titles", () => {
		const paramState = state.setIn(
			["router", "result", "parent", "title"],
			Immutable.fromJS(messages.paramChild),
		);
		return expect(breadcrumbs, "when called with", [paramState], "to satisfy", [
			{
				label: expect.it(
					"to exhaustively satisfy",
					<FormattedMessage {...messages.parent} />,
				),
			},
			{
				label: expect.it(
					"to exhaustively satisfy",
					<FormattedMessage {...messages.routeless} />,
				),
			},
			{
				label: expect.it(
					"to exhaustively satisfy",
					<FormattedMessage
						{...messages.paramChild}
						values={{ test: "value" }}
					/>,
				),
			},
			{
				label: expect.it(
					"to exhaustively satisfy",
					<FormattedMessage {...messages.grandchild} />,
				),
			},
		]);
	});

	it("handles state reference paths in titles", () => {
		const paramState = state.withMutations(s => {
			s.setIn(
				["router", "result", "parent", "title"],
				Immutable.fromJS(messages.stateChild),
			);
			s.setIn(
				["router", "result", "parent", "testFunc"],
				Immutable.fromJS(["data", ["router", "params", "ident"], "label"]),
			);
		});
		return expect(breadcrumbs, "when called with", [paramState], "to satisfy", [
			{
				label: expect.it(
					"to exhaustively satisfy",
					<FormattedMessage {...messages.parent} />,
				),
			},
			{
				label: expect.it(
					"to exhaustively satisfy",
					<FormattedMessage {...messages.routeless} />,
				),
			},
			{
				label: expect.it(
					"to exhaustively satisfy",
					<FormattedMessage
						{...messages.stateChild}
						values={{
							testFunc: "Letters ABCD",
						}}
					/>,
				),
			},
			{
				label: expect.it(
					"to exhaustively satisfy",
					<FormattedMessage {...messages.grandchild} />,
				),
			},
		]);
	});

	it("handles dead-end state reference paths in titles", () => {
		const paramState = state.withMutations(s => {
			s.setIn(
				["router", "result", "parent", "title"],
				Immutable.fromJS(messages.stateChild),
			);
			s.setIn(
				["router", "result", "parent", "testFunc"],
				Immutable.fromJS(["data", ["blah", "foo", "does not exist"], "label"]),
			);
		});
		return expect(breadcrumbs, "when called with", [paramState], "to satisfy", [
			{
				label: expect.it(
					"to exhaustively satisfy",
					<FormattedMessage {...messages.parent} />,
				),
			},
			{
				label: expect.it(
					"to exhaustively satisfy",
					<FormattedMessage {...messages.routeless} />,
				),
			},
			{
				label: expect.it(
					"to exhaustively satisfy",
					<FormattedMessage
						{...messages.stateChild}
						values={{
							testFunc: "[not found]",
						}}
					/>,
				),
			},
			{
				label: expect.it(
					"to exhaustively satisfy",
					<FormattedMessage {...messages.grandchild} />,
				),
			},
		]);
	});

	it("leaves out route steps without titles", () => {
		const untitledState = state.deleteIn([
			"router",
			"result",
			"parent",
			"title",
		]);
		return expect(
			breadcrumbs,
			"when called with",
			[untitledState],
			"to satisfy",
			[
				{
					label: expect.it(
						"to exhaustively satisfy",
						<FormattedMessage {...messages.parent} />,
					),
				},
				{
					label: expect.it(
						"to exhaustively satisfy",
						<FormattedMessage {...messages.routeless} />,
					),
				},
				{
					label: expect.it(
						"to exhaustively satisfy",
						<FormattedMessage {...messages.grandchild} />,
					),
				},
			],
		);
	});

	it("turns matched routes into hrefs", () =>
		expect(breadcrumbs, "when called with", [state], "to satisfy", [
			{
				href: "/parent",
			},
			{},
			{
				href: "/parent/child",
			},
			{
				href: "/parent/child/grandchild",
			},
		]));

	it("handles parametrized routes", () => {
		const paramState = state
			.setIn(["router", "result", "parent", "route"], "/parent/:ident")
			.setIn(["router", "route"], "/parent/:ident/grandchild");
		return expect(breadcrumbs, "when called with", [paramState], "to satisfy", [
			{
				href: "/parent",
			},
			{},
			{
				href: "/parent/abcd123",
			},
			{
				href: "/parent/abcd123/grandchild",
			},
		]);
	});

	it("handles having no path-matching result", () => {
		const noMatchState = state.setIn(["router", "result"], null);
		return expect(
			breadcrumbs,
			"when called with",
			[noMatchState],
			"to satisfy",
			[],
		);
	});

	it("handles having no path-matching parameters", () => {
		const noParamState = state.setIn(["router", "params"], null);
		return expect(
			breadcrumbs,
			"when called with",
			[noParamState],
			"to satisfy",
			[
				{
					label: expect.it(
						"to exhaustively satisfy",
						<FormattedMessage {...messages.parent} />,
					),
				},
				{
					label: expect.it(
						"to exhaustively satisfy",
						<FormattedMessage {...messages.routeless} />,
					),
				},
				{
					label: expect.it(
						"to exhaustively satisfy",
						<FormattedMessage {...messages.child} />,
					),
				},
				{
					label: expect.it(
						"to exhaustively satisfy",
						<FormattedMessage {...messages.grandchild} />,
					),
				},
			],
		);
	});

	it("handles plain string titles", () => {
		const plainTitleState = state.setIn(
			["router", "result", "parent", "title"],
			"Plain child",
		);
		return expect(
			breadcrumbs,
			"when called with",
			[plainTitleState],
			"to satisfy",
			[
				{
					label: expect.it(
						"to exhaustively satisfy",
						<FormattedMessage {...messages.parent} />,
					),
				},
				{
					label: expect.it(
						"to exhaustively satisfy",
						<FormattedMessage {...messages.routeless} />,
					),
				},
				{
					label: "Plain child",
				},
				{
					label: expect.it(
						"to exhaustively satisfy",
						<FormattedMessage {...messages.grandchild} />,
					),
				},
			],
		);
	});
});
