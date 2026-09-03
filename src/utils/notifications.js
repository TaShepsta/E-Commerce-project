import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function showToast(message, type = "info") {
  const colors = {
    success: "#0b3b32",
    error: "#b42318",
    info: "#344054",
  };

  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    close: true,
    stopOnFocus: true,
    style: {
      background: colors[type] || colors.info,
      borderRadius: "8px",
      boxShadow: "0 8px 24px rgba(17, 24, 39, 0.18)",
    },
  }).showToast();
}
