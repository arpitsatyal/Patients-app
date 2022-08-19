import { useToast } from "vue-toastification";
const toast = useToast();

export function toastError(error: any) {
    console.log(error);
    if (error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error(error.message);
    }
}
