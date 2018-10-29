

export const unknownUrlHandler = (request, response) => {
    console.warn(new Date().toISOString(), request.method, request.originalUrl, '404');
    return response.status(404).json({success:false, message: 'Unknown route'});
}