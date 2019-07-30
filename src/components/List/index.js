import Loader from "../Loader";

/* istanbul ignore next */
const LoadableList = Loader(() => import("./List"));

export default LoadableList;
