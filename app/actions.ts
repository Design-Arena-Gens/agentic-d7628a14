'use server';

import { generatePost, type GeneratedPost, type GenerationOptions } from '../lib/generator';

export interface GeneratePostPayload extends Omit<GenerationOptions, 'date'> {}

export async function createDailyPost(payload: GeneratePostPayload): Promise<GeneratedPost> {
  const trimmed = payload.affiliateUrl.trim();
  const sanitizedPayload: GenerationOptions = {
    ...payload,
    affiliateUrl: trimmed,
    date: new Date()
  };

  return generatePost(sanitizedPayload);
}
