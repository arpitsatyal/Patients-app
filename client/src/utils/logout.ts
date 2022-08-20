import router from "@/router";

export function logout(timeout?: number) {
  localStorage.clear();
  if (timeout) {
    setTimeout(() => {
      router.push("/");
    }, timeout);
  } else {
    router.push("/");
  }
}
