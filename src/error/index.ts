import AppError from "./AppError.js";
import BadRequest from "./BadRequest.js";
import Conflict from "./Conflict.js";
import Forbidden from "./Forbidden.js";
import Unauthorized from "./Unauthorized.js";
import NotFound from "./NotFound.js";

const Err = {
    AppError,
    BadRequest,
    Conflict,
    Forbidden,
    Unauthorized,
    NotFound,
}

export default Err