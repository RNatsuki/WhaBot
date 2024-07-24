import fs from "node:fs";

import { create, Whatsapp } from "venom-bot";
import { WhaProvider } from "../interfaces/WhaProvider";

export class VenomProvider implements WhaProvider {
  private client: Whatsapp | null = null;
  private clientReady: Promise<void>;

  constructor() {
    this.clientReady = this.initializeClient();
  }

  private async initializeClient(): Promise<void> {
    this.client = await create({
      session: "sessionName",
      logQR: false,
      catchQR: (qrCode) => this.generateQRCode(qrCode),
    });
  }

  async sendMessage(to: string, message: string): Promise<void> {
    await this.clientReady;

    if (!this.client) {
      throw new Error("Client not initialized");
    }

    await this.client.sendText(to + "@c.us", message);
  }

  generateQRCode(base64: string): void {
    const qrCode = base64.replace("data:image/png;base64,", "");
    const qrCodePath = "temp/qrCode.png";

    fs.writeFileSync(qrCodePath, qrCode, "base64");
  }
}
