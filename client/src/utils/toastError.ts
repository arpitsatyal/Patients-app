import { useToast } from "vue-toastification";
const toast = useToast();

export function toastError(error: any) {
  const errorFromBE = error.response.data.error;

  if (errorFromBE) {
    if (errorFromBE.message) {
      toast.error(errorFromBE.message);
    } else if (typeof errorFromBE !== "string") {
      toast.error("something went wrong");
    } else {
      toast.error(errorFromBE);
    }
  } else {
    toast.error(error.message);
  }
}
