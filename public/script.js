const form = document.getElementById("leadForm");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  result.innerHTML = "Submitting...";

  const payload = {
    caller_number: document.getElementById("caller_number").value,
    caller_state: document.getElementById("caller_state").value,
    caller_zip: document.getElementById("caller_zip").value
  };

  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.success) {
      result.innerHTML = `
        <h3>Success</h3>
        <pre>${JSON.stringify(data.response, null, 2)}</pre>
      `;
    } else {
      result.innerHTML = `
        <h3>Error</h3>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `;
    }

  } catch (error) {
    result.innerHTML = `
      <h3>Request Failed</h3>
      <pre>${error.message}</pre>
    `;
  }
});