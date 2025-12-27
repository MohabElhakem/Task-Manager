// to declare the type of the function you need
// declare the values coming in 
// and the value returned
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
export default asyncHandler;
//# sourceMappingURL=asynchandler.js.map