const asyncHandler =  (api) => {
  return (req, res, next) => {
    api(req, res, next).catch((error) => {
      next(error);
    });
  };
};

export default asyncHandler;


