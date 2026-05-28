export interface Plugin {
  id: string;
  name?: string;
  onInit?: () => void | Promise<void>;
  onDestroy?: () => void | Promise<void>;
  interceptChat?: (
    context: { contactId: string; text: string; sender: 'user' | 'assistant' },
    next: (modifiedText: string) => void
  ) => void;
}

export interface ILLocalBackend {
  connect(): Promise<void>;
  sendMessage(message: string): Promise<string>;
  disconnect(): Promise<void>;
}
