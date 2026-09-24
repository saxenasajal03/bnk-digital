import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, MessageCircle } from 'lucide-react';
import { playFuturisticClick, playSpiritualChime } from '../utils/sound';
import { getAssetPath } from '../utils/assets';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  action?: {
    type: 'whatsapp' | 'call' | 'services';
    label: string;
    url?: string;
  };
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Namaste! 🙏 Welcome to BNK Digital (Baba Neeb Karori Digital Media Agency). How can I assist your brand growth today?',
      time: 'Just now',
    },
  ]);

  const quickQuestions = [
    'What are the 8 services?',
    'Who is the team?',
    'Baba Neeb Karori inspiration',
    'Get Pricing & Free Audit',
    'Connect on WhatsApp',
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const generateBotReply = (query: string): { text: string; action?: Message['action'] } => {
    const q = query.toLowerCase();

    if (q.includes('service') || q.includes('8') || q.includes('what do you do')) {
      return {
        text: 'BNK Digital provides 8 Powerhouse Services:\n1. Social Media Management\n2. Graphic Designing\n3. Reel & Video Editing (4K Vertical)\n4. Content Writing & Copy\n5. Meta Ads & ROI Digital Promotion\n6. Political Digital Management\n7. Voice-Over & Audio Narration\n8. Digital Invitation & Card Design',
        action: {
          type: 'services',
          label: 'Explore Services Section',
        },
      };
    }

    if (q.includes('team') || q.includes('leadership') || q.includes('head') || q.includes('sparsh') || q.includes('sajal') || q.includes('aakash') || q.includes('kshitiz') || q.includes('antra') || q.includes('kavyansh') || q.includes('tista')) {
      return {
        text: '👑 Leadership:\n1. Sparsh Sinha — Director & Chairman\n2. Sajal Saxena — Chief Management Head\n3. Aakash Kaushik — Chief Advisor\n4. Kshitiz Narayan — Talent Acquisition Head\n\n✨ Core Team:\n1. Antra Thakur — Digital Marketing Intern\n2. Kavyansh Daksh — Video Editing Intern\n3. Tista Maity — Video Editing Intern',
      };
    }

    if (q.includes('baba') || q.includes('neeb karori') || q.includes('kainchi') || q.includes('spiritual')) {
      return {
        text: '॥ जय बाबा नीब करोरी ॥\nBNK Digital is dedicated with reverence to Baba Neeb Karori & Kainchi Dham. We operate under sacred principles: "Love all, serve all, tell the truth." That means zero fake bot traffic, total ethical transparency, and treating your brand vision as a sacred trust.',
      };
    }

    if (q.includes('price') || q.includes('cost') || q.includes('audit') || q.includes('package')) {
      return {
        text: 'Our monthly service retainers range from ₹15,000 for boutique creative bundles up to full-scale enterprise & election management. We provide a 100% Free Digital Strategy & Content Audit!',
        action: {
          type: 'whatsapp',
          label: 'Request Free Audit on WhatsApp',
          url: 'https://wa.me/917235836153?text=Hello%20BNK%20Digital,%20I%20want%20to%20request%20a%20Free%20Digital%20Strategy%20Audit.',
        },
      };
    }

    if (q.includes('contact') || q.includes('whatsapp') || q.includes('call') || q.includes('phone') || q.includes('email') || q.includes('lucknow')) {
      return {
        text: 'You can reach our Lucknow Headquarters directly:\n📞 Phone: +91 072358 36153\n✉️ Email: hello.bnkdigital@gmail.com\n📍 Address: Lucknow, India, 226010',
        action: {
          type: 'whatsapp',
          label: 'Instant WhatsApp Chat',
          url: 'https://wa.me/917235836153?text=Hello%20BNK%20Digital,%20I%20would%20like%20to%20connect%20with%20your%20team.',
        },
      };
    }

    return {
      text: `Thank you for asking about "${query}". Our strategy team in Lucknow is ready to craft a tailored growth plan for you. Would you like to chat directly on WhatsApp or book a phone call?`,
      action: {
        type: 'whatsapp',
        label: 'Chat on WhatsApp with Campaign Manager',
        url: `https://wa.me/917235836153?text=${encodeURIComponent('Hello BNK Digital, I asked: ' + query)}`,
      },
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    playFuturisticClick();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: 'Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      playSpiritualChime();
      const botResponse = generateBotReply(query);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse.text,
        time: 'Now',
        action: botResponse.action,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Assistant Trigger Button in Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            playFuturisticClick();
            setIsOpen(!isOpen);
          }}
          className="relative group flex items-center space-x-2.5 p-3 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white shadow-neon-cyan hover:shadow-neon-magenta hover:scale-105 active:scale-95 transition-all duration-300"
          title="Open BNK Digital AI Assistant"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black" />
          </div>
          <span className="hidden sm:inline font-heading font-bold text-xs tracking-wide">
            BNK Assistant
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/40 text-amber-300 font-devanagari">
            ॐ
          </span>
        </button>
      </div>

      {/* Expandable Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[520px] max-h-[85vh] rounded-3xl bg-[#090d1c] border-2 border-cyan-400/80 shadow-[0_0_35px_rgba(0,242,254,0.3)] flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#0c1022] to-slate-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-cyan-400 to-pink-500 shadow-neon-cyan">
                  <img
                    src={getAssetPath('assets/bnk_emblem.png')}
                    alt="BNK Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-heading font-bold text-sm text-white">
                      BNK Assistant
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <span className="text-[10px] text-cyan-400">
                    Online • Lucknow HQ Ready
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sacred Banner Line */}
            <div className="px-4 py-1.5 bg-amber-500/10 border-b border-amber-500/20 text-center text-[10px] text-amber-300 font-devanagari">
              ॥ जय बाबा नीब करोरी ॥ • सोच डिजिटल... काम दमदार!
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tr-none shadow-md'
                        : 'bg-[#11172e] text-slate-200 border border-white/10 rounded-tl-none shadow-sm'
                    }`}
                  >
                    {msg.text}

                    {/* Action button if attached */}
                    {msg.action && (
                      <div className="mt-3 pt-2 border-t border-white/10">
                        {msg.action.url ? (
                          <a
                            href={msg.action.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playFuturisticClick()}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[11px] transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{msg.action.label}</span>
                          </a>
                        ) : (
                          <a
                            href="#services"
                            onClick={() => {
                              playFuturisticClick();
                              setIsOpen(false);
                            }}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-400 text-black font-bold text-[11px]"
                          >
                            <span>{msg.action.label}</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-1 p-3 rounded-2xl bg-[#11172e] max-w-[70px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Chips */}
            <div className="p-2 border-t border-white/5 bg-[#070a14] overflow-x-auto flex space-x-1.5 no-scrollbar">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-400/50 whitespace-nowrap transition-all"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#0c1022] border-t border-white/10 flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder="Ask about services, team, or audit..."
                className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={() => handleSendMessage()}
                className="p-2 rounded-xl bg-gradient-to-r from-cyan-400 to-pink-500 text-white shadow-neon-cyan hover:scale-105 active:scale-95 transition-all"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
