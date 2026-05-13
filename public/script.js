const form = document.getElementById("leadForm");

const result = document.getElementById("result");

/*
==================================================
SUBMIT FORM
==================================================
*/

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  result.innerHTML = "Submitting...";

  /*
  ==============================================
  FORM DATA
  ==============================================
  */

  const payload = {
    caller_number:
      document.getElementById("caller_number").value,

    caller_state:
      document.getElementById("caller_state").value,

    caller_zip:
      document.getElementById("caller_zip").value
  };

  console.log(payload);

  /*
  ==============================================
  SEND TO BACKEND
  ==============================================
  */

  try {

    const response = await fetch(
      "/api/submit",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();

    console.log(data);

    /*
    ==========================================
    SHOW RESPONSE
    ==========================================
    */

    result.innerHTML =
      "<pre>" +
      JSON.stringify(data, null, 2) +
      "</pre>";

  } catch (error) {

    console.error(error);

    result.innerHTML =
      "<p>" + error.message + "</p>";

  }

});