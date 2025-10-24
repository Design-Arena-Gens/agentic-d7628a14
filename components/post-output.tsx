'use client';

import { ClipboardDocumentCheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import type { GeneratedPost } from '../lib/generator';
import { Button } from './button';

interface PostOutputProps {
  post: GeneratedPost | null;
  loading: boolean;
}

const renderCopyable = (label: string, content: string | string[]) => {
  const text = Array.isArray(content) ? content.join('\n') : content;
  return { label, text };
};

export default function PostOutput({ post, loading }: PostOutputProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (label: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied((prev) => (prev === label ? null : prev)), 2000);
  };

  if (!post) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-8 text-center text-sm text-slate-500">
        Daily post preview will appear here once you generate it.
      </div>
    );
  }

  const blocks = [
    renderCopyable('Headline', post.headline),
    renderCopyable('Pinterest Title', post.pinterestTitle),
    renderCopyable(
      'Post Sections',
      post.sections.map((section) => `${section.label}: ${section.content}`)
    ),
    renderCopyable('Keywords', post.keywords.join(', ')),
    renderCopyable('Hashtags', post.hashtags.join(' ')),
    renderCopyable('Pin Idea Script', post.pinIdeaScript.join('\n'))
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Daily Post · {post.publishDate}
            </p>
            <h2 className="text-xl font-semibold text-slate-900">{post.headline}</h2>
          </div>
          <div className="text-right text-sm text-slate-500">
            <p>Suggested Boards</p>
            <p className="font-medium text-slate-700">{post.boardIdeas.join(' · ')}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {blocks.map(({ label, text }) => (
          <div key={label} className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">{label}</h3>
              <Button
                type="button"
                variant="secondary"
                className="h-8 px-3 text-xs"
                onClick={() => handleCopy(label, text)}
                disabled={loading}
              >
                <span className="sr-only">Copy {label}</span>
                {copied === label ? (
                  <ClipboardDocumentCheckIcon className="h-4 w-4 text-emerald-500" />
                ) : (
                  <ClipboardIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
            <pre className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{text}</pre>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50/80 p-6 text-sm text-blue-900">
        <p className="font-semibold">Idea Pin Storyboard</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {post.pinIdeaScript.map((frame, index) => (
            <li key={index}>{frame}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
