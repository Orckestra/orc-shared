import Loader from "../Loader";

/* istanbul ignore next */
const LoadableForm = Loader(() => import("./Form"));

export default LoadableForm;
