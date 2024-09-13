const checkUserRole = (role) => {
  return (req, res, next) => {
    if (req.userRole !== role) {
      throw new Error('You have no access');
    }
    next();
  };
};

module.exports = checkUserRole;
