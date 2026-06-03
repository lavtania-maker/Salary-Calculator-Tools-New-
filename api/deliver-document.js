export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = req.body;
    // This endpoint just acknowledges the download event
    // Add any email delivery logic here if needed in the future
    console.log("Document delivered to:", body.email, "type:", body.download_via);
    return res.status(200).json({ status: "success", message: "Document delivered" });
  } catch (err) {
    console.error("deliver-document error:", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}
