export function checkUserToken() {
  if (localStorage.getItem("isLoggedIn") === "false") {
    return false;
  } else {
    return true;
  }
}
