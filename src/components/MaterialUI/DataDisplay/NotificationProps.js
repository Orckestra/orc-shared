import ComponentProps from "../componentProps";

class NotificationProps extends ComponentProps {
	static propNames = {
		autoHideDuration: "autoHideDuration",
		anchorOrigin: "anchorOrigin",
		lastOnly: "lastOnly",
	};

	constructor() {
		super();

		this.componentProps.set(this.constructor.propNames.autoHideDuration, null);
		this.componentProps.set(this.constructor.propNames.anchorOrigin, null);
		this.componentProps.set(this.constructor.propNames.lastOnly, null);

		this._isNotificationProps = true;
	}
}

export const isNotificationProps = function (value) {
	if (value == null) return true;
	return typeof value === "object" && (value instanceof NotificationProps || value._isNotificationProps === true);
};

export default NotificationProps;
