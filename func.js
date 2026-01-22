function escapeHTML(text) {
    const a = document.createElement("div")
    a.textContent = text;
    return a.innerHTML;
}