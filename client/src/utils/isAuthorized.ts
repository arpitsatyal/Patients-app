export const canUserAccess = (): boolean => localStorage.getItem("token") ? true : false;
