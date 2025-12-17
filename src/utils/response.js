export const success = (res, data = null, message = "Success", status = 200) => {
    return res.status(status).json({
        success: true,
        message,
        data,
    });
};

export const error = (message = "Error", status = 500) => {
    const err = new Error(message);
    err.status = status;
    return err;
};
