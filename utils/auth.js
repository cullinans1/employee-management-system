const withAuth = (req, res, next) => {
    if (!req.session.admin_Id) {
      res.redirect('/admin-login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;