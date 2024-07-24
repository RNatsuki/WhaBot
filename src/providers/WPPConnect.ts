import fs from "fs";

import { WhaProvider } from "../interfaces/WhaProvider";
import {
  create,
  type Whatsapp,
  defaultLogger,
} from "@wppconnect-team/wppconnect";

defaultLogger.transports.forEach((t) => (t.silent = true));

export class WPPConnect implements WhaProvider {
  private client: Whatsapp | null = null;
  private clientReady: Promise<void>;
  constructor() {
    this.clientReady = this.initializeClient();
  }

  private async initializeClient(): Promise<void> {
    try {
      //@ts-ignore
      const instance = await create({
        session: "sessionName",
        headless: "shell",
        puppeteerOptions: {
          headless: 'new',

          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-accelerated-2d-canvas",
            "--no-first-run",
            "--no-zygote",
            //"--single-process", // <- this one doesn't works in Windows
            "--disable-gpu",
          ],
        },
        catchQR: (base64Qr: string) => this.generateQRCode(base64Qr),
      });

      this.client = instance;
      console.log("Client is ready for sending messages");
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  }

  async sendMessage(to: string, message: string): Promise<void> {
    await this.clientReady;

    if (!this.client) {
      throw new Error("Client not initialized");
    }

    this.client.sendText(to + "@c.us", message);

    return Promise.resolve();
  }

  generateQRCode(base64: string): void {
    const qrCode = base64.replace("data:image/png;base64,", "");
    const qrCodePath = "temp/qrCode.png";

    fs.writeFileSync(qrCodePath, qrCode, "base64");
  }
}
