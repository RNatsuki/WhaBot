import { EventEmitter } from "node:events";

export abstract class ProviderClass extends EventEmitter {
  constructor() {
    super();
    this.on('ready', () => console.log("Client is ready"));
  }
}
