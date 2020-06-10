export default class ComponentProps {
	componentProps = new Map();
	componentClasses = new Map();

	set(key, value) {
		if (this.componentProps.has(key) === false) {
			throw new Error("Incorrect key was passed");
		}
		this.componentProps.set(key, value);
	}

	get(key) {
		return this.componentProps.get(key);
	}

	setStyle(key, value) {
		if (this.componentClasses.has(key) === false) {
			throw new Error("Incorrect key was passed");
		}
		this.componentClasses.set(key, value);
	}

	getStyle(key) {
		return this.componentClasses.get(key);
	}
}
