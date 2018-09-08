module.exports.errorHandler = (res, error) => {
    res.status(200).json({
        success: false,
        message: error.message ? error.message : error
    });
};