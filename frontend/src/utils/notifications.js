import Swal from "sweetalert2";

export function showToast(message, type = "info") {
  const toastType =
    type === "error" ? "error" : type === "success" ? "success" : "info";

  return Swal.fire({
    icon: toastType,
    title: message,
    toast: true,
    position: "top-end",
    timer: 2800,
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
    customClass: {
      popup: "rentosphere-toast",
    },
  });
}
