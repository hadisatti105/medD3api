require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

/*
==================================================
MIDDLEWARE
==================================================
*/

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

/*
==================================================
API ROUTE
==================================================
*/

app.post("/api/submit", async (req, res) => {

  try {

    const {
      caller_number,
      caller_state,
      caller_zip
    } = req.body;

    /*
    ==========================================
    VALIDATION
    ==========================================
    */

    if (!caller_number) {
      return res.status(400).json({
        success: false,
        message: "Caller number required"
      });
    }

    if (!caller_state) {
      return res.status(400).json({
        success: false,
        message: "Caller state required"
      });
    }

    if (!caller_zip) {
      return res.status(400).json({
        success: false,
        message: "Caller ZIP required"
      });
    }

    /*
    ==========================================
    RETREAVER POST REQUEST
    ==========================================
    */

    const response = await fetch(
      "https://rtb.retreaver.com/rtbs.json",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          key: process.env.RETREAVER_API_KEY,
          caller_number,
          caller_state,
          caller_zip
        })
      }
    );

    /*
    ==========================================
    HANDLE RESPONSE
    ==========================================
    */

    const text = await response.text();

    console.log("Retreaver Response:");
    console.log(text);

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    /*
    ==========================================
    RETURN RESPONSE TO FRONTEND
    ==========================================
    */

    return res.json({
      success: true,
      response: data
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message
    });

  }

});

/*
==================================================
FRONTEND ROUTE
==================================================
*/

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/*
==================================================
START SERVER
==================================================
*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});