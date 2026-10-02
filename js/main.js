(function () {
  const copyLabel = "複製網址";
  const copiedLabel = "已複製";

  document.querySelectorAll(".copy-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const url = button.getAttribute("data-copy");
      if (!url) return;

      try {
        await copyText(url);
      } catch (error) {
        button.setAttribute("aria-label", "複製失敗");
        return;
      }

      document.querySelectorAll(".copy-btn.is-copied").forEach((other) => {
        if (other === button) return;
        window.clearTimeout(other.resetTimer);
        other.classList.remove("is-copied");
        other.setAttribute("aria-label", copyLabel);
      });

      button.classList.add("is-copied");
      button.setAttribute("aria-label", copiedLabel);
      window.clearTimeout(button.resetTimer);
      button.resetTimer = window.setTimeout(() => {
        button.classList.remove("is-copied");
        button.setAttribute("aria-label", copyLabel);
      }, 1600);
    });
  });

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise((resolve, reject) => {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.top = "0";
      area.style.left = "0";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.focus();
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      if (ok) resolve();
      else reject(new Error("copy failed"));
    });
  }
})();
