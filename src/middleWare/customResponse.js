export const customResponse = (req, res, next) => {
    res.success = (data, message = "Success", statusCode = 200) => {
        return res.status(statusCode).json({ message, data });
    };
    
    res.error = (message = "Error", statusCode = 500) => {
        return res.status(statusCode).json({ message });
    };
    
    next();
};
