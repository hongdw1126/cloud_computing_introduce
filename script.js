const API_BASE_URL = "https://personal-profile-api-fhmc.onrender.com";
const callButton = document.querySelector("#call-api");
const result = document.querySelector("#api-result");
const statusDot = document.querySelector("#status-dot");
const docsLink = document.querySelector("#docs-link");

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#endpoint-label").textContent = `${API_BASE_URL}/api/profile`;
docsLink.href = `${API_BASE_URL}/docs`;

function highlightJson(value) {
  const escaped = JSON.stringify(value, null, 2).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return escaped.replace(/("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"\s*:)|("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*")|\b(true|false|null)\b|-?\d+(?:\.\d+)?/g, match => {
    let className = "json-number";
    if (/^"/.test(match)) className = /:$/.test(match) ? "json-key" : "json-string";
    return `<span class="${className}">${match}</span>`;
  });
}

callButton.addEventListener("click", async () => {
  callButton.disabled = true;
  callButton.innerHTML = "연결 중... <b>···</b>";
  result.innerHTML = '<div class="placeholder"><span>↻</span><p>Render 서버에 연결하고 있습니다.<br />무료 서버의 첫 요청은 잠시 걸릴 수 있어요.</p></div>';
  const startedAt = performance.now();
  try {
    const response = await fetch(`${API_BASE_URL}/api/profile`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const elapsed = Math.round(performance.now() - startedAt);
    statusDot.classList.add("online");
    result.innerHTML = `<div class="response-header"><span class="success">● 200 OK</span><span>${elapsed} ms</span><span>application/json</span></div><pre>${highlightJson(data)}</pre>`;
  } catch (error) {
    statusDot.classList.remove("online");
    result.innerHTML = `<div class="placeholder"><span>!</span><p>API 연결에 실패했습니다.<br />${error.message}</p></div>`;
  } finally {
    callButton.disabled = false;
    callButton.innerHTML = "다시 요청하기 <b>→</b>";
  }
});
