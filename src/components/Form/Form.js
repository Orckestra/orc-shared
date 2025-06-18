import React, { createContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import pt from "prop-types";
import withScrollBox from "../../hocs/withScrollBox";
import Form from "./FormElement";
import FieldElements from "./FieldElements";

const useStyles = makeStyles(() => ({
	wrapper: {
		display: "flex",
		marginBottom: 20,
	},
}));

const splitFields = (fields, cols) => {
	if (cols <= 1) return [fields];
	const elmsPerCol = Math.ceil(fields.length / cols);
	return fields.reduce((current, field, index) => {
		if (index % elmsPerCol === 0) {
			current.push([field]);
		} else {
			current[current.length - 1].push(field);
		}
		return current;
	}, []);
};

export const FormContext = createContext();
FormContext.displayName = "FormContext";

export const FormPage = ({ formName, cols = [1, 1, 1], getUpdater, fields, values, wide }) => {
	const classes = useStyles();
	let colSpans = wide ? [] : cols;
	const colFields = splitFields(fields, colSpans.length);

	return (
		<FormContext.Provider
			value={{
				values,
				formName,
			}}
		>
			<div className={classes.wrapper}>
				{colFields.map((fields, index) => (
					<Form key={index} spanWidth={colSpans[index] || 1}>
						<FieldElements getUpdater={getUpdater} fields={fields} />
					</Form>
				))}
			</div>
		</FormContext.Provider>
	);
};

const WiredForm = withScrollBox(FormPage);

WiredForm.propTypes = {
	getUpdater: pt.func.isRequired,
	fields: pt.arrayOf(pt.object).isRequired,
	values: pt.object.isRequired,
	wide: pt.bool,
};

export default WiredForm;
