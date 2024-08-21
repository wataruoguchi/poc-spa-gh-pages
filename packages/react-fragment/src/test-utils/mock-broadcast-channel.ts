type MessageListener = (event: { data: unknown }) => void;

export default class MockBroadcastChannel {
  private static channels: Map<string, MockBroadcastChannel[]> = new Map();

  name: string;
  onmessage: MessageListener | null = null;

  constructor(name: string) {
    this.name = name;

    if (!MockBroadcastChannel.channels.has(name)) {
      MockBroadcastChannel.channels.set(name, []);
    }
    MockBroadcastChannel.channels.get(name)!.push(this);
  }

  addEventListener(_event: "message", listener: MessageListener) {
    this.onmessage = listener;
  }

  removeEventListener() {
    this.onmessage = null;
  }

  postMessage(message: unknown) {
    const listeners = MockBroadcastChannel.channels.get(this.name) || [];
    listeners.forEach((channel) => {
      if (channel !== this && channel.onmessage) {
        channel.onmessage({ data: message });
      }
    });
  }

  close() {
    const channelList = MockBroadcastChannel.channels.get(this.name);
    if (channelList) {
      MockBroadcastChannel.channels.set(
        this.name,
        channelList.filter((channel) => channel !== this),
      );
    }
  }
}
