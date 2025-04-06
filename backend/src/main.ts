import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createClient } from '@supabase/supabase-js';

console.log(
  'check env:',
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_SUPABASE_ANON_KEY,
);

export const supabaseClient = createClient(
  process.env.PUBLIC_SUPABASE_URL ?? '',
  process.env.PUBLIC_SUPABASE_ANON_KEY ?? '',
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Initialize Supabase client

  await app.listen(8082);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
