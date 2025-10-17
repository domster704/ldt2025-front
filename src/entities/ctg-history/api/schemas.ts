import {z} from "zod";
export const CTGResultAPISchema = z.object({
  ctg_id: z.number(),
  gest_age: z.string(),
  bpm: z.number().nullable(),
  uc: z.number().nullable(),
  figo: z.string().nullable(),
  figo_prognosis: z.string().nullable(),
  bhr: z.number().nullable(),
  amplitude_oscillations: z.number().nullable(),
  oscillation_frequency: z.number().nullable(),
  ltv: z.number().nullable(),
  stv: z.number().nullable(),
  stv_little: z.number().nullable(),
  accelerations: z.number().nullable(),
  deceleration: z.number().nullable(),
  uterine_contractions: z.number().nullable(),
  fetal_movements: z.number().nullable(),
  fetal_movements_little: z.number().nullable(),
  accelerations_little: z.number().nullable(),
  deceleration_little: z.number().nullable(),
  high_variability: z.number().nullable(),
  low_variability: z.number().nullable(),
  loss_signals: z.number().nullable(),
  timestamp: z.string(),
});

export const CTGHistoryAPISchema = z.object({
  id: z.number().nullable(),
  dir_path: z.string(),
  archive_path: z.string().nullable(),
  result: CTGResultAPISchema.optional().nullable(),
});

export const CTGHistoryListSchema = z.array(CTGHistoryAPISchema);
export type CTGHistoryAPI = z.infer<typeof CTGHistoryAPISchema>;
export type CTGResultAPI = z.infer<typeof CTGResultAPISchema>;