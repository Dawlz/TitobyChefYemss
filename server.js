import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';
dotenv.config();

const app = express();
const GAS_URL = process.env.GAS_URL
const secretKey = process.env.Secret
const PORT = process.env.PORT || 3000;
app.use(cors({origin: '*', methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'], allowedHeaders: ['Content-Type', 'Authorization'], credentials: false}));
app.use(express.json());

app.use(express.static('public'));

app.post("/subscribe", async (req, res) => {
  
  try {
    const { email } = req.body;
    console.log("Received request:", email);
    if (!email) return res.status(400).json({ message: "Email is required" });

    const subscriber = await fetch(
      GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, key: secretKey }),
    });
      
      const subscriberData = await subscriber.json();
      console.log("Subscriber data: ", subscriberData);

      if (subscriberData.result === "error" ) {
        return res.status(409).json({success: false, message: subscriberData.message });
      };

      return res.status(200).json({success: true, message: "Thank you for your interest in our treats, you have been added to the waitlist successfully" });
  }
  
    catch (err) {
      console.error("Error:", err);
      res.status(500).json({ success: false, error: "Server error" });
    }
});

app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);