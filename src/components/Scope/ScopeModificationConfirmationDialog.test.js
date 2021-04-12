import React from "react";
import ScopeModificationConfirmationDialog from "./ScopeModificationConfirmationDialog";
import { extractMessages, TestWrapper } from "utils/testUtils";
import { scopeConfirmationDialogTypes } from "../../constants";
import sinon from "sinon";
import sharedMessages from "../../sharedMessages";
import ConfirmationModal from "../MaterialUI/DataDisplay/PredefinedElements/ConfirmationModal";
import { FormattedMessage } from "react-intl";

const messages = extractMessages(sharedMessages);

describe("ScopeModificationConfirmationDialog", () => {
	it("should not render a dialog when dialog type is none", function () {
		const component = (
			<TestWrapper>
				<ScopeModificationConfirmationDialog scopeDialogType={scopeConfirmationDialogTypes.none} />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", null);
	});

	it("should render scope change confirmation dialog for open tabs", function () {
		const closeFn = sinon.spy().named("close");
		const okFn = sinon.spy().named("ok");

		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<ScopeModificationConfirmationDialog
					scopeDialogType={scopeConfirmationDialogTypes.scopeChangeConfirmation}
					closeModalCallback={closeFn}
					isModalOpened={true}
					okCallback={okFn}
				/>
			</TestWrapper>
		);

		expect(
			component,
			"when mounted",
			"to satisfy",
			<TestWrapper intlProvider={{ messages }}>
				<ConfirmationModal
					title={<FormattedMessage {...sharedMessages.scopeChangeWithOpenedTabsTitle} />}
					message={<FormattedMessage {...sharedMessages.scopeChangeWithOpenedTabsConfirmation} />}
					open={true}
					okButtonLabel={sharedMessages.yes}
					cancelButtonLabel={sharedMessages.no}
					okCallback={okFn}
					cancelCallback={() => closeFn()}
					backdropClickCallback={() => closeFn()}
				/>
			</TestWrapper>,
		);
	});

	it("should render scope change confirmation dialog for modified models", function () {
		const closeFn = sinon.spy().named("close");
		const okFn = sinon.spy().named("ok");

		const component = (
			<TestWrapper intlProvider={{ messages }}>
				<ScopeModificationConfirmationDialog
					scopeDialogType={scopeConfirmationDialogTypes.hasUnsavedDataMessage}
					closeModalCallback={closeFn}
					isModalOpened={true}
					okCallback={okFn}
				/>
			</TestWrapper>
		);

		expect(
			component,
			"when mounted",
			"to satisfy",
			<TestWrapper intlProvider={{ messages }}>
				<ConfirmationModal
					title={<FormattedMessage {...sharedMessages.scopeChangeWithUnsavedDataTitle} />}
					message={<FormattedMessage {...sharedMessages.scopeChangeWithUnsavedDataConfirmation} />}
					open={true}
					okButtonLabel={sharedMessages.yes}
					cancelButtonLabel={sharedMessages.no}
					okCallback={okFn}
					cancelCallback={() => closeFn()}
					backdropClickCallback={() => closeFn()}
				/>
			</TestWrapper>,
		);
	});
});
