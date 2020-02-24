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
	...elementProps
}) => (
	<React.Fragment>
		{fields.map(({ type, name, label, ...props }) => {
			switch (type) {
				case "Fieldset": {
					return (
						<Fieldset key={name} label={label}>
							<FieldElements
								getUpdater={getUpdater}
								{...elementProps}
								{...props}
							/>
						</Fieldset>
					);
				}
				case "Combination": {
					return (
						<Combination
							key={name}
							label={label}
							proportions={props.proportions}
						>
							<FieldElements
								getUpdater={getUpdater}
								labelOnly={labelOnly}
								{...elementProps}
								{...props}
							/>
						</Combination>
					);
				}
				case "List": {
					return (
						<FieldList
							key={name}
							name={name}
							label={label}
							getUpdater={getUpdater}
							rowCount={props.rowCount}
							{...elementProps}
							{...props}
						/>
					);
				}
				default: {
					return (
						<InputField
							key={name}
							name={name}
							label={label}
							type={type}
							update={getUpdater(name)}
							labelOnly={labelOnly}
							{...elementProps}
							{...props}
						/>
					);
				}
			}
		})}
	</React.Fragment>
);

export default FieldElements;
