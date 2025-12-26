import React, { useState, useEffect, useRef } from 'react';
import { Zap, MapPin, Lock, Unlock, Music, ChevronDown, Disc, Sparkles, Radio, Activity, X, Volume2, VolumeX, Cpu, ListMusic } from 'lucide-react';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  // REMOVED: const [showQR, setShowQR] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // --- CONFIGURATION ---
  const currentBalance = "$300";
  const songUrl = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=trap-future-bass-royalty-free-music-11428.mp3"; 

  const logos = {
    mainLogo: "", 
    secondaryLogo: "" 
  };

  const concertDate = new Date("2026-03-31T20:00:00").getTime();
  
  const apiKey = ""; 

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = concertDate - now;
      if (distance < 0) clearInterval(interval);
      else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, []);

  const handlePressDetails = () => {
    setShowModal(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.4; 
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Audio play failed:", err));
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex flex-col items-center justify-center font-mono p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#2D004D] opacity-20 animate-pulse"></div>
        <div className="relative z-10 flex flex-col items-center">
          {logos.secondaryLogo ? (
            <img src={logos.secondaryLogo} alt="Loading" className="w-24 h-24 object-contain animate-pulse mb-6" />
          ) : (
            <div className="w-20 h-20 border-t-4 border-l-4 border-[#39FF14] border-transparent rounded-full animate-spin mb-8 shadow-[0_0_20px_#39FF14]"></div>
          )}
          <h2 className="text-xl font-black italic tracking-widest text-white uppercase mb-2">
            STARTING ENGINE<span className="animate-pulse">...</span>
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#39FF14] selection:text-black overflow-x-hidden relative">
      
      {/* Background Audio Element */}
      <audio ref={audioRef} src={songUrl} loop />

      {/* NEW MODAL: Popup Text Box */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-[#1a1a1a] border-2 border-[#39FF14] p-6 rounded-xl max-w-md w-full relative shadow-[0_0_50px_rgba(57,255,20,0.2)] text-center transform transition-all scale-100 flex flex-col max-h-[90vh]">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-[#39FF14] transition-colors z-50"
              >
                <X size={24} />
              </button>
              
              <div className="mb-4 flex justify-center shrink-0">
                <div className="p-3 bg-[#2D004D] rounded-full border border-[#39FF14]">
                   <Activity size={24} className="text-[#39FF14]" />
                </div>
              </div>

              <h3 className="text-2xl font-black italic text-white mb-4 uppercase tracking-tighter shrink-0">
                INCOMING TRANSMISSION
              </h3>
              
              {/* Scrollable Message Area */}
              <div className="bg-black/50 border border-gray-800 p-4 rounded-lg mb-4 text-left overflow-y-auto custom-scrollbar grow">
                <p className="font-mono text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  Dear Taylor,<br/><br/>
                  Merry Christmas!! I had an amazing time celebrating Christmas with you and your family this year! :)<br/><br/>
                  My gift to you is two tickets to Don Toliver's next concert in Dallas! I know it's not something you can "use" right away, but I figured I would start adding money to a "Don Toliver" fund every paycheck and then once he announces the tour dates, I can just go get tickets right away! I'll update the fund balance on here every time I put more money in it hehe.<br/><br/>
                  I love you so much honey and this was the best Christmas I've had in a long time. You make me the happiest guy in the world, and I look forward to creating so many more memories with you :)
                </p>
              </div>

              {/* Balance Box */}
              <div className="bg-[#2D004D] border-2 border-[#39FF14] p-3 rounded mb-4 w-full shadow-[0_0_15px_rgba(57,255,20,0.3)] shrink-0">
                 <p className="text-[#39FF14] font-black italic text-xl tracking-widest uppercase">
                    BALANCE: {currentBalance}
                 </p>
              </div>

              <button 
                onClick={() => setShowModal(false)}
                className="text-xs text-gray-500 hover:text-white underline decoration-dashed underline-offset-4 shrink-0 pb-2"
              >
                BACK TO HOMEPAGE
              </button>
           </div>
        </div>
      )}

      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
         <svg className="w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="none">
            <defs>
               <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                  <feGaussianBlur stdDeviation="20" result="coloredBlurLarge" />
                  <feMerge>
                     <feMergeNode in="coloredBlurLarge" />
                     <feMergeNode in="coloredBlur" />
                     <feMergeNode in="SourceGraphic" />
                  </feMerge>
               </filter>
               <filter id="texture">
                  <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
                  <feColorMatrix type="saturate" values="0" />
               </filter>
            </defs>

            <rect width="100%" height="100%" opacity="0.03" filter="url(#texture)" />

            {/* Green Stream */}
            <path d="M -300 300 Q 600 -100 1200 400 T 2300 200" stroke="#39FF14" strokeWidth="80" fill="none" opacity="0.1" filter="url(#neonGlow)" />
            <path d="M -300 300 Q 600 -100 1200 400 T 2300 200" stroke="#39FF14" strokeWidth="20" fill="none" opacity="0.4" filter="url(#neonGlow)" />
            <path d="M -300 300 Q 600 -100 1200 400 T 2300 200" stroke="#FFFFFF" strokeWidth="4" fill="none" opacity="0.9" />

             {/* Purple Stream */}
            <path d="M -300 800 Q 500 1100 1300 700 T 2300 900" stroke="#8A2BE2" strokeWidth="90" fill="none" opacity="0.1" filter="url(#neonGlow)" />
            <path d="M -300 800 Q 500 1100 1300 700 T 2300 900" stroke="#8A2BE2" strokeWidth="25" fill="none" opacity="0.4" filter="url(#neonGlow)" />
            <path d="M -300 800 Q 500 1100 1300 700 T 2300 900" stroke="#FFFFFF" strokeWidth="5" fill="none" opacity="0.9" />
            
            <path d="M 0 900 Q 800 1200 1500 600" stroke="#2D004D" strokeWidth="15" fill="none" opacity="0.3" filter="url(#neonGlow)" />

            <g fill="white" opacity="0.6">
               <circle cx="200" cy="300" r="2" fill="#39FF14" filter="url(#neonGlow)" />
               <circle cx="1500" cy="200" r="3" fill="#39FF14" filter="url(#neonGlow)" />
               <circle cx="1000" cy="800" r="2" fill="#8A2BE2" filter="url(#neonGlow)" />
               <circle cx="500" cy="900" r="4" fill="#8A2BE2" filter="url(#neonGlow)" />
               <circle cx="1800" cy="600" r="2" fill="#FFFFFF" filter="url(#neonGlow)" />
               <circle cx="100" cy="800" r="3" fill="#8A2BE2" filter="url(#neonGlow)" />
            </g>
         </svg>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 flex justify-between items-center border-b border-[#39FF14]/20 backdrop-blur-md sticky top-0 z-50 bg-[#0B0B0B]/80">
          <div className="w-8 h-8 flex items-center justify-center bg-[#2D004D] rounded border border-[#39FF14]/50">
             {logos.secondaryLogo ? <img src={logos.secondaryLogo} className="w-6 h-6 object-contain" /> : <Zap size={18} className="text-[#39FF14]" />}
          </div>
          
          {/* Cleared Header Right Side */}
          <div></div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center p-6 text-center space-y-8 relative max-w-lg mx-auto w-full">
          
          {/* Main Logo */}
          <div className="w-full py-8 flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {logos.mainLogo ? (
              <img src={logos.mainLogo} alt="OCTANE" className="w-full max-w-[280px] drop-shadow-[0_0_15px_rgba(57,255,20,0.4)]" />
            ) : (
              <div className="relative p-4">
                 <h1 className="text-7xl md:text-8xl font-black italic uppercase tracking-tighter leading-none transform -skew-x-[15deg] select-none relative z-10">
                    <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-500 relative z-10 pb-2"
                          style={{ WebkitTextStroke: '2px #39FF14' }}>
                      OCTANE
                    </span>
                    <span className="absolute top-0 left-0 text-transparent -z-10"
                          style={{ 
                            WebkitTextStroke: '8px #2D004D',
                            textShadow: '4px 4px 0 #2D004D, 8px 8px 0 rgba(45,0,77,0.5)'
                          }}>
                      OCTANE
                    </span>
                 </h1>
                 <div className="absolute top-[60%] -left-8 w-20 h-1 bg-[#39FF14] skew-x-[-15deg] shadow-[0_0_10px_#39FF14]"></div>
                 <div className="absolute top-[60%] -right-8 w-20 h-1 bg-[#39FF14] skew-x-[-15deg] shadow-[0_0_10px_#39FF14]"></div>
                 <div className="absolute -right-2 -bottom-4 rotate-[-6deg] bg-[#39FF14] text-black text-[10px] font-black italic px-3 py-0.5 border-2 border-white shadow-[4px_4px_0px_#2D004D] z-20">
                    TOUR 2026
                 </div>
              </div>
            )}
          </div>

          {/* Special Access Badge */}
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
             <div className="inline-block border border-[#39FF14]/30 bg-[#2D004D]/20 backdrop-blur-md px-6 py-2 rounded skew-x-[-10deg] shadow-[0_0_20px_rgba(57,255,20,0.1)]">
                <span className="text-white font-black italic tracking-widest uppercase text-sm skew-x-[10deg] inline-block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                   TAYLOR KINNELL <span className="text-[#39FF14] mx-2">-</span> SPECIAL ACCESS
                </span>
             </div>
          </div>

          {/* Ticket / Pit Pass Card */}
          <div className="w-full bg-[#1a1a1a] border-2 border-[#2D004D] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(45,0,77,0.4)] relative group transform transition-transform hover:rotate-1">
            
            <div className="bg-[#39FF14] p-3 flex justify-between items-center text-black">
              <span className="font-black italic text-sm tracking-tighter uppercase">Official Entry</span>
              <span className="font-mono text-xs font-bold">#8291-TX</span>
            </div>
            
            <div className="p-6 relative">
               <div className="absolute top-0 right-10 w-8 h-full bg-[#2D004D]/20 skew-x-[-20deg]"></div>
               <div className="absolute top-0 right-4 w-2 h-full bg-[#39FF14]/20 skew-x-[-20deg]"></div>

               <div className="relative z-10 flex flex-col gap-4 text-left">
                  <div>
                     <p className="text-[#39FF14] text-[10px] uppercase font-bold tracking-widest mb-1">Event</p>
                     <p className="text-2xl font-black italic text-white leading-none">DON TOLIVER</p>
                     <p className="text-xl font-bold italic text-gray-400">OCTANE TOUR</p>
                  </div>
                  
                  <div className="flex justify-between items-end border-t border-gray-700 pt-4 mt-2">
                      <div>
                          <p className="text-[#39FF14] text-[10px] uppercase font-bold tracking-widest mb-1">Venue</p>
                          <p className="text-sm font-bold text-white uppercase max-w-[150px] leading-tight">American Airlines Center</p>
                      </div>
                      <div className="text-right">
                         <div className="inline-block bg-[#2D004D] border border-[#39FF14] px-3 py-1 rounded skew-x-[-10deg]">
                            <span className="text-lg font-black text-[#39FF14] skew-x-[10deg] inline-block flex items-center gap-2">
                              <span className="bg-[#39FF14] text-[#39FF14] opacity-50 blur-[3px] select-none rounded-sm">MAR</span>
                              <span>2026</span>
                            </span>
                         </div>
                      </div>
                  </div>
               </div>
            </div>
            
            <div className="bg-white p-2 flex justify-between items-center">
               <div className="h-6 w-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/5/5d/UPC-A-036000291452.svg')] bg-repeat-x bg-contain opacity-50 grayscale"></div>
            </div>
          </div>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-2 w-full">
             {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-black/50 border border-gray-800 p-2 rounded flex flex-col items-center backdrop-blur-sm">
                   <span className="text-2xl font-black text-white italic">{String(value).padStart(2, '0')}</span>
                   <span className="text-[9px] text-[#39FF14] font-bold uppercase tracking-wider">{unit}</span>
                </div>
             ))}
          </div>

          {/* Details Button */}
          <button 
            onClick={handlePressDetails}
            className="w-full group relative overflow-hidden rounded-lg"
          >
            <div className="absolute inset-0 bg-[#39FF14] translate-y-[102%] group-hover:translate-y-0 transition-transform duration-200"></div>
            <div className="bg-[#2D004D] border border-[#39FF14] p-4 relative z-10 flex items-center justify-center gap-3 transition-colors group-hover:bg-transparent">
              <Zap className="text-[#39FF14] group-hover:text-black transition-colors" size={20} fill="currentColor" />
              <span className="text-xl font-black italic uppercase tracking-widest text-white group-hover:text-black transition-colors">
                PRESS FOR MORE DETAILS
              </span>
            </div>
          </button>

        </main>

        {/* Footer */}
        <footer className="p-8 text-center relative z-10">
          <p className="text-gray-600 text-[9px] font-mono uppercase tracking-[0.3em]">
            © 2026 Cactus Jack
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;