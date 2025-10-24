'use client';

import { useState, useTransition } from 'react';
import type { GeneratePostPayload } from '../app/actions';
import { createDailyPost } from '../app/actions';
import type { GeneratedPost } from '../lib/generator';
import PostForm from './post-form';
import PostOutput from './post-output';

export default function PostAgent() {
  const [post, setPost] = useState<GeneratedPost | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <PostForm
          isGenerating={isPending}
          onGenerate={(payload: GeneratePostPayload) => {
            setPost(null);
            startTransition(() => {
              createDailyPost(payload)
                .then((result) => {
                  setPost(result);
                })
                .catch((error) => {
                  console.error('Failed to generate post', error);
                });
            });
          }}
        />
      </div>
      <div className="lg:sticky lg:top-8">
        <PostOutput post={post} loading={isPending} />
      </div>
    </div>
  );
}
