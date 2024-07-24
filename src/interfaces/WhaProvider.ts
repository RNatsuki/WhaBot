
export interface WhaProvider {
    sendMessage(to: string, message: string): Promise<void>;
}
