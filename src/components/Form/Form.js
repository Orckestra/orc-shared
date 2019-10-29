import React from "react";
import styled from "styled-components";
import pt from "prop-types";
import { memoize } from "../../utils";
import routingConnector from "../../hocs/routingConnector";
import withScrollBox from "../../hocs/withScrollBox";
import { cultureList } from "../../selectors/locale";
import Form from "./FormElement";
import FieldElements from "./FieldElements";

export const withCultureCount = routingConnector(
	state => ({ cultureCount: cultureList(state).size }),
	() => ({}),
);

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
`;

export const FormPage = ({
	cols = [1, 1, 1],
	getUpdater,
	fields,
	values,
	width = 1000,
	cultureCount,
	wide,
}) => {
	let colSpans = wide ? [1] : cols;
	const colCount = colSpans.reduce((a, b) => a + b, 0);
	const elmsPerCol = Math.ceil(fields.length / colSpans.length);
	const colFields =
		colSpans.length < 2
			? [fields]
			: fields.reduce((current, field, index) => {
					if (index % elmsPerCol === 0) {
						current.push([field]);
					} else {
						current[current.length - 1].push(field);
					}
					return current;
			  }, []);
	return (
		<Wrapper>
			{colFields.map((fields, index) => (
				<Form
					key={index}
					spanWidth={colSpans[index] /* istanbul ignore next*/ || 1}
					colCount={colCount}
				>
					<FieldElements
						getUpdater={getUpdater}
						fields={addNamesToFields(fields)}
						values={values}
						wide={wide}
					/>
				</Form>
			))}
		</Wrapper>
	);
};

const WiredForm = withScrollBox(withCultureCount(FormPage));

WiredForm.propTypes = {
	getUpdater: pt.func.isRequired,
	fields: pt.arrayOf(pt.object).isRequired,
	values: pt.object.isRequired,
	wide: pt.bool,
};

export default WiredForm;
