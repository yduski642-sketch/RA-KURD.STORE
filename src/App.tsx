/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Home, 
  LayoutGrid, 
  Package, 
  Settings, 
  Search, 
  Bell, 
  User,
  ChevronRight,
  Download,
  FileDown,
  Info,
  Shield,
  Zap,
  Globe,
  Moon,
  Sun,
  Send,
  Check,
  Palette,
  X,
  Star,
  ExternalLink,
  History,
  Layout,
  ShieldAlert,
  Apple,
  Bot
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Constants ---
const LOGO_URL = "https://i.postimg.cc/PrwCMc4h/unnamed-17.jpg";

// --- Types ---
type Tab = "home" | "ios" | "apk" | "setting";
type Language = "en" | "ar" | "ku_ba" | "ku_so";

interface AppItem {
  id: string;
  name: string;
  category: string;
  size: string;
  version: string;
  description: string;
  updateLog: string;
  icon: string;
  banner: string;
  rating: number;
  downloads: string;
  author?: string;
  directLink?: string;
  ipaLink?: string;
  warning?: string;
  platform: 'ios' | 'android';
}

interface AppState {
  isDarkMode: boolean;
  language: Language;
  accentColor: string;
}

// --- Mock Data ---
const APPS: AppItem[] = [
  {
    id: "pool",
    name: "8 Ball Pool MOD",
    category: "Games",
    size: "110 MB",
    version: "v5.6.21",
    description: "The most professional 8 Ball Pool mod by RA KURD. Includes professional tools for better gameplay experience.",
    updateLog: "🎱 تایبەتمەندی:\n• Auto Play\n• Auto Aim\n• Ad Removal\n• Long Line\n\n🔑 Free Key Test: FLUORITE8BPFREE7",
    icon: "https://i.postimg.cc/bYSCq1kb/unnamed-(16).jpg",
    banner: "https://picsum.photos/seed/pool-banner/600/300",
    rating: 5.0,
    downloads: "250K+",
    author: "Yousif Duski",
    ipaLink: "https://github.com/yduski642-sketch/RA-KURD-IPA/releases/download/v8.0.1/8_Ball_Pool_RA_KURD_store___Yousif_Duski_56_21_1_1776526014.ipa",
    directLink: "https://loadly.io/yousifduski9",
    platform: 'ios'
  },
  {
    id: "pubg-skin",
    name: "PUBG MOBILE SKIN",
    category: "Games",
    size: "3.4 GB",
    version: "v3.1.0",
    description: "Experience PUBG Mobile with all skins unlocked and aim bot capabilities. A powerful modification for enthusiasts.",
    updateLog: "⚔️ تایبەتمەندی:\n✅ هەمی سکین | ✅ aim bot",
    warning: "⚠️ ئاگەداری: ئەم بەرپرس نینین ژ بەند بوونا ئەکاونتێ تە، بکارئینان ل سەر بەرپرسیارەتییا تە بخۆیە.",
    icon: "https://i.postimg.cc/HLHy2nDm/unnamed-(8).jpg",
    banner: "https://picsum.photos/seed/pubgskin/600/300",
    rating: 4.5,
    downloads: "150K+",
    author: "Yousif Duski",
    ipaLink: "https://mega.nz/file/FvYlVSZD#KJVyavH9SVUPtm6RnkUilYpcNjjIrEu9QxVGVItOXyg",
    platform: 'ios'
  },
  {
    id: "traffic",
    name: "Traffic Racer Pro MOD",
    category: "Games",
    size: "252.3 MB",
    version: "v2.1.2",
    description: "Modified version of Traffic Racer Pro with unlimited money and all cars unlocked.",
    updateLog: "🚗 تایبەتمەندی:\n✅ پارێ بێسنوور | ✅ هەمی ترومبێل د ڤکرینە",
    icon: "https://i.postimg.cc/g2sBR1tw/unnamed-(6).jpg",
    banner: "https://picsum.photos/seed/traffic-race/600/300",
    rating: 4.8,
    downloads: "120K+",
    author: "Yousif Duski",
    ipaLink: "https://github.com/yduski642-sketch/RA-KURD-IPA/releases/download/v2.1.1/Traffic.Racer.Pro_2.1.2_1776013338.ipa",
    directLink: "https://loadly.io/yousifduski4",
    platform: 'ios'
  },
  {
    id: "rdr",
    name: "Red Dead Redemption",
    category: "Games",
    size: "2.69 GB",
    version: "v1.0.0",
    description: "Experience the epic Western adventure Red Dead Redemption on your mobile device for free.",
    updateLog: "⚔️ تایبەتمەندی:\n✅ رێدێد بەلاش (Free)",
    icon: "https://i.postimg.cc/8zYz1Xd5/unnamed-(5).jpg",
    banner: "https://picsum.photos/seed/rdr/600/300",
    rating: 4.9,
    downloads: "60K+",
    author: "Yousif Duski",
    ipaLink: "https://www.mediafire.com/file/20ofpamksbll1gv/Red+Dead+Redemption+Free.ipa/file",
    platform: 'ios'
  },
  {
    id: "coc",
    name: "Clash of Clans Mod",
    category: "Games",
    size: "410.2 MB",
    version: "v15.0.0",
    description: "Clash of Clans modified with unlimited resources and private server access.",
    updateLog: "⚔️ تایبەتمەندی:\n✅ پارە و ئەڵماس بێسنوور (Unlimited)\n✅ سێرڤەرێ تایبەت (Private Server)\n✅ هەمی سەرباز ڤکرینە",
    icon: "https://i.postimg.cc/QMV2gqVt/unnamed-(3).jpg",
    banner: "https://picsum.photos/seed/cocmod/600/300",
    rating: 4.8,
    downloads: "300K+",
    author: "Yousif Duski",
    ipaLink: "https://url-shortener.me/LGG4",
    directLink: "https://url-shortener.me/L3UJ",
    platform: 'ios'
  },
  {
    id: "dr-driving",
    name: "Dr. Driving Mod",
    category: "Games",
    size: "13.3 MB",
    version: "v1.70",
    description: "Dr. Driving with unlimited gold and all cars unlocked. Enjoy a completely ad-free experience.",
    updateLog: "🚗 تایبەتمەندیێن مۆدێ:\n✅ زێڕێ بێسنوور (Unlimited Gold)\n✅ هەمی ترومبێل د ڤکرینە\n✅ بێ ریکلام (No Ads)",
    icon: "https://i.postimg.cc/zXVLK4TH/unnamed.jpg",
    banner: "https://picsum.photos/seed/drdriving/600/300",
    rating: 4.7,
    downloads: "450K+",
    author: "Yousif Duski",
    ipaLink: "https://url-shortener.me/J8XT",
    directLink: "https://loadly.io/yousifduski",
    platform: 'ios'
  },
  {
    id: "gta-sa",
    name: "GTA: SA - RA KURD",
    category: "Games",
    size: "2.5 GB",
    version: "Definitive",
    description: "GTA San Andreas Definitive Edition for iOS. Compatible with iOS 16 and fixed for iOS 18/19 crashes.",
    updateLog: "🎮 وەشانا Definitive:\n✅ بێ بەرامبەر (Free)\n✅ پشتەڤانیا iOS 16 و نویتر\n✅ چارەسەریا کراشێ ل iOS 26",
    icon: "https://i.postimg.cc/bdfjVVvq/unnamed-(3).jpg",
    banner: "https://picsum.photos/seed/gtasa/600/300",
    rating: 4.9,
    downloads: "200K+",
    author: "Yousif Duski",
    ipaLink: "https://mega.nz/file/RyxWmITI#fWLbue1FBU79KaOjAOonqZ6p66juSneaOCDhq9mglmU",
    platform: 'ios'
  },
  {
    id: "minecraft",
    name: "Minecraft",
    category: "Games",
    size: "832 MB",
    version: "v1.20.0",
    description: "Explore infinite worlds and build everything from the simplest of homes to the grandest of castles.",
    updateLog: "✨ تایبەتمەندی:\n\n✅ mincraft بەلاش (Free)",
    icon: "https://i.postimg.cc/sgqQqKJy/unnamed-(17).jpg",
    banner: "https://picsum.photos/seed/minecraft/600/300",
    rating: 4.9,
    downloads: "500K+",
    author: "Yousif Duski",
    ipaLink: "https://url-shortener.me/LGNC",
    directLink: "https://url-shortener.me/LGP4",
    platform: 'ios'
  },
  {
    id: "youtube-mod",
    name: "YouTube Mod",
    category: "Media",
    size: "124 MB",
    version: "v19.0.0",
    description: "Enhanced YouTube app with ad-blocking, background playback, and easy sign-in.",
    updateLog: "🚀 تایبەتمەندی:\n✅ بێ ریکلام | ✅ کارکرن ل پشت پەردێ | ✅ Sign-in",
    icon: "https://i.postimg.cc/28dM8gP5/unnamed.jpg",
    banner: "https://picsum.photos/seed/ytmod/600/300",
    rating: 4.9,
    downloads: "1.2M+",
    author: "Yousif Duski",
    ipaLink: "https://url-shortener.me/J8YL",
    directLink: "https://url-shortener.me/L3VN",
    platform: 'ios'
  },
  {
    id: "pizza-ready",
    name: "Pizza Ready Mod",
    category: "Games",
    size: "148.23 MB",
    version: "v1.2.0",
    description: "Free in-app purchases for Pizza Ready. Simply click to buy and then cancel for success.",
    updateLog: "🛒 ستۆرا بێ بەرامبەر:\n١. کلیک ل سەر کڕینێ بکە | ٢. کلیک ل Cancel بکە.",
    icon: "https://i.postimg.cc/QHPPVXsq/unnamed.png",
    banner: "https://picsum.photos/seed/pizzaready/600/300",
    rating: 4.6,
    downloads: "95K+",
    author: "Yousif Duski",
    ipaLink: "https://url-shortener.me/J8YU",
    directLink: "https://url-shortener.me/L3W6",
    platform: 'ios'
  },
  {
    id: "picsart-vip",
    name: "PicsArt VIP",
    category: "Media",
    size: "94.36 MB",
    version: "v22.0.0",
    description: "PicsArt with VIP features fully unlocked. Use all premium assets and effects without limits.",
    updateLog: "🎨 VIP ڤەکری:\nهەمی تشت د ڤکرینە و بێ چ کێشە کار دکەن.",
    icon: "https://i.postimg.cc/qgHdBYW2/abfbc85d-be1d-4b24-85af-6bff2d581550.png",
    banner: "https://picsum.photos/seed/picsartvip/600/300",
    rating: 4.8,
    downloads: "500K+",
    author: "Yousif Duski",
    ipaLink: "https://url-shortener.me/J8Z1",
    directLink: "https://url-shortener.me/L3VY",
    platform: 'ios'
  },
  {
    id: "rdr-android",
    name: "Red Dead Redemption",
    category: "Games",
    size: "2.7 GB",
    version: "v1.0.0",
    description: "Experience the epic Western adventure Red Dead Redemption on your mobile device for free.",
    updateLog: "⚔️ تایبەتمەندی:\n✅ رێدێد بەلاش (Free)",
    icon: "https://i.postimg.cc/rp6RCbgK/unnamed-(7).jpg",
    banner: "https://picsum.photos/seed/rdrandroid/600/300",
    rating: 4.9,
    downloads: "80K+",
    author: "Yousif Duski",
    directLink: "https://files.an1.co/red-dead-redemption-mods_1.58.63226194-an1.com.apk",
    platform: 'android'
  },
  {
    id: "picsart-android",
    name: "PicsArt premium",
    category: "Media",
    size: "79.48 MB",
    version: "v22.0.0",
    description: "PicsArt with Gold Premium Unlocked. Use all premium assets and effects without limits.",
    updateLog: "🌟 تایبەتمەندیێن مۆدێ:\n✅ Gold Premium Unlocked\n✅ هەمی فلتەر و ستیکەر ڤکرینە\n✅ بێ ڕیکلام (No Ads)",
    icon: "https://i.postimg.cc/rmP9LS9z/unnamed-(2).jpg",
    banner: "https://picsum.photos/seed/picsartpremium/600/300",
    rating: 4.8,
    downloads: "400K+",
    author: "Yousif Duski",
    directLink: "https://url-shortener.me/J8ZB",
    platform: 'android'
  },
  {
    id: "pool-android",
    name: "8 Ball Pool Mod",
    category: "Games",
    size: "78.8 MB",
    version: "v56.21.1",
    description: "The most professional 8 Ball Pool mod for Android. Includes professional tools for better gameplay experience.",
    updateLog: "🎱 تایبەتمەندیێن مۆدێ (v56.21.1):\n✅ هێلا درێژ (Long Line)\n✅ مینیۆیا مۆدێ (Mod Menu)\n✅ لێدانا بێسنوور (Mega Hit)",
    icon: "https://i.postimg.cc/kXGvh1P9/unnamed-(1).jpg",
    banner: "https://picsum.photos/seed/poolandroid/600/300",
    rating: 5.0,
    downloads: "200K+",
    author: "Yousif Duski",
    directLink: "https://url-shortener.me/J8ZT",
    platform: 'android'
  },
  {
    id: "tiktok-android",
    name: "TikTok Premium",
    category: "Media",
    size: "184 MB",
    version: "v44.5.5",
    description: "Enhanced TikTok app for Android with no watermark and unlocked features.",
    updateLog: "✨ تایبەتمەندیێن مۆدێ (v44.5.5):\n✅ بێ نیشان (No Watermark) | ✅ پلەگین (Plugin) ڤەکری",
    icon: "https://i.postimg.cc/GpKh8Rm2/unnamed-(2).jpg",
    banner: "https://picsum.photos/seed/tiktokpremium/600/300",
    rating: 4.9,
    downloads: "1.5M+",
    author: "Yousif Duski",
    directLink: "https://url-shortener.me/J90A",
    platform: 'android'
  },
  {
    id: "roblox-android",
    name: "Roblox MOD",
    category: "Games",
    size: "156 MB",
    version: "v2.600",
    description: "Roblox with a massive mod menu including fly, wallhack, and more.",
    updateLog: "🎮 مۆد مینیۆ (60 تشت):\n✅ مینیۆیا مەزن | ✅ فڕین (Fly) | ✅ دەربازبوون ژ دیواران",
    icon: "https://i.postimg.cc/wM52gywh/unnamed-(1).jpg",
    banner: "https://picsum.photos/seed/robloxmod/600/300",
    rating: 4.7,
    downloads: "900K+",
    author: "Yousif Duski",
    directLink: "https://url-shortener.me/J90T",
    platform: 'android'
  },
  {
    id: "traffic-android",
    name: "Traffic Racer Pro",
    category: "Games",
    size: "489.21 MB",
    version: "v2.1.2",
    description: "Unlimited money and all cars unlocked for Traffic Racer Pro on Android.",
    updateLog: "🤖 بێسنوور:\n✅ پارێ بێسنوور | ✅ هەمی ترومبێل د ڤکرینە",
    icon: "https://i.postimg.cc/kgKj6Tv7/unnamed.webp",
    banner: "https://picsum.photos/seed/trafficandroid/600/300",
    rating: 4.8,
    downloads: "150K+",
    author: "Yousif Duski",
    directLink: "https://url-shortener.me/J90X",
    platform: 'android'
  },
  {
    id: "minecraft-android",
    name: "Minecraft MOD",
    category: "Games",
    size: "883 MB",
    version: "v1.20",
    description: "Minecraft with mod menu, auto-hit, and god mode.",
    updateLog: "🔥 مۆد مینیۆ:\n✅ مینیۆیا مەزن | ✅ لێدانا ئۆتۆماتیکی | ✅ نامریت",
    icon: "https://i.postimg.cc/d3LV0kd3/Screenshot-2026-03-25-163801.png",
    banner: "https://picsum.photos/seed/minecraftmod/600/300",
    rating: 4.9,
    downloads: "2M+",
    author: "Yousif Duski",
    directLink: "https://url-shortener.me/J8TY",
    platform: 'android'
  }
];

// --- Components ---

const ViewContainer = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.02 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="flex-1 w-full max-w-lg mx-auto pb-32 pt-6 px-4 md:pt-10 font-sans"
    style={{ 
      paddingTop: 'calc(env(safe-area-inset-top, 0px) + 24px)',
      paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 110px)' 
    }}
  >
    {children}
  </motion.div>
);

const SectionHeader = ({ title, isDarkMode }: { title: string, isDarkMode: boolean }) => (
  <h2 className={`text-2xl font-black tracking-tight mb-4 px-1 font-display ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
);

const Card = ({ children, className = "", isDarkMode, key, style }: { children: React.ReactNode, className?: string, isDarkMode: boolean, key?: React.Key, style?: React.CSSProperties }) => (
  <div key={key} style={style} className={`rounded-[2rem] transition-all duration-500 ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800 shadow-none' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/40'} border p-6 mb-5 ${className}`}>
    {children}
  </div>
);

// --- Sub-views ---

const HomeView = ({ isDarkMode, accentColor, onSelectApp }: { isDarkMode: boolean, accentColor: string, onSelectApp: (app: AppItem) => void, key?: React.Key }) => {
  const featuredApps = APPS.slice(0, 4);
  const recentApps = APPS.slice(4, 7);

  return (
    <ViewContainer>
      <div className="flex justify-between items-center mb-10 px-1">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden shadow-2xl transition-transform hover:scale-105" style={{ border: `2px solid ${accentColor}` }}>
            <img src={LOGO_URL} alt="RA KURD Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`}>Welcome to</p>
            <h1 className={`text-2xl font-black tracking-tighter font-display ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>RA KURD STORE</h1>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-600'}`} style={{ color: isDarkMode ? accentColor : undefined }}>
          <User size={22} strokeWidth={2.5} />
        </div>
      </div>

      <div className="mb-10">
        <SectionHeader title="Featured" isDarkMode={isDarkMode} />
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none px-1">
          {featuredApps.map(app => (
            <motion.div 
              key={app.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectApp(app)}
              className={`min-w-[280px] h-44 rounded-[2.5rem] relative overflow-hidden cursor-pointer shadow-2xl group transition-all`}
            >
              <img 
                src={app.banner} 
                className="absolute inset-0 w-full h-full object-cover blur-[4px] opacity-90 transition-transform duration-700 group-hover:scale-110" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3">
                  <img src={app.icon} className="w-10 h-10 rounded-xl border border-white/20 shadow-2xl" />
                  <div>
                    <h4 className="text-white font-black text-sm">{app.name}</h4>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{app.category}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Card isDarkMode={isDarkMode} className="border-none text-white overflow-hidden relative p-8 mb-10" style={{ backgroundColor: accentColor }}>
        <div className="relative z-10">
          <h3 className="font-black text-2xl mb-2 font-display italic">Professional Tools</h3>
          <p className="text-white/80 text-sm mb-6 leading-relaxed font-semibold max-w-[85%] text-balance">The most professional Kurdish store for exclusive iOS assets and modified packages.</p>
          <button className="bg-white/20 backdrop-blur-xl border border-white/30 text-white px-7 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.1em] hover:bg-white/30 transition-all active:scale-95 shadow-2xl">
            Get Started
          </button>
        </div>
        <Zap className="absolute -right-6 -bottom-6 w-48 h-48 text-white opacity-10 rotate-12" />
      </Card>

      <SectionHeader title="Recent Activity" isDarkMode={isDarkMode} />
      <div className="space-y-4">
        {recentApps.map((app) => (
          <Card 
            key={app.id} 
            isDarkMode={isDarkMode} 
            className="flex items-center gap-5 hover:translate-x-1 transition-transform cursor-pointer group"
          >
            <div onClick={() => onSelectApp(app)} className="flex items-center gap-5 w-full">
              <div className={`w-14 h-14 rounded-2xl overflow-hidden shadow-lg`}>
                <img src={app.icon} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <p className={`font-black text-sm mb-0.5 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{app.name}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-black uppercase tracking-widest opacity-40`}>Updated</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <p className={`text-[9px] font-black tracking-widest uppercase`} style={{ color: accentColor }}>Verified</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-zinc-600 transition-transform group-hover:translate-x-1" />
            </div>
          </Card>
        ))}
      </div>
    </ViewContainer>
  );
};

const AppDetailView = ({ app, onClose, accentColor, isDarkMode }: { app: AppItem, onClose: () => void, accentColor: string, isDarkMode: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: "100%" }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: "100%" }}
    transition={{ type: "spring", damping: 25, stiffness: 200 }}
    className={`fixed inset-0 z-[100] flex flex-col font-sans ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}
  >
    <div className="relative w-full h-96 overflow-hidden">
      <motion.img 
        src={app.icon} 
        alt={app.name} 
        initial={{ scale: 1.5, rotate: 0 }}
        animate={{ 
          scale: [1.5, 1.6, 1.5],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="w-full h-full object-cover blur-3xl opacity-50" 
        referrerPolicy="no-referrer" 
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-black via-black/40' : 'from-white via-white/20'} to-transparent`} />
      <button 
        onClick={onClose}
        className="absolute top-12 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white active:scale-90 transition-transform shadow-2xl"
      >
        <X size={24} strokeWidth={3} />
      </button>
    </div>

    <div className="flex-1 px-6 -mt-32 relative z-10 overflow-y-auto pb-10">
      <div className="flex gap-6 items-end mb-8">
        <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-900 bg-white">
          <img src={app.icon} alt={app.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="flex-1 pb-2">
          <h2 className="text-3xl font-black tracking-tighter mb-1 font-display leading-tight">{app.name}</h2>
          <div className="flex items-center gap-2">
            <p className="text-xs font-black uppercase tracking-widest opacity-40">{app.category}</p>
            {app.author && (
              <>
                <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <p className="text-[10px] font-black tracking-widest uppercase text-red-500">Mod by: {app.author}</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Rating</span>
          <div className="flex items-center gap-1">
            <span className="font-black text-lg">{app.rating}</span>
            <Star size={14} className="fill-current text-amber-500" />
          </div>
        </div>
        <div className="flex flex-col items-center border-x border-zinc-200 dark:border-zinc-800 px-4">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Size</span>
          <span className="font-black text-lg">{app.size}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Downloads</span>
          <span className="font-black text-lg">{app.downloads}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-10">
        {app.ipaLink && (
          <a 
            href={app.ipaLink} 
            className="w-full py-5 rounded-[2rem] font-black text-lg transition-all active:scale-[0.98] shadow-2xl flex items-center justify-center gap-2"
            style={{ backgroundColor: accentColor, color: '#fff' }}
          >
            <Download size={22} strokeWidth={3} />
            DOWNLOAD {app.platform === 'ios' ? 'IPA' : 'APK'} ({app.size})
          </a>
        )}
        {app.directLink && (
          <a 
            href={app.directLink} 
            className={`w-full py-5 rounded-[2rem] font-black text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
              isDarkMode ? 'bg-zinc-900 text-white' : 'bg-gray-100 text-gray-900'
            }`}
          >
            <ExternalLink size={22} strokeWidth={3} />
            {app.platform === 'android' && !app.ipaLink ? `DOWNLOAD APK (${app.size})` : 'DOWNLOAD DIRECT'}
          </a>
        )}
        {!app.ipaLink && !app.directLink && (
          <button className="w-full py-5 rounded-[2rem] font-black text-lg transition-all active:scale-[0.98] shadow-2xl" style={{ backgroundColor: accentColor, color: '#fff' }}>
            DOWNLOAD NOW
          </button>
        )}
      </div>

      <div className="space-y-8">
        {app.warning && (
          <section>
            <div className={`p-5 rounded-[1.5rem] flex gap-4 ${isDarkMode ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-100'}`}>
              <ShieldAlert className="text-red-500 shrink-0" size={24} strokeWidth={2.5} />
              <p className={`text-xs font-bold leading-relaxed ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>{app.warning}</p>
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Info size={18} style={{ color: accentColor }} strokeWidth={3} />
            <h4 className="font-black uppercase text-[10px] tracking-[0.2em]">Description</h4>
          </div>
          <p className={`text-sm leading-relaxed font-bold ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{app.description}</p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <History size={18} style={{ color: accentColor }} strokeWidth={3} />
            <h4 className="font-black uppercase text-[10px] tracking-[0.2em]">What's New ({app.version})</h4>
          </div>
          <Card isDarkMode={isDarkMode} className="m-0 p-5 border-dashed">
            <p className={`text-xs leading-relaxed font-bold whitespace-pre-wrap ${isDarkMode ? 'text-zinc-300' : 'text-gray-600'}`}>{app.updateLog}</p>
          </Card>
        </section>
      </div>
    </div>
  </motion.div>
);

const AppView = ({ isDarkMode, accentColor, onSelectApp, platform = 'ios' }: { isDarkMode: boolean, accentColor: string, onSelectApp: (app: AppItem) => void, platform?: 'ios' | 'android', key?: React.Key }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Games", "Media"];

  const filteredApps = APPS.filter(app => {
    const matchesPlatform = app.platform === platform;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || app.category === selectedCategory;
    return matchesPlatform && matchesSearch && matchesCategory;
  });

  return (
    <ViewContainer>
      <SectionHeader title={platform === 'ios' ? "iPhone Apps" : "Android Store"} isDarkMode={isDarkMode} />
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-zinc-500 transition-colors" size={20} />
        <input 
          type="text" 
          placeholder={`Search ${platform === 'ios' ? 'iPhone' : 'Android'} tools...`} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full border-none rounded-[1.5rem] py-5 pl-12 pr-6 text-sm font-bold focus:ring-4 transition-all outline-none ${
            isDarkMode ? 'bg-zinc-900 text-white placeholder:text-zinc-700 shadow-none' : 'bg-white text-gray-900 shadow-xl shadow-gray-100/50'
          }`}
          style={{ '--tw-ring-color': `${accentColor}30` } as any}
        />
      </div>

      <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none px-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 whitespace-nowrap ${
              selectedCategory === cat
                ? 'text-white shadow-lg'
                : (isDarkMode ? 'bg-zinc-900 text-zinc-500 hover:text-zinc-300' : 'bg-white border border-gray-100 text-gray-400 hover:bg-gray-50 shadow-sm')
            }`}
            style={{ backgroundColor: selectedCategory === cat ? accentColor : undefined }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredApps.length > 0 ? (
          filteredApps.map((app) => (
            <Card 
              key={app.id} 
              isDarkMode={isDarkMode} 
              className="flex items-center gap-5 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all group"
            >
              <div onClick={() => onSelectApp(app)} className="flex items-center gap-5 w-full">
                <div className="w-20 h-20 rounded-[1.75rem] overflow-hidden shadow-2xl transition-transform group-hover:rotate-3">
                  <img src={app.icon} alt={app.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-black tracking-tight text-base mb-0.5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{app.name}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${isDarkMode ? 'bg-zinc-800 text-zinc-500' : 'bg-gray-100 text-gray-500'}`}>{app.category}</span>
                    <span className={`text-[10px] font-bold opacity-40`}>{app.size}</span>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDarkMode ? 'bg-zinc-800 text-zinc-500' : 'bg-gray-100 text-gray-400'}`}>
                  <ChevronRight size={20} />
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="py-20 text-center opacity-40">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-sm font-black uppercase tracking-widest">No tools found</p>
          </div>
        )}
      </div>

    </ViewContainer>
  );
};

const SettingView = ({ state, setState }: { state: AppState, setState: React.Dispatch<React.SetStateAction<AppState>>, key?: React.Key }) => {
  const languages = [
    { id: "ku_ba", label: "Kurdy (Badini)" },
    { id: "ku_so", label: "Kurdy (Sorani)" },
    { id: "en", label: "English" },
    { id: "ar", label: "Arabic" },
  ];

  const colors = [
    "#ef4444", // Red
    "#3b82f6", // Blue
    "#10b981", // Green
    "#8b5cf6", // Purple
    "#f59e0b", // Amber
    "#06b6d4", // Cyan
  ];

  return (
    <ViewContainer>
      <div className="flex flex-col items-center mb-12">
        <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-none border-4 border-white dark:border-zinc-800 mb-6 relative transition-transform hover:rotate-3 shadow-red-500/20" style={{ ringColor: state.accentColor, ringWidth: '2px' }}>
          <img src={LOGO_URL} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h3 className={`text-2xl font-black tracking-tight font-display mb-1 ${state.isDarkMode ? 'text-white' : 'text-gray-900'}`}>Yousif Duski</h3>
        <p className="font-black tracking-[0.2em] text-[10px] uppercase opacity-40">RA KURD • OWNER</p>
      </div>

      <SectionHeader title="Settings" isDarkMode={state.isDarkMode} />
      
      <div className="space-y-8">
        <Card isDarkMode={state.isDarkMode} className="p-0 overflow-hidden divide-y divide-gray-50 dark:divide-zinc-800">
          {/* Dark Mode */}
          <div 
            onClick={() => setState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }))}
            className="flex items-center gap-4 p-5 hover:bg-gray-50 dark:hover:bg-zinc-800/50 cursor-pointer active:scale-[0.99] transition-all"
          >
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${state.isDarkMode ? 'bg-amber-400/10 text-amber-400' : 'bg-gray-100 text-gray-600'}`}>
              {state.isDarkMode ? <Sun size={22} strokeWidth={2.5} /> : <Moon size={22} strokeWidth={2.5} />}
            </div>
            <div className={`flex-1 font-black text-sm uppercase tracking-widest ${state.isDarkMode ? 'text-zinc-200' : 'text-gray-700'}`}>Dark Mode</div>
            <div className={`w-14 h-7 rounded-full transition-all relative ${state.isDarkMode ? '' : 'bg-gray-200'}`} style={{ backgroundColor: state.isDarkMode ? state.accentColor : undefined }}>
              <motion.div 
                animate={{ x: state.isDarkMode ? 30 : 4 }}
                className="w-5 h-5 rounded-full bg-white absolute top-1 shadow-lg"
              />
            </div>
          </div>

          {/* Accent Color Selection */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${state.isDarkMode ? 'bg-zinc-800 text-white' : 'bg-gray-100 text-gray-700'}`}>
                <Palette size={22} strokeWidth={2.5} />
              </div>
              <div className={`flex-1 font-black text-sm uppercase tracking-widest ${state.isDarkMode ? 'text-zinc-200' : 'text-gray-700'}`}>Accent Color</div>
            </div>
            <div className="flex flex-wrap gap-4">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setState(prev => ({ ...prev, accentColor: color }))}
                  className={`w-10 h-10 rounded-[1rem] shadow-lg transition-all active:scale-90 flex items-center justify-center ${
                    state.accentColor === color ? 'ring-4 ring-offset-4 dark:ring-offset-black scale-110' : 'opacity-40'
                  }`}
                  style={{ backgroundColor: color, '--tw-ring-color': color } as any}
                >
                  {state.accentColor === color && <Check size={18} className="text-white" strokeWidth={4} />}
                </button>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-5 text-gray-700 dark:text-zinc-200">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${state.isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <Globe size={22} strokeWidth={2.5} />
              </div>
              <div className="flex-1 font-black text-sm uppercase tracking-widest">Interface Language</div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setState(prev => ({ ...prev, language: lang.id as Language }))}
                  className={`flex items-center justify-between p-4.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                    state.language === lang.id 
                      ? 'shadow-2xl scale-105 z-10 text-white' 
                      : (state.isDarkMode ? 'bg-zinc-800 text-zinc-600 hover:bg-zinc-700' : 'bg-white border border-gray-100 text-gray-400 hover:bg-gray-50 shadow-sm')
                  }`}
                  style={{ backgroundColor: state.language === lang.id ? state.accentColor : undefined }}
                >
                  {lang.label}
                  {state.language === lang.id && <Check size={14} strokeWidth={4} />}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <SectionHeader title="Community" isDarkMode={state.isDarkMode} />
        <div className="space-y-5">
          <a 
            href="https://t.me/RAkIRD1" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center gap-6 p-8 rounded-[2.5rem] font-black transition-all active:scale-95 ${
              state.isDarkMode ? 'bg-zinc-900 border border-zinc-800 text-white shadow-2xl' : 'bg-white border border-gray-100 text-gray-900 shadow-2xl shadow-gray-200/40'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
              <Send size={30} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 block mb-1">Telegram Channel</span>
              <span className="text-lg tracking-tight">Join our Community</span>
            </div>
          </a>
        </div>

        <div className="flex flex-col items-center pt-10 pb-4 opacity-15">
          <img src={LOGO_URL} className="w-12 h-12 grayscale opacity-40 mb-4" alt="Logo Watermark" />
          <p className={`text-[10px] font-black tracking-[0.4em] uppercase ${state.isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>RA KURD STORE • PREMIUM</p>
        </div>
      </div>
    </ViewContainer>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [appState, setAppState] = useState<AppState>({
    isDarkMode: false,
    language: "ku_ba",
    accentColor: "#3b82f6", // Default to Blue
  });

  useEffect(() => {
    if (appState.isDarkMode) {
      document.body.classList.add('bg-zinc-950');
      document.body.classList.remove('bg-gray-50');
    } else {
      document.body.classList.add('bg-gray-50');
      document.body.classList.remove('bg-zinc-950');
    }
  }, [appState.isDarkMode]);

  useEffect(() => {
    // Disable context menu (right click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable copy/paste and view source shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        // Ctrl+C, Ctrl+V, Ctrl+U (View Source), Ctrl+S (Save), Ctrl+Shift+I (DevTools)
        (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'u' || e.key === 's' || e.key === 'a')) ||
        // F12 (DevTools)
        e.key === 'F12' ||
        // Meta (Command) keys for Mac
        (e.metaKey && (e.key === 'c' || e.key === 'v' || e.key === 'u' || e.key === 's' || e.key === 'a'))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navItems: { id: Tab; label: string; icon: typeof Home }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "ios", label: "iPhone", icon: Apple },
    { id: "apk", label: "Android", icon: Bot },
    { id: "setting", label: "Setting", icon: Settings },
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${appState.isDarkMode ? 'bg-zinc-950 text-white' : 'bg-gray-50 text-gray-900'} selection:bg-gray-200 selection:text-black`}>
      <AnimatePresence>
        {selectedApp && (
          <AppDetailView 
            app={selectedApp} 
            onClose={() => setSelectedApp(null)} 
            accentColor={appState.accentColor} 
            isDarkMode={appState.isDarkMode} 
          />
        )}
      </AnimatePresence>

      {/* View Rendering */}
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "home" && <HomeView isDarkMode={appState.isDarkMode} accentColor={appState.accentColor} onSelectApp={setSelectedApp} key="home" />}
          {activeTab === "ios" && <AppView isDarkMode={appState.isDarkMode} accentColor={appState.accentColor} onSelectApp={setSelectedApp} key="ios" platform="ios" />}
          {activeTab === "apk" && <AppView isDarkMode={appState.isDarkMode} accentColor={appState.accentColor} onSelectApp={setSelectedApp} key="apk" platform="android" />}
          {activeTab === "setting" && <SettingView state={appState} setState={setAppState} key="setting" />}
        </AnimatePresence>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-lg mx-auto px-8 pt-2" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}>
          <div className={`backdrop-blur-3xl border shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-none rounded-[3.5rem] flex items-center justify-between px-4 py-4 transition-all duration-500 ${
            appState.isDarkMode ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white/90 border-white/20'
          }`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="relative flex flex-col items-center justify-center flex-1 outline-none group"
                >
                  <div className={`relative z-10 transition-all duration-400 ${isActive ? 'scale-110 -translate-y-1.5' : 'scale-100 group-active:scale-90'}`}>
                    <Icon 
                      size={24} 
                      className={`transition-colors duration-400 ${isActive ? '' : (appState.isDarkMode ? 'text-zinc-700' : 'text-gray-300')}`} 
                      style={{ color: isActive ? appState.accentColor : undefined }}
                      strokeWidth={isActive ? 3 : 2}
                    />
                  </div>
                  <span 
                    className={`text-[8px] font-black mt-2 uppercase tracking-[0.2em] transition-all duration-400 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    style={{ color: isActive ? appState.accentColor : undefined }}
                  >
                    {item.label}
                  </span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute -top-1 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: appState.accentColor }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
