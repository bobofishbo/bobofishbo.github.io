import express from "express";
import cors from "cors";
import "dotenv/config";
import fetch from "node-fetch"; // or import fetch from "node-fetch" for CommonJS

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://cloud.fastgpt.cn/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.FASTGPT_API_KEY}`
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
        model: "gpt-3.5-turbo",
        stream: false
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices?.[0]?.message?.content || "No response." });

  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Server failed to fetch FastGPT response" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running on port ${PORT}`);
});



import rateLimit from "express-rate-limit";

// Limit to 10 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per window
  message: { error: "Too many requests. Please try again later." }
});

app.use("/chat", limiter);
