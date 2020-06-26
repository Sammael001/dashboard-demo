module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please login to view this page.");
    res.redirect("/users/login")
  }
}

// this middleware can now be added to ANY route to ensure the user who attempts to access it, is authenticated
