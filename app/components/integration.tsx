"use client";


import React from 'react';

const Integration = () => {
  return (
    <section className="relative bg-[#0a0a1f] py-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
          
          {/* Right Side - Icons Animation */}
          <div className="relative w-full md:w-1/2 h-[400px] flex items-center justify-center">
            

            {/* Shopify Icon - Top */}
            <div className="absolute top-30 left-1/2 -translate-x-1/2 animate-float">
              <div className="w-16 h-16 bg-[#1a1a3e] rounded-xl flex items-center justify-center shadow-xl border border-blue-500/20 hover:scale-110 transition-transform duration-300">
                <img src="/icons/shopify.svg" alt="Shopify" className="w-10 h-10" />
              </div>
              {/* Connection Line */}
              <svg className="absolute top-full left-1/2 -translate-x-1/2" width="2" height="80" style={{marginTop: '-16px'}}>
                <line x1="1" y1="0" x2="1" y2="80" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Salla Icon - Bottom Left */}
            <div className="absolute bottom-16 left-8 animate-float-delayed">
              <div className="w-16 h-16 bg-[#1a1a3e] rounded-xl flex items-center justify-center shadow-xl border border-blue-500/20 hover:scale-110 transition-transform duration-300">
                <img src="/icons/salla.svg" alt="Salla" className="w-10 h-10" />
              </div>
              {/* Connection Line */}
              <svg className="absolute bottom-full left-1/2 -translate-x-1/2" width="2" height="100" style={{marginBottom: '-16px'}}>
                <line x1="1" y1="0" x2="1" y2="100" stroke="url(#gradient2)" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
                <defs>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Code Icon - Bottom */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-float">
              <div className="w-16 h-16 bg-[#1a1a3e] rounded-xl flex items-center justify-center shadow-xl border border-blue-500/20 hover:scale-110 transition-transform duration-300">
                <img src="/icons/code.svg" alt="Code" className="w-10 h-10" />
              </div>
              {/* Connection Line */}
              <svg className="absolute bottom-full left-1/2 -translate-x-1/2" width="2" height="80" style={{marginBottom: '-16px'}}>
                <line x1="1" y1="0" x2="1" y2="80" stroke="url(#gradient3)" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
                <defs>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Zid Icon - Left */}
            <div className="absolute left-14 top-1/2 -translate-y-1/2 animate-float-delayed">
              <div className="w-16 h-16 bg-[#1a1a3e] rounded-xl flex items-center justify-center shadow-xl border border-blue-500/20 hover:scale-110 transition-transform duration-300">
                <img src="/icons/zid.svg" alt="Zid" className="w-10 h-10" />
              </div>
              {/* Connection Line */}
              <svg className="absolute left-full top-1/2 -translate-y-1/2" width="100" height="2" style={{marginLeft: '-16px'}}>
                <line x1="0" y1="1" x2="100" y2="1" stroke="url(#gradient4)" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
                <defs>
                  <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
            </div>
          </div>

          {/* Left Side - Text Content */}
          <div className="w-full text-right space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              ذكاء اصطناعي فوري لموقعك. لا حاجة للبرمجة
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              انسخ سطرًا واحدًا من الكود، والصقه في موقعك، وشاهد مساعدك الذكي يبدأ في خدمة عملائك على الفور. متوافق مع جميع المنصات
            </p>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes dash {
          to {
            stroke-dashoffset: -8;
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite 0.5s;
        }

        .animate-dash {
          animation: dash 1s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Integration;