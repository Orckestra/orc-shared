import React from "react";
import Fieldset from "./Fieldset";
import Combination from "./Combination";
import FieldList from "./FieldList";
import InputField from "./InputField";

// // Multiple column fields?

const FieldElements = ({
	fields,
	labelOnly,
	getUpdater = () => {},
	values = {},
	wide,
}) => (
	<React.Fragment>
		{fields.map(({ type, name, ...props }) => {
			switch (type) {
				case "Fieldset": {
					return (
						<Fieldset key={name} label={props.label}>
							<FieldElements
								fields={props.fields}
								getUpdater={getUpdater}
								values={values}
								wide={wide}
							/>
						</Fieldset>
					);
				}
				case "Combination": {
					return (
						<Combination
							key={name}
							label={props.label}
							proportions={props.proportions}
						>
							<FieldElements
								fields={props.fields}
								getUpdater={getUpdater}
								values={values}
								labelOnly={labelOnly}
								wide={wide}
							/>
						</Combination>
					);
				}
				case "List": {
					return (
						<FieldList
							key={name}
							name={name}
							values={values}
							getUpdater={getUpdater}
							rowCount={props.rowCount}
							wide={wide}
							{...props}
						/>
					);
				}
				default: {
					return (
						<InputField
							key={name}
							type={type}
							update={getUpdater(name)}
							value={values[name]}
							labelOnly={labelOnly}
							{...props}
						/>
					);
				}
			}
		})}
	</React.Fragment>
);

export default FieldElements;
