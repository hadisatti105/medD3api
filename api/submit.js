export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { caller_number, caller_state, caller_zip } = req.body || {};

    if (!caller_number || !caller_state || !caller_zip) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const response = await fetch("https://rtb.retreaver.com/rtbs.json", {
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
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    return res.status(200).json({
      success: true,
      response: data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}