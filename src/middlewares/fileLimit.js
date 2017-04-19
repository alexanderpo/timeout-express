export const fileLimitChecker = (error, req, res, next) => {
  if (error.status === 413) {
    res.json({
      error: 'Изображение не должно быть больше чем 2мб.'
    });
  } else {
    next();
  }
};
