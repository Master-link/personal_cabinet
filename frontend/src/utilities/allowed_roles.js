export const allowed_roles = (user_roles, denied) => {
  if (user_roles.filter(value => denied.includes(value)).length>0) {
    return false;
  } else {
    return true;
  }
}