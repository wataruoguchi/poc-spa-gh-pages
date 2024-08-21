import { validator } from "@runnel/validator";
import deepEqual from "deep-equal";
import { runnel } from "runneljs";

const { registerTopic } = runnel("my-event-bus", deepEqual, validator);
export { registerTopic };
