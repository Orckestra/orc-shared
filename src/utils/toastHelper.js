export const getToastColor = (theme, alertType) => {
	const toastBorderColors = {
		error: theme.palette.error.main,
		warn: theme.palette.warning.main,
		confirm: theme.palette.success.main,
	};
	return toastBorderColors[alertType] || "red";
};
