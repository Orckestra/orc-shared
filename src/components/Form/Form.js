import React, { createContext } from "react";
import styled from "styled-components";
import pt from "prop-types";
import { memoize } from "../../utils";
import withScrollBox from "../../hocs/withScrollBox";
import Form from "./FormElement";
import FieldElements from "./FieldElements";

const randomName = () =>
	Math.floor(Math.random() * 16777215)
		.toString(16)
		.padStart(6, "0");

export const addNamesToFields = memoize(fields =>
	fields.map(field => {
		const outField = {
			name: randomName(),
			...field,
		};
		if (field.fields) {
			outField.fields = addNamesToFields(field.fields);
		}
		if (field.rowField) {
			outField.rowField = addNamesToFields([field.rowField])[0];
		}
		return outField;
	}),
);

export const Wrapper = styled.div`
	display: flex;
	margin-bottom: 20px;
`;

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

export const FormPage = ({
	cols = [1, 1, 1],
	getUpdater,
	fields,
	values,
	wide,
}) => {
	let colSpans = wide ? [1] : cols;
	const colFields = splitFields(fields, colSpans.length);
	return (
		<FormContext.Provider
			value={{
				values,
			}}
		>
			<Wrapper>
				{colFields.map((fields, index) => (
					<Form
						key={index}
						spanWidth={colSpans[index] /* istanbul ignore next*/ || 1}
					>
						<FieldElements
							getUpdater={getUpdater}
							fields={addNamesToFields(fields)}
						/>
					</Form>
				))}
			</Wrapper>
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
