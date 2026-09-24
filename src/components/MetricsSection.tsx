import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BarChart3, 
  Award, 
  Users, 
  Star, 
  ArrowUpRight, 
  CheckCircle,
  Quote
} from 'lucide-react';
import { playFuturisticClick } from '../utils/sound';

export const MetricsSection: React.FC = () => {
  const [activeCaseTab, setActiveCaseTab] = useState(0);

  const caseStudies = [
    {
      title: 'Political Digital Narrative Campaign',
      category: 'Political Digital Management',
      metric: '+4.2M Reach',
      period: '90-Day Campaign Window',
      summary:
        'Engineered an aggressive, high-resonance regional narrative strategy across Uttar Pradesh. Produced 120+ viral reels, counter-misinformation units, and daily constituency sentiment analytics.',
      highlights: [
        '180,000+ New Organic Followers',
        '38% Increase in Positive Public Sentiment',
        'Average 45,000 Views per Daily Reel',
      ],
      tag: 'Political Dominance',
    },
    {
      title: 'High-ROAS Meta Ads for D2C Brand',
      category: 'Meta Ads & Digital Promotion',
      metric: '5.8x ROAS',
      period: '6-Month Scaling Phase',
      summary:
        'Restructured lead generation and retargeting funnels on Instagram & Facebook Ads Manager. Implemented dynamic creative testing and high-converting landing page copywriting.',
      highlights: [
        '340% Boost in Monthly Net Revenue',
        'Customer Acquisition Cost (CAC) Slashed by 42%',
        '8,400+ Verified Direct Buyer Leads',
      ],
      tag: 'Performance Marketing',
    },
    {
      title: 'Rebrand & 4K Cinema Reels Transformation',
      category: 'Graphic Design & Video Editing',
      metric: '12M+ Impressions',
      period: 'Annual Growth Retainer',
      summary:
        'Revamped brand identity from ground up with cyber-spiritual luxury aesthetic, cinematic color-graded reels, sound design, and viral short-form hooks.',
      highlights: [
        'Over 14 Reels crossed 500k+ organic views',
        'Engagement rate rose from 1.2% to 6.8%',
        'Featured in prominent regional media outlets',
      ],
      tag: 'Brand Transformation',
    },
  ];

  return (
    <section id="impact" className="relative py-24 sm:py-32 bg-bnk-darker overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-bnk-cyan/10 via-purple-700/10 to-bnk-magenta/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Proven Tangible Outcomes</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Numbers That Speak. <span className="text-gradient-cyan-magenta">Growth That Lasts.</span>
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            We measure success not by vanity clicks, but by market dominance, real revenue growth, and lasting audience trust.
          </p>
        </div>

        {/* Case Studies Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Column: Selectable Case Studies Tabs */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {caseStudies.map((item, idx) => (
              <div
                key={item.title}
                onClick={() => {
                  playFuturisticClick();
                  setActiveCaseTab(idx);
                }}
                className={`cursor-pointer p-5 rounded-2xl transition-all duration-300 border text-left ${
                  activeCaseTab === idx
                    ? 'glass-panel border-bnk-cyan/50 bg-slate-900/90 shadow-neon-cyan'
                    : 'glass-panel border-white/10 hover:border-slate-700 bg-bnk-dark/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-bnk-magenta uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {item.metric}
                  </span>
                </div>
                <h3 className="font-heading text-base font-bold text-white mb-1">
                  {item.title}
                </h3>
                <span className="text-xs text-slate-400">
                  {item.period}
                </span>
              </div>
            ))}
          </div>

          {/* Right Column: Case Study Deep Dive */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeCaseTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/15 bg-gradient-to-br from-slate-900/90 via-bnk-dark to-slate-950 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-bnk-cyan/15 border border-bnk-cyan/40 text-bnk-cyan text-xs font-bold">
                  {caseStudies[activeCaseTab].tag}
                </span>
                <span className="font-heading font-black text-2xl sm:text-3xl text-gradient-gold">
                  {caseStudies[activeCaseTab].metric}
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                {caseStudies[activeCaseTab].title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {caseStudies[activeCaseTab].summary}
              </p>

              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Key Milestones Achieved</span>
                </h4>
                <div className="space-y-2">
                  {caseStudies[activeCaseTab].highlights.map((point, i) => (
                    <div key={i} className="flex items-center space-x-2.5 text-xs sm:text-sm text-slate-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-bnk-cyan" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                onClick={() => playFuturisticClick()}
                className="inline-flex items-center space-x-2 text-xs font-bold text-bnk-cyan hover:text-white transition-colors"
              >
                <span>Replicate These Results For Your Brand</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Client Praise & Testimonial Quote */}
        <div className="rounded-2xl border border-white/10 p-8 glass-panel flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900/50">
          <div className="flex items-start space-x-4">
            <Quote className="w-8 h-8 text-bnk-magenta shrink-0 opacity-80" />
            <div>
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
                <span className="text-xs text-amber-300 font-bold ml-2">5.0 / 5.0 Rating</span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed">
                "BNK Digital didn't just run ads; they understood the sacred spirit and grassroots voice of our organization. Their political strategy and video speed in Lucknow are unmatched."
              </p>
              <div className="mt-2 text-xs text-slate-400 font-semibold">
                — Senior Campaign Strategist, Uttar Pradesh
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-devanagari">
              बाबा की कृपा से निरंतर प्रगति
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
