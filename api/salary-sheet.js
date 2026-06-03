export default async function handler(req, res) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const APPS_SCRIPT_URL = process.env.SALARY_SHEET_URL;

  if (!APPS_SCRIPT_URL) {
    return res.status(500).json({ error: "SALARY_SHEET_URL env variable not set" });
  }

  try {
    const body = req.body;

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const text = await response.text();
    return res.status(200).json({ status: "success", response: text });
  } catch (err) {
    console.error("salary-sheet error:", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}
