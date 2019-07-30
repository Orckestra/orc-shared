import Loader from "../Loader";

/* istanbul ignore next */
const LoadableAppFrame = Loader(() => import("./AppFrame"));

export default LoadableAppFrame;
