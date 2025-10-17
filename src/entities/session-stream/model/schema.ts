import {z} from "zod";
import {NotificationColor} from "@shared/const/ctgColors";

export const NotificationColorSchema = z.enum(NotificationColor);
export const ProcessNotificationSchema = z.object({
  message: z.string(),
  color: NotificationColorSchema,
});
export const STVForecastSchema = z.object({
  stv_3m: z.number().nullable(),
  stv_5m: z.number().nullable(),
  stv_10m: z.number().nullable(),
});

export const ProcessInfoSchema = z.object({
  time_sec: z.number(),
  notifications: z.record(
    z.string(),
    z.array(ProcessNotificationSchema)
  ),
  figo_situation: z.string().nullable(),
  current_fhr: z.number().nullable(),
  current_uterus: z.number().nullable(),
  stv: z.number().nullable(),
  stv_forecast: STVForecastSchema.nullable(),
  median_fhr_10min: z.number().nullable(),
  hypoxia_proba: z.number().nullable(),
});

export const StreamDataSchema = z.object({
  bpm: z.number(),
  uc: z.number(),
  timestamp: z.number(),
  process: ProcessInfoSchema,
});

export type ProcessInfoParsed = z.infer<typeof ProcessInfoSchema>;
export type StreamDataParsed = z.infer<typeof StreamDataSchema>;