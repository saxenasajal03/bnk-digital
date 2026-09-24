import React from 'react';
import { motion } from 'framer-motion';
import { Users, Crown, Sparkles, Video, TrendingUp, ShieldCheck } from 'lucide-react';
import { playFuturisticClick } from '../utils/sound';
import { getAssetPath } from '../utils/assets';

interface TeamMember {
  name: string;
  role: string;
  department: string;
  image: string;
  neonBorder: string;
  tag: string;
}

export const LeadershipSection: React.FC = () => {
  // 1. Leadership (4 Leaders)
  const leadership: TeamMember[] = [
    {
      name: 'Sparsh Sinha',
      role: 'Director & Chairman',
      department: 'Visionary Strategy & Agency Governance',
      image: getAssetPath('assets/team/sparsh_sinha.jpg'),
      neonBorder: 'border-pink-500 shadow-[0_0_25px_rgba(255,0,128,0.45)]',
      tag: 'Director & Chairman',
    },
    {
      name: 'Sajal Saxena',
      role: 'Chief Management Head',
      department: 'Executive Operations & High-ROAS Growth',
      image: getAssetPath('assets/team/sajal_saxena.jpg'),
      neonBorder: 'border-cyan-400 shadow-[0_0_25px_rgba(0,242,254,0.45)]',
      tag: 'Chief Management Head',
    },
    {
      name: 'Aakash Kaushik',
      role: 'Chief Advisor',
      department: 'Strategic Counsel & Macro Narrative',
      image: getAssetPath('assets/team/aakash_kaushik.jpg'),
      neonBorder: 'border-amber-400 shadow-[0_0_25px_rgba(245,166,35,0.45)]',
      tag: 'Chief Advisor',
    },
    {
      name: 'Kshitiz Narayan',
      role: 'Talent Acquisition Head',
      department: 'Human Capital & Creative Talent Curation',
      image: getAssetPath('assets/team/kshitiz_narayan.jpg'),
      neonBorder: 'border-cyan-400 shadow-[0_0_25px_rgba(0,242,254,0.45)]',
      tag: 'Talent Acquisition Head',
    },
  ];

  // 2. Core Team (3 Members)
  const coreTeam: TeamMember[] = [
    {
      name: 'Antra Thakur',
      role: 'Digital Marketing Intern',
      department: 'Growth Campaigns, Social Reach & Audience Engagement',
      image: getAssetPath('assets/team/antra_thakur.jpg'),
      neonBorder: 'border-cyan-400 shadow-[0_0_25px_rgba(0,242,254,0.45)]',
      tag: 'Digital Marketing Intern',
    },
    {
      name: 'Kavyansh Daksh',
      role: 'Video Editing Intern',
      department: 'Viral Reels, Shorts, Motion Graphics & Visual Pacing',
      image: getAssetPath('assets/team/kavyansh_daksh.jpg'),
      neonBorder: 'border-pink-500 shadow-[0_0_25px_rgba(255,0,128,0.45)]',
      tag: 'Video Editing Intern',
    },
    {
      name: 'Tista Maity',
      role: 'Video Editing Intern',
      department: 'Dynamic Sound Design, Color Grading & Cinema Cuts',
      image: getAssetPath('assets/team/tista_maity.jpg'),
      neonBorder: 'border-amber-400 shadow-[0_0_25px_rgba(245,166,35,0.45)]',
      tag: 'Video Editing Intern',
    },
  ];

  // All 7 members for "Our Digital Family"
  const allMembers = [
    ...leadership,
    ...coreTeam,
  ];

  return (
    <section id="leadership" className="relative py-24 sm:py-32 bg-[#05070f] overflow-hidden">
      {/* Background ambient radial lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================================== */}
        {/* SECTION 1: LEADERSHIP TEAM */}
        {/* ============================================================== */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Crown className="w-3.5 h-3.5" />
            <span>Executive Command</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Meet Our Leadership Team
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Visionary leaders steering digital transformation and ethical growth from Lucknow to global horizons.
          </p>
        </div>

        {/* 4 Leadership Cards in a single responsive row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-24">
          {leadership.map((leader) => (
            <motion.div
              key={leader.name}
              whileHover={{ y: -8 }}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Portrait Frame with glowing border */}
              <div className={`relative w-full aspect-[4/5] rounded-3xl overflow-hidden border-2 ${leader.neonBorder} bg-slate-900 mb-4 transition-all duration-300 group-hover:scale-105`}>
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top filter brightness-95 group-hover:brightness-105 transition-all duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                {/* Badge Tag */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block px-2.5 py-1 rounded-xl text-[10px] font-bold bg-black/75 backdrop-blur-md text-white border border-white/20">
                    {leader.tag}
                  </span>
                </div>
              </div>

              {/* Name & Role */}
              <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-cyan-400 transition-colors">
                {leader.name}
              </h3>
              <p className="text-xs text-cyan-300 font-semibold mt-0.5">
                {leader.role}
              </p>
              <p className="text-[11px] text-slate-500 mt-1 leading-tight px-1">
                {leader.department}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ============================================================== */}
        {/* SECTION 2: CORE TEAM */}
        {/* ============================================================== */}
        <div className="text-center mb-14 pt-8 border-t border-white/10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Creative Execution Foundry</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Core Team
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            High-energy specialists delivering daily creative impact, short-form viral cuts, and targeted marketing campaigns.
          </p>
        </div>

        {/* 3 Core Team Cards in a responsive row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto mb-24">
          {coreTeam.map((member) => (
            <motion.div
              key={member.name}
              whileHover={{ y: -8 }}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Portrait Frame with glowing border */}
              <div className={`relative w-full aspect-[4/5] rounded-3xl overflow-hidden border-2 ${member.neonBorder} bg-slate-900 mb-4 transition-all duration-300 group-hover:scale-105`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top filter brightness-95 group-hover:brightness-105 transition-all duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                {/* Badge Tag */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block px-2.5 py-1 rounded-xl text-[10px] font-bold bg-black/75 backdrop-blur-md text-white border border-white/20">
                    {member.tag}
                  </span>
                </div>
              </div>

              {/* Name & Role */}
              <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-pink-400 transition-colors">
                {member.name}
              </h3>
              <p className="text-xs text-pink-300 font-semibold mt-0.5">
                {member.role}
              </p>
              <p className="text-[11px] text-slate-500 mt-1 leading-tight px-1">
                {member.department}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ============================================================== */}
        {/* SECTION 3: OUR DIGITAL FAMILY */}
        {/* ============================================================== */}
        <div className="text-center pt-8 border-t border-white/10">
          <div className="inline-flex items-center space-x-1.5 text-xs text-amber-300 font-devanagari mb-2">
            <span>ੴ || जय बाबा नीब करोरी ||</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-8">
            Our Digital Family
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
            {allMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-cyan-400 via-purple-600 to-pink-500 mb-2 group-hover:shadow-neon-cyan transition-all duration-300 group-hover:scale-110">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover object-top bg-slate-900"
                  />
                </div>
                <span className="font-heading font-bold text-xs sm:text-sm text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {member.name}
                </span>
                <span className="text-[10px] text-slate-400 max-w-[120px] truncate">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
