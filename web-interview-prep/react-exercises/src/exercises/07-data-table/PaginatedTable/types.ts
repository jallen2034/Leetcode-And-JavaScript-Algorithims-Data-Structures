import type {ServiceHealthRow} from "../../../lib/telemetryData.ts";

export interface TableCol { key: keyof ServiceHealthRow; label: string }