document.addEventListener("mouseup", () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      createFloatButton(selectedText);
    }
  });
  
  function createFloatButton(selectedText) {
    removeExistingButton();
  
    const floatButton = document.createElement("button");
    floatButton.textContent = "Explain";
    floatButton.style.position = "absolute";
    floatButton.style.top = `${window.event.pageY}px`;
    floatButton.style.left = `${window.event.pageX}px`;
    floatButton.style.zIndex = 1000;
    floatButton.className = "code-helper-button";
  
    floatButton.onclick = () => {
      chrome.runtime.sendMessage({ action: "fetchExplanation", code: selectedText }, (response) => {
        showPopup(response.explanation);
      });
    };
  
    document.body.appendChild(floatButton);
  }
  
  function removeExistingButton() {
    const existingButton = document.querySelector(".code-helper-button");
    if (existingButton) existingButton.remove();
  }
  
  function showPopup(content) {
    const popup = document.createElement("div");
    popup.className = "code-helper-popup";
    popup.innerHTML = `<p>${content}</p>`;
    popup.style.position = "fixed";
    popup.style.top = `${window.event.pageY + 10}px`;
    popup.style.left = `${window.event.pageX}px`;
    popup.style.background = "#fff";
    popup.style.border = "1px solid #ccc";
    popup.style.padding = "10px";
    popup.style.zIndex = 1001;
  
    document.body.appendChild(popup);
  
    setTimeout(() => {
      popup.remove();
    }, 5000);
  }
  