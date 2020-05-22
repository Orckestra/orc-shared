export default class ComponentStyle {
	componentStyles = new Map();

	set(key, value) {
		if (this.componentStyles.has(key) == false) {
			throw "Incorrect key was passed";
		}
		this.componentStyles.set(key, value);
	}

	get(key) {
		return this.componentStyles.get(key);
	}
}
