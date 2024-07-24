import { WhaProvider } from "../interfaces/WhaProvider";

export class TestMessagingProvider implements WhaProvider {
  async sendMessage(to: string, message: string): Promise<void> {
    console.log(`Sending message to ${to}: ${message}`);
  }
}
