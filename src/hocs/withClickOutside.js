import ReactDOM from "react-dom";
import { compose, mapProps, lifecycle } from "recompose";

const descendsFrom = (descendant, ancestor) => {
	if (descendant === ancestor) {
		return true;
	} else if (descendant === document.body || !descendant) {
		return false;
	} else {
		return descendsFrom(descendant.parentNode, ancestor);
	}
};

const withClickOutside = lifecycle({
	componentDidMount() {
		this.innerRef = ReactDOM.findDOMNode(this);
		this.handler = event => {
			if (!descendsFrom(event.target, this.innerRef)) {
				(this.props.onClickOutside || (() => {}))(event);
			}
		};
		document.addEventListener("click", this.handler, true);
	},
	componentDidUpdate() {
		this.innerRef = ReactDOM.findDOMNode(this);
	},
	componentWillUnmount() {
		document.removeEventListener("click", this.handler, true);
	},
});

const filterProps = mapProps(({ onClickOutside, ...props }) => props);

export default compose(withClickOutside, filterProps);
