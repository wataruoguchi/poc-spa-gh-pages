/* eslint-disable @typescript-eslint/ban-ts-comment */
import MockBroadcastChannel from "./mock-broadcast-channel";
// @ts-ignore
window.BroadcastChannel = MockBroadcastChannel;
