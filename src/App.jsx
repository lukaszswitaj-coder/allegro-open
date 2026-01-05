import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, Calendar, MapPin, CheckCircle, ArrowRight, XCircle, 
  Layers, Monitor, Cpu, Globe, Phone, Info, Clock, ExternalLink, Play, ChevronLeft, ChevronRight
} from 'lucide-react';

// Konfiguracja kolorów zgodnie z Brand Bookiem Allegro
const ALLEGRO_ORANGE_HEX = '#FF5A00'; 
const THEME_BG = 'bg-gray-900';
const THEME_CARD_BG = 'bg-gray-800';
const THEME_TEXT_MAIN = 'text-white';

// Słownik tłumaczeń dla wersji PL i ENG
const translations = {
  pl: {
    nav: ['Dlaczego warto?', 'Agenda', 'Galeria', 'Rejestracja', 'Kontakt'],
    heroTitle: 'ALLEGRO',
    heroSub: 'Przyszłość e-commerce dzieje się tutaj.',
    heroBtn: 'Zarejestruj się',
    agendaBtn: 'Zobacz Agendę',
    dateTitle: '15 Lutego 2025',
    dateDesc: 'Cały dzień napakowany wiedzą. Startujemy o 9:00.',
    placeTitle: 'Biuro Allegro',
    placeDesc: 'ul. Żelazna 51/53, Warszawa (Fabryka Norblina).',
    whyTitle: 'Dlaczego warto?',
    agendaTitle: 'Agenda',
    galleryTitle: 'Galeria',
    regTitle: 'Rejestracja Partnera',
    regSub: 'Wypełnij formularz, aby dołączyć do elitarnego grona uczestników.',
    nonSellerInfo: 'Jeśli nie sprzedajesz na Allegro, a chciałbyś wziąć udział w wydarzeniu ',
    contactLink: 'skontaktuj się z nami',
    contactTitle: 'Kontakt',
    formName: 'Imię i Nazwisko',
    formEmail: 'Adres E-mail',
    formCompany: 'Firma',
    formNip: 'NIP',
    formRole: 'Stanowisko',
    formConsent: 'Akceptuję Regulamin Wydarzenia oraz politykę prywatności Allegro.',
    formBtn: 'Potwierdź udział',
    modalErrorTitle: 'Wymagana zgoda',
    modalErrorMsg: 'Aby kontynuować, musisz zaakceptować regulamin wydarzenia.',
    modalSuccessTitle: 'Do zobaczenia!',
    modalSuccessMsg: (name, email) => `Dziękujemy za rejestrację, ${name}. Bilet wysłaliśmy na ${email}.`,
    close: 'Zamknij',
    stage: 'Scena',
    viewMap: 'Zobacz na mapie',
    office: 'Biuro Allegro (Fabryka Norblina)',
    address: 'ul. Żelazna 51/53, 00-841 Warszawa',
    writeToUs: 'Napisz do nas',
    whyCards: [
      { title: 'Wiedza', desc: 'Dostęp do najnowszych trendów i danych rynkowych.', img: '/wiedza.jpg' },
      { title: 'Networking', desc: 'Nawiąż relacje z liderami branży i ekspertami Allegro.', img: '/networking.jpg' }, // Zmień na nazwę swojego pliku z folderu public
      { title: 'Innowacje', desc: 'Zobacz narzędzia, które zmienią Twój biznes.', img: '/innowacje.jpg' }
    ],
    agendaData: [
      { time: '09:00', title: 'Rejestracja i powitalna kawa', desc: 'Networking przy porannym espresso.' },
      { time: '10:00', title: 'Keynote: Wizja Allegro 2025', desc: 'Przyszłość platformy i nowe kierunki rozwoju.' },
      { time: '11:30', title: 'E-commerce AI Revolution', desc: 'Jak sztuczna inteligencja wspiera sprzedaż.' },
      { time: '13:00', title: 'Przerwa na Lunch', desc: 'Catering premium i czas na rozmowy.' },
      { time: '14:00', title: 'Deep Dive: Allegro APIs', desc: 'Techniczne warsztaty dla deweloperów.' },
      { time: '15:30', title: 'Panel Dyskusyjny', desc: 'Najlepsi Partnerzy o sukcesach na rynku.' },
      { time: '17:00', title: 'Afterparty & Networking', desc: 'Luźne rozmowy przy muzyce i drinkach.' }
    ]
  },
  eng: {
    nav: ['Why join?', 'Agenda', 'Gallery', 'Registration', 'Contact'],
    heroTitle: 'ALLEGRO',
    heroSub: 'The future of e-commerce happens here.',
    heroBtn: 'Register now',
    agendaBtn: 'See Agenda',
    dateTitle: 'February 15, 2025',
    dateDesc: 'A full day of knowledge. We start at 9:00 AM.',
    placeTitle: 'Allegro Office',
    placeDesc: '51/53 Zelazna St, Warsaw (Norblin Factory).',
    whyTitle: 'Why join us?',
    agendaTitle: 'Agenda',
    galleryTitle: 'Gallery',
    regTitle: 'Partner Registration',
    regSub: 'Fill out the form to join the elite group of participants.',
    nonSellerInfo: "If you don't sell on Allegro and would like to participate in the event, ",
    contactLink: 'contact us',
    contactTitle: 'Contact',
    formName: 'Full Name',
    formEmail: 'E-mail Address',
    formCompany: 'Company',
    formNip: 'Tax ID (NIP)',
    formRole: 'Position',
    formConsent: 'I accept the Event Regulations and Allegro privacy policy.',
    formBtn: 'Confirm participation',
    modalErrorTitle: 'Consent required',
    modalErrorMsg: 'To continue, you must accept the event regulations.',
    modalSuccessTitle: 'See you there!',
    modalSuccessMsg: (name, email) => `Thank you for registering, ${name}. We sent the ticket to ${email}.`,
    close: 'Close',
    stage: 'Stage',
    viewMap: 'View on map',
    office: 'Allegro Office (Norblin Factory)',
    address: '51/53 Zelazna St, 00-841 Warsaw, Poland',
    writeToUs: 'Write to us',
    whyCards: [
      { title: 'Knowledge', desc: 'Access to the latest trends and market data.' },
      { title: 'Networking', desc: 'Build relationships with industry leaders and Allegro experts.' },
      { title: 'Innovation', desc: 'See tools that will transform your business.' }
    ]
  }
};

// Zdjęcia pomocnicze (można zastąpić własnymi plikami w folderze public/)
const EVENT_PHOTOS = [
  '2024-allegro-polandrock-dzien2-male-288.jpg',
  '2024-allegro-polandrock-dzien2-male-193.jpg',
  '2024-allegro-polandrock-dzien2-male-224.jpg',
  '2024-allegro-polandrock-dzien2-male-288.jpg',
  '2024-allegro-polandrock-dzien2-male-193.jpg'
];

/**
 * Komponent sekcji animowanej z użyciem Intersection Observer
 */
const AnimatedSection = ({ children, direction = 'left', className, id }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.1 }
    );
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate-x-0 translate-y-0 opacity-100';
    if (direction === 'left') return '-translate-x-12 opacity-0';
    if (direction === 'right') return 'translate-x-12 opacity-0';
    if (direction === 'up') return 'translate-y-12 opacity-0';
    return '';
  };

  return (
    <div ref={ref} id={id} className={`transition-all duration-700 ease-out transform ${getTransform()} ${className}`}>
      {children}
    </div>
  );
};

/**
 * Komponent efektu pisania tekstu w sekcji Hero
 */
const TypewriterText = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    setDisplayText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => text.slice(0, i + 1));
        i++;
      } else { clearInterval(timer); }
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);

  return <span>{displayText}<span className="animate-pulse text-orange-500">_</span></span>;
};

/**
 * Komponent nagłówka sekcji
 */
const SectionHeader = ({ title, sub, align = 'center' }) => (
  <div className={`mb-12 border-b border-gray-800 pb-8 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">{title}</h2>
    <div className={`h-1 w-20 bg-orange-500 rounded-full ${align === 'center' ? 'mx-auto' : ''} mb-4`}></div>
    {sub && <p className="text-gray-400 max-w-2xl mx-auto font-light">{sub}</p>}
  </div>
);

/**
 * Główny przycisk w stylu Allegro
 */
const PrimaryButton = ({ children, onClick, disabled, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    style={{ backgroundColor: ALLEGRO_ORANGE_HEX }}
    className={`
      relative overflow-hidden text-white font-extrabold py-4 px-10 rounded-lg shadow-[0_0_20px_rgba(255,90,0,0.3)]
      transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,90,0,0.5)]
      flex items-center justify-center space-x-3 text-lg w-full sm:w-auto group
      ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''}
    `}
  >
    <span className="relative z-10">{children}</span>
    <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
  </button>
);

/**
 * Pole wejściowe formularza
 */
const InputField = ({ label, type = 'text', name, value, onChange, placeholder, required }) => (
  <div className="w-full group">
    <label htmlFor={name} className="block text-sm font-semibold text-gray-400 mb-2 transition-colors group-focus-within:text-orange-500">
      {label} {required && <span className="text-orange-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg shadow-inner focus:bg-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-base text-white outline-none"
    />
  </div>
);

/**
 * GŁÓWNY KOMPONENT APLIKACJI
 */
const App = () => {
  const [lang, setLang] = useState('pl');
  const t = translations[lang];

  const [formData, setFormData] = useState({ name: '', email: '', company: '', nip: '', role: '', consent: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Karuzela - stan i obsługa przeciągania
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 400; 
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.consent) {
        setModalContent({
            title: t.modalErrorTitle, message: t.modalErrorMsg, icon: XCircle, iconColor: 'text-red-500'
        });
        setIsModalOpen(true);
        return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setModalContent({
        title: t.modalSuccessTitle,
        message: t.modalSuccessMsg(formData.name, formData.email),
        icon: CheckCircle,
        iconColor: 'text-green-500'
      });
      setIsModalOpen(true);
    }, 1500);
  };

  const toggleLang = () => setLang(prev => prev === 'pl' ? 'eng' : 'pl');

  return (
    <div className={`min-h-screen font-sans ${THEME_BG} ${THEME_TEXT_MAIN} overflow-x-hidden selection:bg-orange-500 selection:text-white`}>
      
      {/* Dynamiczne style globalne */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Nawigacja - Zablokowana na górze, brak hamburgera */}
      <header className="bg-gray-900/95 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-[100] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <div className="flex items-center space-x-1 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <span className="text-2xl font-black tracking-tighter" style={{ color: ALLEGRO_ORANGE_HEX }}>allegro</span>
            <span className="text-2xl font-light text-white tracking-tight">open</span>
          </div>
          
          <div className="flex items-center space-x-4 lg:space-x-8 overflow-x-auto no-scrollbar w-full md:w-auto justify-center">
            <nav className="flex space-x-4 lg:space-x-8 whitespace-nowrap">
              {t.nav.map((item, idx) => (
                <a key={idx} href={`#${translations.pl.nav[idx].toLowerCase().replace(' ', '-').replace('?', '')}`} className="text-xs lg:text-sm font-medium text-gray-400 hover:text-orange-500 transition-colors uppercase tracking-wide py-2">
                  {item}
                </a>
              ))}
            </nav>
            <button onClick={toggleLang} className="flex items-center space-x-2 text-xs font-mono text-gray-400 hover:text-white transition-colors border border-gray-700 px-3 py-1 rounded-full bg-gray-800/50 flex-shrink-0">
               <Globe size={14} />
               <span className="hidden sm:inline">{lang === 'pl' ? 'PL 🇵🇱' : 'EN 🇬🇧'}</span>
               <span className="sm:hidden">{lang === 'pl' ? 'PL' : 'EN'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mt-28 md:mt-16">
        {/* SEKCOJA HERO */}
        <section className="relative pt-24 pb-32 overflow-hidden border-b border-gray-800">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_#ff5a00_0%,_transparent_60%)] opacity-20 blur-3xl animate-pulse"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-tight">
              <span className="block text-white uppercase">{t.heroTitle}</span>
              <span style={{ color: ALLEGRO_ORANGE_HEX }}><TypewriterText text={`OPEN 2025`} delay={150} /></span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">{t.heroSub}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#rejestracja" className="w-full sm:w-auto"><PrimaryButton>{t.heroBtn}</PrimaryButton></a>
              <a href="#agenda" className="w-full sm:w-auto">
                <button className="px-8 py-4 rounded-lg text-white font-semibold hover:bg-white/5 transition border border-gray-700 hover:border-gray-500 w-full sm:w-auto">{t.agendaBtn}</button>
              </a>
            </div>
          </div>
        </section>

        {/* BOX INFORMACYJNY - DATA I MIEJSCE */}
        <AnimatedSection direction="up" id="o-evencie" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-gray-800 rounded-2xl shadow-xl border-l-4 border-orange-500 flex items-center space-x-6 border-gray-700">
               <Calendar size={40} className="text-orange-500 flex-shrink-0" />
               <div><h3 className="text-xl font-bold text-white">{t.dateTitle}</h3><p className="text-gray-400 font-light">{t.dateDesc}</p></div>
            </div>
            <div className="p-8 bg-gray-800 rounded-2xl shadow-xl border-l-4 border-yellow-400 flex items-center space-x-6 border-gray-700">
               <MapPin size={40} className="text-yellow-400 flex-shrink-0" />
               <div><h3 className="text-xl font-bold text-white">{t.placeTitle}</h3><p className="text-gray-400 font-light">{t.placeDesc}</p></div>
            </div>
          </div>
        </AnimatedSection>

        {/* DLACZEGO WARTO? */}
        <AnimatedSection direction="up" id="dlaczego-warto" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <SectionHeader title={t.whyTitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {t.whyCards.map((card, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-700 mb-6 group">
                  {/* OBRAZEK POBIERANY Z card.img ZDEFINIOWANEGO W translations */}
                  <img 
                    src={card.img} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt={card.title} 
                    onError={(e) => { e.target.src = `https://placehold.co/800x600/111827/FF5A00?text=${encodeURIComponent(card.title)}`; }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-tight">{card.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* AGENDA - 3 SCENY */}
        <AnimatedSection direction="up" id="agenda" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gray-800/20">
          <SectionHeader title={t.agendaTitle} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map(num => (
              <div key={num} className="flex flex-col">
                <div className="relative h-48 rounded-t-2xl overflow-hidden border-x border-t border-gray-700">
                  <img src={`/stage+0${num}.jpg`} className="w-full h-full object-cover opacity-50" alt="Stage" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40"><h4 className="text-2xl font-black text-white italic">{t.stage} 0{num}</h4></div>
                </div>
                <div className="p-6 bg-gray-800 rounded-b-2xl border border-gray-700 shadow-xl space-y-6">
                  {t.agendaData.map((item, idx) => (
                    <div key={idx} className="flex group">
                      <div className="mr-4 text-orange-500 font-mono text-sm pt-0.5 w-16 flex-shrink-0">{item.time}</div>
                      <div className="flex-1 border-l border-gray-700 pl-4 pb-4">
                        <h5 className="text-white font-bold text-sm mb-1 group-hover:text-orange-400 transition-colors">{item.title}</h5>
                        <p className="text-gray-400 text-xs font-light">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* GALERIA I WIDEO PROMO */}
        <AnimatedSection direction="up" id="galeria" className="py-24 bg-black/40">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeader title={t.galleryTitle} />
              
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900">
                <iframe 
                  className="w-full h-full absolute inset-0"
                  src="https://www.youtube.com/embed/ljzyx7dwQek" 
                  title="Allegro Open Promo Video"
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>

              {/* Karuzela zdjęć z obsługą chwytania (drag) */}
              <div className="mt-12 relative group/carousel">
                 <div 
                  ref={carouselRef}
                  onMouseDown={handleMouseDown}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                  className={`flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 scroll-smooth cursor-grab active:cursor-grabbing ${isDragging ? 'snap-none' : ''}`}
                 >
                    {EVENT_PHOTOS.map((img, idx) => (
                       <div key={idx} className="flex-none w-64 sm:w-96 aspect-video rounded-xl overflow-hidden snap-center border border-gray-800 hover:border-orange-500/50 transition-colors pointer-events-none select-none">
                          <img 
                            src={img} 
                            className="w-full h-full object-cover" 
                            alt={`Event Photo ${idx+1}`}
                            onError={(e) => { e.target.src = `/foto+0${idx+1}.jpg`; }}
                          />
                       </div>
                    ))}
                 </div>
                 <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => scrollCarousel('left')} className="p-2 rounded-full border border-gray-700 text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors"><ChevronLeft size={20} /></button>
                    <button onClick={() => scrollCarousel('right')} className="p-2 rounded-full border border-gray-700 text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors"><ChevronRight size={20} /></button>
                 </div>
              </div>
           </div>
        </AnimatedSection>

        {/* FORMULARZ REJESTRACJI */}
        <AnimatedSection direction="up" id="rejestracja" className="py-24 relative overflow-hidden">
           <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px]"></div>
           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="text-center mb-12">
               <h2 className="text-4xl font-black text-white mb-4 uppercase">{t.regTitle}</h2>
               <p className="text-gray-400 text-lg font-light">{t.regSub}</p>
             </div>
             <form onSubmit={handleSubmit} className="bg-gray-800 p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                 <InputField label={t.formName} name="name" value={formData.name} onChange={handleChange} placeholder="Anna Nowak" required />
                 <InputField label={t.formEmail} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="anna@firma.pl" required />
                 <InputField label={t.formCompany} name="company" value={formData.company} onChange={handleChange} placeholder="Super Partner" required />
                 <InputField label={t.formNip} name="nip" value={formData.nip} onChange={handleChange} placeholder="1234567890" required />
                 <InputField label={t.formRole} name="role" value={formData.role} onChange={handleChange} placeholder="Senior Developer" required />
               </div>
               <div className="flex items-start mb-8 p-4 bg-gray-700/30 rounded-lg border border-gray-700">
                  <input id="consent" name="consent" type="checkbox" checked={formData.consent} onChange={handleChange} className="mt-1 h-5 w-5 rounded border-gray-600 bg-gray-700 text-orange-600 focus:ring-orange-500 cursor-pointer accent-orange-500" />
                  <label htmlFor="consent" className="ml-3 block text-sm text-gray-300 cursor-pointer">{t.formConsent}</label>
               </div>
               <div className="flex flex-col items-center space-y-4">
                 <PrimaryButton type="submit" disabled={isLoading}>{isLoading ? '...' : t.formBtn}</PrimaryButton>
                 
                 <p className="text-gray-400 text-sm font-light text-center">
                   {t.nonSellerInfo}
                   <a href="mailto:open@allegro.pl" className="text-orange-500 hover:text-orange-400 font-medium underline underline-offset-4 transition-colors">
                     {t.contactLink}
                   </a>.
                 </p>
               </div>
             </form>
           </div>
        </AnimatedSection>

        {/* KONTAKT I MAPA */}
        <AnimatedSection direction="up" id="kontakt" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <SectionHeader title={t.contactTitle} />
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Informacje kontaktowe */}
            <div className="flex-1 bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-start space-x-6 mb-8">
                  <div className="p-4 bg-orange-500/10 rounded-xl text-orange-500 flex-shrink-0"><MapPin size={32} /></div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">{t.office}</h4>
                    <p className="text-gray-400 font-light leading-relaxed">{t.address}</p>
                    <a href="https://maps.app.goo.gl/YourMapLinkHere" target="_blank" rel="noreferrer" className="inline-flex items-center text-orange-500 mt-2 hover:text-orange-400 transition-colors text-sm font-semibold">
                       <ExternalLink size={16} className="mr-2" /> {t.viewMap}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-blue-500/10 rounded-xl text-blue-500 flex-shrink-0"><Mail size={32} /></div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">E-mail</h4>
                    <a href="mailto:open@allegro.pl" className="text-orange-500 font-medium hover:text-orange-400 transition-colors">
                      {t.writeToUs}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 p-6 border border-gray-700 rounded-xl bg-gray-900/50 flex items-center justify-between">
                 <div className="flex items-center space-x-4">
                   <Info size={24} className="text-gray-500 flex-shrink-0" />
                   <p className="text-xs text-gray-500 max-w-[200px]">Zapraszamy do wejścia głównego od strony ul. Prostej.</p>
                 </div>
                 <Layers size={32} className="text-gray-800" />
              </div>
            </div>

            {/* INTERAKTYWNA MAPA GOOGLE - USUNIĘTO FILTRY I POPRAWIONO LOKALIZACJĘ */}
              <div className="flex-1 bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl min-h-[400px]">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.600275607402!2d20.988479277830084!3d52.23247967198709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc856f077761%3A0x28f9f4aacd07c83a!2sFabryka%20Norblina!5e0!3m2!1sen!2spl!4v1767617696860!5m2!1sen!2spl" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
               ></iframe>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <footer className="bg-black text-gray-500 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
          <div className="flex items-center space-x-1 mb-4 opacity-75">
            <span className="text-xl font-black tracking-tighter text-orange-600">allegro</span>
            <span className="text-xl font-light text-gray-400 tracking-tight">open</span>
          </div>
          <p className="text-xs font-light tracking-widest uppercase">&copy; 2025 Allegro Open. Warsaw.</p>
        </div>
      </footer>

      {/* Powiadomienie Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 max-w-md w-full transform animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
                <div className={`p-4 rounded-full ${modalContent.iconColor.includes('red') ? 'bg-red-900/30' : 'bg-green-900/30'} mb-4`}><modalContent.icon size={40} className={modalContent.iconColor} /></div>
                <h3 className="text-2xl font-bold text-white mb-2">{modalContent.title}</h3>
                <p className="text-gray-400 mb-6 font-light">{modalContent.message}</p>
                <button onClick={() => setIsModalOpen(false)} className="w-full py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors border border-gray-600 uppercase tracking-widest text-xs">{t.close}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;