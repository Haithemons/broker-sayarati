import React, { useState, useMemo } from 'react';
import { 
  Car, Lock, Mail, User, ArrowRight, ShieldCheck, Phone, CheckCircle2, 
  Sun, Moon, Globe, Search, PlusCircle, MessageSquare, MapPin, 
  Star, Truck, Wrench, SlidersHorizontal, Zap, ShoppingBag, Send, X, AlertCircle, Eye, EyeOff, Loader2,
  ChevronRight, Award, DollarSign, Layers, ArrowLeft
} from 'lucide-react';

export default function App() {
  // حالات التحكم بالصفحات: 'landing' (التعريفية) -> 'auth' (التسجيل) -> 'platform' (المنصة)
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLogin, setIsLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState('ar');

  // حالات نموذج التسجيل
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // حالات المنصة الداخلية
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [purchasingProduct, setPurchasingProduct] = useState(null);
  const [showAddListingModal, setShowAddListingModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const isRtl = lang === 'ar';

  // النصوص والترجمات
  const t = {
    ar: {
      title: "سيارتي بروكر",
      toggleLang: "English",
      heroBadge: "نظام الوساطة والضمان الآمن بالدينار الجزائري",
      heroTitle: "أول منصة وساطة مالية لقطع غيار السيارات في الجزائر",
      heroDesc: "احصل على قطع غيار أصلية ومضمونة بدون مخاطرة الاحتيال. نحتفظ بالمبلغ بأمان حتى تفحص القطعة وتتأكد من سلامتها بنفسك.",
      exploreBtn: "استكشف قطع الغيار",
      joinBtn: "انضم الآن كبائع أو مشترٍ",
      stat1: "58 ولاية",
      stat1Desc: "تغطية شاملة لكل الجزائر",
      stat2: "100% مضمون",
      stat2Desc: "حماية كاملة للأموال بالدينار",
      stat3: "+5000 قطعة",
      stat3Desc: "قطع محركات وفرامل وسياقة",
      howTitle: "كيف يعمل نظام الوساطة؟",
      howSub: "3 خطوات بسيطة تضمن حق المشتري والبائع",
      step1Title: "1. تصفح واطلب القطعة",
      step1Desc: "ابحث عن قطعة الغيار المطلوبة وقارن الأسعار مع ضمان مواصفات الأدمن.",
      step2Title: "2. حجز المبلغ آمنًا",
      step2Desc: "يتم حجز قيمة القطعة في حساب الوساطة (BaridiMob/CCP) دون تحويلها للبائع فوراً.",
      step3Title: "3. المعاينة واستلام الأموال",
      step3Desc: "تستلم القطعة وتفحصها لدى الميكانيكي، وعند موافقتك يتم تحويل المبلغ للبائع.",
      welcomeBack: "WELCOME BACK.",
      createAccount: "CREATE ACCOUNT.",
      subLogin: "سجل الدخول لإدارة قطع الغيار والوصول إلى لوحة التحكم.",
      subRegister: "انضم إلينا كبائع أو مشترٍ واستفد من نظام الضمان المالي.",
      loginTab: "تسجيل الدخول",
      registerTab: "حساب جديد",
      fullName: "الاسم الكامل",
      phoneLabel: "رقم الهاتف (الجزائر)",
      emailLabel: "البريد الإلكتروني",
      passwordLabel: "كلمة المرور",
      loginBtn: "الدخول إلى المنصة",
      registerBtn: "إنشاء الحساب الجديد",
      loadingBtn: "جاري المعالجة...",
      successMsg: "تم تسجيل الدخول بنجاح!",
      navHome: "الرئيسية",
      navParts: "قطع الغيار",
      navEscrow: "نظام الوساطة",
      searchPlaceholder: "ابحث باسم القطعة، المحرك، أو رقم التسلسل...",
      allBrands: "جميع الماركات",
      allStates: "جميع الولايات (58 ولاية)",
      latestParts: "أحدث قطع الغيار المتوفرة بالجزائر",
      finalPrice: "السعر النهائي (شامل الوساطة)",
      escrowBuy: "طلب بالضمان",
      logout: "تسجيل الخروج",
      addListing: "إضافة إعلان جديد",
      backToHome: "العودة للرئيسية"
    },
    en: {
      title: "Sayarati Broker",
      toggleLang: "العربية",
      heroBadge: "Secure Escrow System in DZD",
      heroTitle: "Algeria's First Escrow Auto Parts Platform",
      heroDesc: "Buy genuine auto parts risk-free. We hold funds securely until you inspect and approve your part.",
      exploreBtn: "Explore Spare Parts",
      joinBtn: "Join as Seller or Buyer",
      stat1: "58 Wilayas",
      stat1Desc: "Full coverage across Algeria",
      stat2: "100% Guaranteed",
      stat2Desc: "Full money protection in DZD",
      stat3: "+5000 Parts",
      stat3Desc: "Engines, brakes & body parts",
      howTitle: "How Does Escrow Work?",
      howSub: "3 simple steps guaranteeing safety for buyers and sellers",
      step1Title: "1. Browse & Order",
      step1Desc: "Find required spare parts and compare verified listings easily.",
      step2Title: "2. Secure Funds",
      step2Desc: "Your money is held safely in escrow (BaridiMob/CCP) before shipping.",
      step3Title: "3. Inspect & Release",
      step3Desc: "Receive and inspect the part. Once approved, payment is released to the seller.",
      welcomeBack: "WELCOME BACK.",
      createAccount: "CREATE ACCOUNT.",
      subLogin: "Sign in to manage auto parts and access your dashboard.",
      subRegister: "Join as a seller or buyer and benefit from our escrow system.",
      loginTab: "Sign In",
      registerTab: "Sign Up",
      fullName: "Full Name",
      phoneLabel: "Phone Number (Algeria)",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      loginBtn: "Access Platform",
      registerBtn: "Create New Account",
      loadingBtn: "Processing...",
      successMsg: "Logged in successfully!",
      navHome: "Home",
      navParts: "Spare Parts",
      navEscrow: "Escrow System",
      searchPlaceholder: "Search by part name, engine, or serial...",
      allBrands: "All Brands",
      allStates: "All Wilayas (58 States)",
      latestParts: "Latest Spare Parts in Algeria",
      finalPrice: "Final Price (Escrow Included)",
      escrowBuy: "Escrow Order",
      logout: "Log Out",
      addListing: "Add New Listing",
      backToHome: "Back to Home"
    }
  }[lang];

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const validateEmail = (value) => {
    setEmail(value);
    if (value && !value.includes('@')) {
      setEmailError(lang === 'ar' ? 'البريد الإلكتروني غير صالح (يجب أن يحتوي على @)' : 'Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (value) => {
    setPassword(value);
    if (value && value.length < 6) {
      setPasswordError(lang === 'ar' ? 'كلمة المرور قصيرة جداً (6 أحرف على الأقل)' : 'Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (emailError || passwordError) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentPage('platform');
      triggerToast(t.successMsg);
    }, 1200);
  };

  const states = [
    "01 - أدرار", "02 - الشلف", "03 - الأغواط", "04 - أم البواقي", "05 - باتنة",
    "06 - بجاية", "07 - بسكرة", "08 - بشار", "09 - البليدة", "10 - البويرة",
    "16 - الجزائر العاصمة", "19 - سطيف", "23 - عنابة", "25 - قسنطينة", "31 - وهران", "36 - الطارف"
  ];

  const brands = [
    { label: t.allBrands, value: "all" },
    { label: "Renault (رينو)", value: "Renault" },
    { label: "Dacia (داسيا)", value: "Dacia" },
    { label: "Peugeot (بيجو)", value: "Peugeot" },
    { label: "Volkswagen (فولكسفاغن)", value: "Volkswagen" },
    { label: "Toyota (تويوتا)", value: "Toyota" }
  ];

  const categories = [
    { id: 'all', label: lang === 'ar' ? 'جميع القطع' : 'All Parts', icon: Car },
    { id: 'engine', label: lang === 'ar' ? 'المحرك والمستلزمات' : 'Engine & Parts', icon: Wrench },
    { id: 'braking', label: lang === 'ar' ? 'أنظمة الفرامل' : 'Braking Systems', icon: ShieldCheck },
    { id: 'suspension', label: lang === 'ar' ? 'التعليق والامتصاص' : 'Suspension', icon: SlidersHorizontal }
  ];

  const products = [
    {
      id: 1,
      title: "طقم فحمات فرامل أمامي رينو سيمبول / داسيا لوغان (Brembo الأصلي)",
      category: "braking",
      brand: "Renault",
      price: "4,500",
      state: "16 - الجزائر العاصمة",
      seller: "فولار لقطع الغيار الموثق",
      tag: lang === 'ar' ? "موافق عليه من الأدمن" : "Admin Verified",
      image: "https://images.unsplash.com/photo-1600706432520-22c9545e7587?auto=format&fit=crop&w=800&q=80",
      specs: "قطع غيار أصلية متوافق مع محرك 1.2 / 1.6 16v مع ضمان سنتين وصنع فرنسي ممتاز."
    },
    {
      id: 2,
      title: "شاحن توربيني (Turbocharger) جولف 7 GTD / ليون FR 2.0 TDI",
      category: "engine",
      brand: "Volkswagen",
      price: "89,000",
      state: "19 - سطيف",
      seller: "التوربو السريع الجزائر",
      tag: lang === 'ar' ? "قطعة نادرة ممتازة" : "Rare & Excellent",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
      specs: "مستورد من ألمانيا - حالة ممتازة مع ضمان الفحص والتركيب لدى الميكانيكي."
    }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (activeTab !== 'all' && p.category !== activeTab) return false;
      if (selectedBrand !== 'all' && !p.brand.toLowerCase().includes(selectedBrand.toLowerCase())) return false;
      if (selectedState !== 'all' && !p.state.includes(selectedState.replace(/^\d+\s*-\s*/, ''))) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        if (!p.title.toLowerCase().includes(query) && !p.seller.toLowerCase().includes(query)) return false;
      }
      return true;
    });
  }, [activeTab, selectedBrand, selectedState, searchQuery]);

  // ==========================================
  // 1. الصفحة التعريفية للمشروع (Landing Page)
  // ==========================================
  if (currentPage === 'landing') {
    return (
      <div className={`min-h-screen transition-colors duration-300 font-sans ${darkMode ? 'bg-[#07090E] text-slate-100' : 'bg-slate-50 text-slate-900'}`} dir={isRtl ? 'rtl' : 'ltr'}>
        {/* هيدر الصفحة التعريفية */}
        <header className={`sticky top-0 z-40 backdrop-blur-md border-b ${darkMode ? 'bg-[#07090E]/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className={`text-lg font-bold font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.title}</span>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl border transition ${darkMode ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-white border-slate-200 text-slate-700'}`}>
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                <Globe className="w-3.5 h-3.5 text-cyan-500" />
                <span>{t.toggleLang}</span>
              </button>
              <button onClick={() => { setIsLogin(true); setCurrentPage('auth'); }} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg">
                {t.loginTab}
              </button>
            </div>
          </div>
        </header>

        {/* القسم الرئيسي (Hero Section) */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold backdrop-blur-md">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.heroBadge}</span>
                </div>
                <h1 className={`text-4xl sm:text-6xl font-black leading-tight tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {t.heroTitle}
                </h1>
                <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.heroDesc}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button onClick={() => setCurrentPage('platform')} className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm rounded-xl shadow-xl shadow-cyan-500/20 hover:brightness-110 transition flex items-center gap-2">
                    <span>{t.exploreBtn}</span>
                    <ArrowRight className={`w-4 h-4 ${!isRtl ? 'rotate-180' : ''}`} />
                  </button>
                  <button onClick={() => { setIsLogin(false); setCurrentPage('auth'); }} className={`px-6 py-3.5 border rounded-xl font-bold text-sm transition ${darkMode ? 'border-slate-800 bg-slate-900/60 hover:border-cyan-500 text-slate-200' : 'border-slate-300 bg-white hover:border-cyan-500 text-slate-800'}`}>
                    {t.joinBtn}
                  </button>
                </div>
              </div>

              {/* بطاقة بصرية متحركة بأسلوب Glassmorphism */}
              <div className="relative">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-30 blur-2xl animate-pulse"></div>
                <div className={`relative rounded-3xl border p-6 sm:p-8 backdrop-blur-xl ${darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white/80 border-slate-200 shadow-2xl'}`}>
                  <img src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80" alt="Sayarati" className="rounded-2xl w-full h-64 object-cover mb-6 border border-slate-800" />
                  <div className="flex items-center justify-between border-t pt-4 border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400 block">نظام الوساطة المعتمد</span>
                      <span className="text-sm font-bold text-cyan-400">حماية فائقة للمشتري والبائع</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Zap className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* شريط الإحصائيات (Stats Bar) */}
        <section className={`py-12 border-y ${darkMode ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-100 border-slate-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-1">
                <div className="text-3xl font-black text-cyan-500 font-mono">{t.stat1}</div>
                <div className="text-xs text-slate-400">{t.stat1Desc}</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-black text-cyan-500 font-mono">{t.stat2}</div>
                <div className="text-xs text-slate-400">{t.stat2Desc}</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-black text-cyan-500 font-mono">{t.stat3}</div>
                <div className="text-xs text-slate-400">{t.stat3Desc}</div>
              </div>
            </div>
          </div>
        </section>

        {/* قسم كيف يعمل النظام (How It Works) */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.howTitle}</h2>
            <p className="text-xs sm:text-sm text-slate-400">{t.howSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-lg'}`}>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold">{t.step1Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t.step1Desc}</p>
            </div>

            <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-lg'}`}>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold">{t.step2Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t.step2Desc}</p>
            </div>

            <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-lg'}`}>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold">{t.step3Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t.step3Desc}</p>
            </div>
          </div>
        </section>

        {/* الشريط السفلي الدعائي (CTA) */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-700 p-8 sm:p-12 text-center space-y-6 text-slate-950 shadow-2xl">
            <h2 className="text-2xl sm:text-4xl font-black">جاهز للبدء في شراء أو بيع قطع الغيار بكل أمان؟</h2>
            <button onClick={() => { setIsLogin(false); setCurrentPage('auth'); }} className="px-8 py-4 bg-slate-950 text-cyan-400 font-bold text-sm rounded-xl hover:bg-slate-900 transition shadow-xl">
              أنشئ حسابك الآن مجاناً
            </button>
          </div>
        </section>

        <footer className={`py-8 text-center text-xs border-t ${darkMode ? 'bg-slate-950 border-slate-900 text-slate-500' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
          © {new Date().getFullYear()} سيارتي بروكر (Sayarati Broker). مشروع تخرج موثق. جميع الحقوق محفوظة.
        </footer>
      </div>
    );
  }

  // ==========================================
  // 2. صفحة التسجيل والدخول (Auth Page)
  // ==========================================
  if (currentPage === 'auth') {
    return (
      <div className={`min-h-screen transition-colors duration-300 font-sans ${darkMode ? 'bg-[#07090E] text-slate-100' : 'bg-slate-50 text-slate-900'}`} dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="min-h-screen flex">
          <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 relative z-10">
            <div className="flex items-center justify-between">
              <button onClick={() => setCurrentPage('landing')} className="flex items-center gap-2 text-xs font-semibold text-cyan-500 hover:underline">
                <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                <span>{t.backToHome}</span>
              </button>
              <div className="flex items-center gap-3">
                <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-xl border transition ${darkMode ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-white border-slate-200 text-slate-700'}`}>
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                  <Globe className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{t.toggleLang}</span>
                </button>
              </div>
            </div>

            <div className="max-w-md w-full mx-auto my-auto py-8">
              <div className="mb-8">
                <span className="text-xs font-bold text-cyan-500 tracking-wider uppercase block mb-1">بوابة الأعضاء والوساطة</span>
                <h2 className={`text-3xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{isLogin ? t.welcomeBack : t.createAccount}</h2>
                <p className={`text-xs sm:text-sm mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{isLogin ? t.subLogin : t.subRegister}</p>
              </div>

              <div className={`grid grid-cols-2 gap-2 p-1.5 border rounded-2xl mb-8 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-200/60 border-slate-300'}`}>
                <button onClick={() => setIsLogin(true)} className={`py-2.5 text-xs font-bold rounded-xl transition ${isLogin ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400'}`}>{t.loginTab}</button>
                <button onClick={() => setIsLogin(false)} className={`py-2.5 text-xs font-bold rounded-xl transition ${!isLogin ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400'}`}>{t.registerTab}</button>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div>
                      <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.fullName}</label>
                      <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className={`w-full px-4 py-3 border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-cyan-500 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`} />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.phoneLabel}</label>
                      <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="05XXXXXXXX" className={`w-full px-4 py-3 border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-cyan-500 font-mono ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`} />
                    </div>
                  </>
                )}

                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.emailLabel}</label>
                  <input required type="email" value={email} onChange={(e) => validateEmail(e.target.value)} placeholder="name@example.com" className={`w-full px-4 py-3 border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-cyan-500 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`} />
                  {emailError && <span className="text-[10px] text-red-400 mt-1 block font-semibold">{emailError}</span>}
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.passwordLabel}</label>
                  <div className="relative">
                    <input required type={showPassword ? "text" : "password"} value={password} onChange={(e) => validatePassword(e.target.value)} placeholder="••••••••" className={`w-full px-4 py-3 ${isRtl ? 'pl-10' : 'pr-10'} border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-cyan-500 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'left-3' : 'right-3'} text-slate-400 hover:text-cyan-400`}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {passwordError && <span className="text-[10px] text-red-400 mt-1 block font-semibold">{passwordError}</span>}
                </div>

                <button type="submit" disabled={isLoading || !!emailError || !!passwordError} className="w-full py-3.5 mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 text-slate-950 font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 text-sm disabled:opacity-50">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t.loadingBtn}</span>
                    </>
                  ) : (
                    <>
                      <span>{isLogin ? t.loginBtn : t.registerBtn}</span>
                      <ArrowRight className={`w-4 h-4 ${!isRtl ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </button>
              </form>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">SAYARATI BROKER AUTOMOTIVE 2026 ©</div>
          </div>

          <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-950 p-12 items-end">
            <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80" alt="Sports Car" className="w-full h-full object-cover filter brightness-75 scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-transparent opacity-90"></div>
            </div>
            <div className="relative z-10 max-w-lg space-y-3 pb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-semibold backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.heroBadge}</span>
              </div>
              <h1 className="text-4xl font-black text-white tracking-tight">FEEL THE <br /><span className="text-cyan-400">UNREAL.</span></h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 3. الصفحة الثالثة: منصة قطع الغيار والوساطة الكاملة
  // ==========================================
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#07090E] text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans`} dir={isRtl ? 'rtl' : 'ltr'}>
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-cyan-500 text-slate-950 font-bold px-5 py-3.5 rounded-xl shadow-2xl animate-bounce">
          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
          <span className="text-sm">{toastMessage}</span>
        </div>
      )}

      <div className={`border-b text-xs py-2 px-4 ${darkMode ? 'bg-cyan-950/60 border-cyan-500/20 text-slate-300' : 'bg-slate-200 border-slate-300 text-slate-700'}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-500 shrink-0" />
            <span>{t.heroBadge}</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <button onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-1 hover:text-cyan-500">
              {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="flex items-center gap-1 hover:text-cyan-500">
              <Globe className="w-3.5 h-3.5 text-cyan-500" />
              <span>{t.toggleLang}</span>
            </button>
            <button onClick={() => setCurrentPage('landing')} className="text-cyan-500 hover:underline">
              {t.logout}
            </button>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-40 backdrop-blur-md border-b ${darkMode ? 'bg-[#07090E]/90 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab('all'); setSearchQuery(''); }}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className={`text-xl font-black font-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.title}</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <a href="#hero" className="text-cyan-500 font-semibold">{t.navHome}</a>
            <a href="#parts" className="hover:text-cyan-500 transition">{t.navParts}</a>
            <a href="#escrow" className="hover:text-cyan-500 transition">{t.navEscrow}</a>
          </nav>

          <button onClick={() => setShowAddListingModal(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 hover:brightness-110 transition">
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>{t.addListing}</span>
          </button>
        </div>
      </header>

      <section id="hero" className={`py-14 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className={`text-3xl sm:text-5xl font-black leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {t.latestParts}
            </h1>
            <div className={`p-4 rounded-2xl border shadow-xl space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="relative">
                <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400`} />
                <input type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`w-full ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-cyan-500 ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className={`rounded-xl px-3 py-3 text-xs border focus:outline-none focus:border-cyan-500 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-300 text-slate-700'}`}>
                  {brands.map((b, idx) => (
                    <option key={idx} value={b.value}>{b.label}</option>
                  ))}
                </select>

                <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className={`rounded-xl px-3 py-3 text-xs border focus:outline-none focus:border-cyan-500 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-300 text-slate-700'}`}>
                  <option value="all">{t.allStates}</option>
                  {states.map((s, idx) => (
                    <option key={idx} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="parts" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            return (
              <button key={cat.id} onClick={() => setActiveTab(cat.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${activeTab === cat.id ? 'bg-cyan-500 text-slate-950 shadow-md font-bold' : darkMode ? 'bg-slate-900 text-slate-400 border border-slate-800' : 'bg-white text-slate-700 border border-slate-300'}`}>
                <IconComp className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className={`rounded-2xl border overflow-hidden transition duration-300 flex flex-col justify-between ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'}`}>
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-950">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-slate-950/90 px-2.5 py-1 rounded text-[10px] font-bold text-cyan-400 border border-cyan-500/30">
                    {product.tag}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-950/90 px-2 py-1 rounded text-[10px] text-slate-300 flex items-center gap-1 border border-slate-800">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{product.state}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className={`text-sm font-bold line-clamp-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{product.title}</h3>
                  <p className={`text-xs line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{product.specs}</p>
                </div>
              </div>

              <div className={`p-5 border-t ${darkMode ? 'border-slate-800 bg-slate-950/40' : 'border-slate-200 bg-slate-50'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 block">{t.finalPrice}</span>
                    <span className="text-xl font-black text-cyan-500 font-mono">{product.price} DZD</span>
                  </div>
                  <button onClick={() => setPurchasingProduct(product)} className="px-4 py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg">
                    {t.escrowBuy}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {purchasingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-2xl max-w-md w-full p-6 relative border shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <button onClick={() => setPurchasingProduct(null)} className="absolute top-4 left-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-bold mb-4">{t.escrowBuy}</h3>
            <p className="text-xs text-slate-400 mb-4">{purchasingProduct.title} - <strong className="text-cyan-500 font-mono">{purchasingProduct.price} DZD</strong></p>
            <button onClick={() => { setPurchasingProduct(null); triggerToast('تم تسجيل الطلب وحجز الأموال بالوساطة بنجاح!'); }} className="w-full py-3 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs">تأكيد حجز الوساطة</button>
          </div>
        </div>
      )}

      {showAddListingModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-2xl max-w-lg w-full p-6 relative border shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <button onClick={() => setShowAddListingModal(false)} className="absolute top-4 left-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-lg font-bold mb-4">{t.addListing}</h3>
            <form onSubmit={(e) => { e.preventDefault(); setShowAddListingModal(false); triggerToast('تم نشر الإعلان بنجاح!'); }} className="space-y-3 text-xs">
              <input required type="text" placeholder="عنوان القطعة..." className={`w-full rounded-xl px-3 py-2.5 border ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
              <button type="submit" className="w-full py-3 bg-cyan-500 text-slate-950 font-bold rounded-xl">نشر الإعلان</button>
            </form>
          </div>
        </div>
      )}

      <footer className={`py-8 text-center text-xs border-t ${darkMode ? 'bg-slate-950 border-slate-900 text-slate-500' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
        © {new Date().getFullYear()} سيارتي بروكر (Sayarati Broker). جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
