export const getFromLS = (field: string): string | number => {
  const ls = localStorage.getItem("user") || "{}";
  let result;

  if (field === "user") {
    const parsed = JSON.parse(ls);
    result = parsed.id;
  } else if (field === "token") {
    result = localStorage.getItem("token");
  } else if (field === "refreshToken") {
    result = localStorage.getItem("refreshToken");
  }

  return result;
};
