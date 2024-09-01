import { toast, Bounce } from "react-toastify";

const CustomToast = ({ title, description }) => (
  // <div className={styles.toast}>
  <div>
    <h4>{title} </h4>
    <p>{description}</p>
  </div>
);

export const notifyError = (description) =>
  toast.error(<CustomToast title="Ошибка" description={description} />, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });

export const notifySuccess = (description) =>
  toast.success(<CustomToast title="Успех" description={description} />, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });

export const notifyInfo = (description) =>
  toast.info(<CustomToast title="Информация" description={description} />, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
