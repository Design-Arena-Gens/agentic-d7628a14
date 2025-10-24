'use client';

import { FormEvent, useState } from 'react';
import type { GeneratePostPayload } from '../app/actions';
import type { GenerationOptions, Niche, Tone } from '../lib/generator';
import InputField from './input-field';
import SelectField from './select-field';
import { Button } from './button';

interface PostFormProps {
  onGenerate: (payload: GeneratePostPayload) => void;
  isGenerating: boolean;
}

const niches: Niche[] = ['Home Decor', 'Beauty', 'Wellness', 'Digital Products', 'Fashion', 'Fitness'];
const tones: Tone[] = ['Friendly', 'Educational', 'Bold', 'Luxurious'];
const emotions: Array<NonNullable<GenerationOptions['targetEmotion']>> = [
  'Inspiration',
  'Urgency',
  'Curiosity',
  'Trust'
];

const defaultValues = {
  niche: 'Digital Products' as Niche,
  tone: 'Educational' as Tone,
  productName: 'Canva Carousel Template Kit',
  affiliateUrl: 'https://your-affiliate-link.com',
  customAngle: 'batchable Pinterest workflow',
  targetEmotion: 'Curiosity' as NonNullable<GenerationOptions['targetEmotion']>
};

export default function PostForm({ onGenerate, isGenerating }: PostFormProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload: GeneratePostPayload = {
      niche: formData.get('niche') as Niche,
      tone: formData.get('tone') as Tone,
      productName: String(formData.get('productName') || '').trim(),
      affiliateUrl: String(formData.get('affiliateUrl') || '').trim(),
      customAngle: String(formData.get('customAngle') || '').trim() || undefined,
      targetEmotion: formData.get('targetEmotion')
        ? (formData.get('targetEmotion') as FormDataEntryValue as GenerationOptions['targetEmotion'])
        : undefined
    };

    if (!payload.productName) {
      setError('Please provide a product name to showcase.');
      return;
    }

    setError(null);
    onGenerate(payload);
  };

  return (
    <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <SelectField label="Niche" id="niche" name="niche" defaultValue={defaultValues.niche}>
          {niches.map((niche) => (
            <option key={niche} value={niche}>
              {niche}
            </option>
          ))}
        </SelectField>

        <SelectField label="Voice & Tone" id="tone" name="tone" defaultValue={defaultValues.tone}>
          {tones.map((tone) => (
            <option key={tone} value={tone}>
              {tone}
            </option>
          ))}
        </SelectField>

        <InputField
          label="Affiliate Product"
          id="productName"
          name="productName"
          defaultValue={defaultValues.productName}
          placeholder="What are you promoting?"
          required
        />

        <InputField
          label="Affiliate URL"
          id="affiliateUrl"
          name="affiliateUrl"
          defaultValue={defaultValues.affiliateUrl}
          type="url"
          placeholder="https://"
        />

        <InputField
          label="Strategy Angle"
          id="customAngle"
          name="customAngle"
          defaultValue={defaultValues.customAngle}
          placeholder="e.g. evergreen Pinterest traffic system"
          hint="Optional: sets the narrative for the hook and description"
        />

        <SelectField
          label="Emotional Cue"
          id="targetEmotion"
          name="targetEmotion"
          defaultValue={defaultValues.targetEmotion}
        >
          <option value="">None</option>
          {emotions.map((emotion) => (
            <option key={emotion} value={emotion}>
              {emotion}
            </option>
          ))}
        </SelectField>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate Post'}
        </Button>
        <p className="text-xs text-slate-500">
          Generates a fresh post based on today&apos;s date to keep your Pinterest queue consistent.
        </p>
      </div>
    </form>
  );
}
