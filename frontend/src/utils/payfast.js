// PayFast's "onsite"/redirect flow expects a real HTML form POST to their
// process URL — not a fetch/XHR (their page isn't CORS-enabled and expects
// a full page navigation). So we build one on the fly and submit it.
export function redirectToPayfast({ action, fields }) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = action;
  form.style.display = "none";

  Object.entries(fields).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}
