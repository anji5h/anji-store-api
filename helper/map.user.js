exports.mapUser = function (userDetail) {
  let user = {};
  if (userDetail.name) {
    user.name = userDetail.name;
  }
  if (userDetail.email) {
    user.email = userDetail.email;
  }
  if (userDetail.username) {
    user.username = userDetail.username;
  }
  if (userDetail.password) {
    user.password = userDetail.password;
  }
  return user;
};
