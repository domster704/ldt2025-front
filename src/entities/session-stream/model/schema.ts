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
  current_status: z.string().nullable(),
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

  savelyeva_score: z.number().nullable(),
  savelyeva_category: z.string().nullable(),
  fischer_score: z.number().nullable(),
  fischer_category: z.string().nullable(),
  accelerations_count: z.number(),
  decelerations_count: z.number(),
});

export const StreamPointsSchema = z.object({
  bpm: z.number(),
  uc: z.number(),
  timestamp: z.number(),
})

export const StreamDataSchema = z.object({
  points: z.array(StreamPointsSchema),
  process: ProcessInfoSchema,
});
