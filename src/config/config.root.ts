import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';

const ConfigSchema = z.object({
  DATABASE_URL: z.string(),
  ENVIRONMENT: z.string(),
  BRANCH_NAME: z.string(),
  PORT: z.string().transform((val) => Number.parseInt(val, 10)),
});

export type ConfigType = z.infer<typeof ConfigSchema>;

export const ConfigRoot = ConfigModule.forRoot({
  isGlobal: true,
  validate: (config: Record<string, unknown>) => {
    ConfigSchema.parse(config);
    return config;
  },
});
