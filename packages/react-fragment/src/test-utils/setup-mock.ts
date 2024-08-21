/**
 * NodeJS v22 throws the following error when running test that uses BroadcastChannel. This mock is to avoid the error.
 *
 * Serialized Error: { code: 'ERR_INVALID_ARG_TYPE' }
 * This error originated in "src/App.spec.tsx" test file. It doesn't mean the error was thrown inside the file itself, but while it was running.
 * The latest test that might've caused the error is "src/App.spec.tsx". It might mean one of the following:
 * - The error was thrown, while Vitest was running this test.
 * - If the error occurred after the test had been completed, this was the last documented test before it was thrown.
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */
import MockBroadcastChannel from "./mock-broadcast-channel";
// @ts-ignore
window.BroadcastChannel = MockBroadcastChannel;
