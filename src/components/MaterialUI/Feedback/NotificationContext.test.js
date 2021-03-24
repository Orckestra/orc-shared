import React, { createContext, useState } from "react";
import { useNotification } from "./useNotification";
import Notification from "./../DataDisplay/Notification";
import { NotificationContext, NotificationContextProvider } from "./NotificationContext";

describe("NotificationContext", () => {
	const TestComp = () => {
		return <div>something</div>;
	};

	it("Wraps up passed children and adds Notifications to the DOM", () => {
		const component = (
			<NotificationContextProvider>
				<TestComp />
			</NotificationContextProvider>
		);

		const expected = (
			<NotificationContext.Provider>
				<Notification snackPack={[]} />
				<TestComp />
			</NotificationContext.Provider>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});
});
