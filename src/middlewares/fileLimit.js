export const fileLimitChecker = (error, req, res, next) => {
  if (error.status === 413) {
    res.json({
      error: 'The image shouldn\'t be larger than 2mb.'
    });
  } else {
    next();
  }
};
