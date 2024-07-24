import express from "express";
import { WhaProvider } from "./interfaces/WhaProvider";
import { VenomProvider } from "./providers/Venom";
import { TestMessagingProvider } from "./providers/TestMessagingProvider";
import { WPPConnect, } from "./providers/WPPConnect";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const messagingProvider: WhaProvider = new WPPConnect();

app.post("/send", async (req, res) => {
  const { number, message } = req.body;

  try {
    await messagingProvider.sendMessage(number, message);
    return res.send("Message sent");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error sending message");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
