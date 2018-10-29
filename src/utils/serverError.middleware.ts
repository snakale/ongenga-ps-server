
export const serverErrorHandler = (error, request, response, next) => {
    if (response.headerSent) {
        return next(error);
    }
    console.error(new Date().toISOString(), request.method, request.originalUrl, error);
	return response.status(500).json({success: false, message: 'An unexppected error occured'});
}