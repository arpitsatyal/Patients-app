export function canUserAccess() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.accessToken ? true : false;
  }