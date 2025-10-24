import PostAgent from '../components/post-agent';

function Hero() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
        Pinterest Affiliate Daily Agent
      </span>
      <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">
        Daily Pinterest copy that sells without sounding salesy
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Generate keyword-rich hooks, pin descriptions, CTAs, and idea pin scripts tuned for Pinterest affiliate marketing. Save your post, pin it, and keep your board active in minutes.
      </p>
    </div>
  );
}

function FeatureHighlights() {
  const features = [
    {
      title: 'Daily cadence',
      description: 'Each generation is date-stamped so you can batch schedule content that feels timely.'
    },
    {
      title: 'Hypnotic copy formulas',
      description: 'Hook, description, CTA, keywords, hashtags, and scripts curated for Pinterest behaviour.'
    },
    {
      title: 'Affiliate-ready',
      description: 'Soft-sell cues that drive clicks to your affiliate links without sounding pushy.'
    }
  ];

  return (
    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-3">
      {features.map((feature) => (
        <div key={feature.title} className="space-y-1">
          <h3 className="text-sm font-semibold text-slate-800">{feature.title}</h3>
          <p className="text-sm text-slate-500">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <main className="bg-gradient-to-b from-white to-slate-100 pb-24 pt-16">
      <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
        <Hero />
        <FeatureHighlights />
        <PostAgent />
      </div>
    </main>
  );
}
