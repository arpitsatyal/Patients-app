export const getFromLS = (field: string): string | number => {
  const ls = localStorage.getItem("user") || "{}";
  let result;
  const parsed = JSON.parse(ls);
  if (field === "token") {
    result = parsed.accessToken;
  } else if (field === "user") {
    result = parsed.user.id;
  }
  return result;
};
