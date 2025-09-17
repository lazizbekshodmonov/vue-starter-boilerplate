import { message } from "ant-design-vue";
import type { AxiosError } from "axios";

interface INotification {
  type: "success" | "error" | "warning" | null;
  message: string | null;
}

export default function useNotification() {
  function setToast(toast: INotification) {
    switch (toast.type) {
      case "success":
        message.success(toast.message);
        break;
      case "error":
        message.error(toast.message);
        break;
      case "warning":
        message.warning(toast.message);
        break;
    }
  }

  function handleError(error: unknown) {
    const { response, status } = error as AxiosError<{ message: string }>;
    if (status !== 401) {
      setToast({
        type: "error",
        message: response?.data.message || (error as Error)?.message,
      });
    }
  }

  function handleEimzoError(error: unknown) {
    console.log(error);
  }

  return { setToast, handleError, handleEimzoError };
}
