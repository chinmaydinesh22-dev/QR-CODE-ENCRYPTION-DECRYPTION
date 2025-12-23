const el = id => document.getElementById(id);
const status = el("status");

function setStatus(msg, isError=false) {
  status.textContent = msg || "";
  status.style.color = isError ? "crimson" : "#444";
}

document.getElementById("btn-generate-key").addEventListener("click", async () => {
  setStatus("Generating key...");
  try {
    const res = await fetch("/api/generate-key", { method: "POST" });
    const j = await res.json();
    setStatus(j.message || "Key generated.");
  } catch (e) { setStatus("Failed: " + e.message, true); }
});

document.getElementById("btn-encrypt").addEventListener("click", async () => {
  const msg = el("message").value;
  if (!msg.trim()) { setStatus("Enter message to encrypt", true); return; }
  setStatus("Encrypting...");
  try {
    const res = await fetch("/api/encrypt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });
    const j = await res.json();
    if (res.ok) {
      el("qr-preview").src = j.qr_data_url;
      el("token-output").value = j.token;
      document.getElementById("encrypt-result").classList.remove("hidden");
      setStatus("Encrypted & QR generated.");
    } else {
      setStatus("Error: " + (j.error || "unknown"), true);
    }
  } catch (e) { setStatus("Failed: " + e.message, true); }
});

document.getElementById("btn-download-qr").addEventListener("click", async () => {
  const form = new FormData();
  const msg = el("message").value;
  if (!msg.trim()) { setStatus("Enter message", true); return; }
  form.append("message", msg);
  try {
    const resp = await fetch("/api/encrypt-download", { method: "POST", body: form });
    const blob = await resp.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `qr_${Date.now()}.png`;
    a.click(); URL.revokeObjectURL(a.href);
    setStatus("QR downloaded.");
  } catch (e) { setStatus("Download failed: " + e.message, true); }
});

document.getElementById("btn-decrypt-token").addEventListener("click", async () => {
  const token = el("token-input").value.trim();
  if (!token) { setStatus("Paste the encrypted token.", true); return; }
  setStatus("Decrypting...");
  try {
    const res = await fetch("/api/decrypt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });
    const j = await res.json();
    if (res.ok) {
      el("plaintext-output").textContent = j.plaintext;
      el("decrypt-result").classList.remove("hidden");
      setStatus("Decrypted successfully.");
    } else {
      setStatus("Decrypt error: " + (j.error || "unknown"), true);
    }
  } catch (e) { setStatus("Failed: " + e.message, true); }
});
