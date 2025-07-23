import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react'; // Import all Lucide icons needed for dynamic use
import { Globe, Mail, Phone, Eye, MessageSquare, Menu, X as CloseIcon, ChevronLeft, ChevronRight, LayoutList, Image, Text, TextSelect, ArrowUp } from 'lucide-react'; // Added ArrowUp for scroll to top

// Translations object (will be merged with CMS data)
const translations = {
  ar: {
    home: 'الرئيسية',
    portfolio: 'معرض الأعمال',
    contact: 'اتصل بنا',
    legal: 'معلومات قانونية',
    aboutMe: 'من أنا',
    greeting: 'مرحباً، أنا',
    name: 'مصمم جرافيك', // Default, will be overridden by CMS
    tagline: 'أحول الأفكار إلى تصاميم بصرية مذهلة.', // Default, will be overridden by CMS
    heroDescription: 'بصفتي مصمم جرافيك شغوف ومبدع، أمتلك خبرة واسعة في تحويل الأفكار المعقدة إلى حلول بصرية جذابة ومؤثرة. أؤمن بأن التصميم الجيد هو مفتاح التواصل الفعال وبناء الهوية البصرية القوية للعلامات التجارية.', // Default, will be overridden by CMS
    heroSkillsTitle: 'ماذا أقدم؟',
    callToAction: 'تصفح معرض أعمالي',
    portfolioIntro: 'استكشف أعمالي',
    portfolioDescription: 'هنا يمكنك استعراض مجموعة من أعمالي في مختلف تخصصات التصميم الجرافيكي.',
    all: 'الكل',
    contactTitle: 'تواصل معي',
    contactDescription: 'يسعدني تلقي استفساراتكم ومشاريعكم الجديدة. لا تترددوا في التواصل معي عبر الطرق التالية:',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    message: 'الرسالة',
    sendMessage: 'إرسال الرسالة',
    legalTitle: 'المعلومات القانونية والشروط', // Default, will be overridden by CMS
    legalContent: ``, // Default, will be overridden by CMS
    copyright: 'جميع الحقوق محفوظة.',
    yourName: 'اسمك',
    yourEmail: 'بريدك الإلكتروني',
    socialMedia: 'صفحاتي على الإنترنت',
    viewProject: 'عرض المشروع',
    additionalImages: 'صور إضافية',
    visitProject: 'زيارة المشروع',
    projectNotFound: 'المشروع غير موجود',
    projectNotFoundDesc: 'عذراً، لا يمكن العثور على تفاصيل هذا المشروع.',
    contactUsButton: 'اتصل بنا', // New translation for footer button
    prev: 'السابق', // Pagination
    next: 'التالي', // Pagination
    pageNotFound: 'الصفحة غير موجودة', // New
    pageNotFoundDesc: 'عذراً، لا يمكن العثور على هذه الصفحة.', // New
  },
  en: {
    home: 'Home',
    portfolio: 'Portfolio',
    contact: 'Contact',
    legal: 'Legal Info', // Default, will be overridden by CMS
    aboutMe: 'About Me',
    greeting: 'Hello, I\'m',
    name: 'A Graphic Designer', // Default, will be overridden by CMS
    tagline: 'Transforming ideas into stunning visual designs.', // Default, will be overridden by CMS
    heroDescription: 'As a passionate and creative graphic designer, I have extensive experience in transforming complex ideas into attractive and impactful visual solutions. I believe that good design is key to effective communication and building a strong visual identity for brands.', // Default, will be overridden by CMS
    heroSkillsTitle: 'What I Offer?',
    callToAction: 'Browse My Portfolio',
    portfolioIntro: 'Explore My Work',
    portfolioDescription: 'Here you can browse a collection of my work across various graphic design specializations.',
    all: 'All',
    contactTitle: 'Get in Touch',
    contactDescription: 'I\'d love to hear about your inquiries and new projects. Feel free to reach out to me through the following:',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    sendMessage: 'Send Message',
    legalTitle: 'Legal Information & Terms', // Default, will be overridden by CMS
    legalContent: ``, // Default, will be overridden by CMS
    copyright: 'All rights reserved.',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    socialMedia: 'My Social Media',
    viewProject: 'View Project',
    additionalImages: 'Additional Images',
    visitProject: 'Visit Project',
    projectNotFound: 'Project not found',
    projectNotFoundDesc: 'Sorry, details for this project could not be found.',
    contactUsButton: 'Contact Us', // New translation for footer button
    prev: 'Prev', // Pagination
    next: 'Next', // Pagination
    pageNotFound: 'Page not found', // New
    pageNotFoundDesc: 'Sorry, this page could not be found.', // New
  },
};

// Helper function to get Lucide icon component by name
const getLucideIcon = (iconName) => {
  // Convert kebab-case (e.g., "pen-tool") to PascalCase (e.g., "PenTool")
  const pascalCaseName = iconName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  const IconComponent = LucideIcons[pascalCaseName];
  return IconComponent ? <IconComponent size={24} /> : null;
};

// Header Component
const Header = ({ setCurrentPage, currentPage, language, setLanguage, t, isSidebarOpen, setIsSidebarOpen, globalSettings, dynamicPages }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getButtonClasses = (pageName) => {
    const baseClasses = `px-3 py-2 rounded-md transition-all duration-200`;
    const activeClasses = `bg-blue-600 text-white shadow-md`;
    const inactiveClasses = `text-gray-300 hover:text-blue-400`;

    if (currentPage === pageName) {
      return `${baseClasses} ${activeClasses}`;
    } else {
      return `${baseClasses} ${inactiveClasses}`;
    }
  };

  const designerName = language === 'ar' ? globalSettings.designer_name_ar : globalSettings.designer_name_en;

  return (
    <header className={`fixed top-0 w-full z-50 shadow-lg transition-all duration-300 bg-gray-800 text-white
      ${isScrolled ? 'py-2 text-sm bg-opacity-90 backdrop-blur-sm' : 'py-4 text-base bg-opacity-100 backdrop-blur-none'}`}>
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        {/* Clickable Designer Name */}
        <button onClick={() => setCurrentPage('home')} className={`font-bold rounded-md px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transition-all duration-300
          ${isScrolled ? 'text-xl' : 'text-2xl'} cursor-pointer`}>
          {designerName || t.name}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <button onClick={() => setCurrentPage('home')} className={getButtonClasses('home')}>
            {t.home}
          </button>
          <button onClick={() => setCurrentPage('portfolio')} className={getButtonClasses('portfolio')}>
            {t.portfolio}
          </button>
          {/* Dynamic Pages in Navigation */}
          {Object.values(dynamicPages).map(page => (
            <button key={page.slug} onClick={() => setCurrentPage(page.slug)} className={getButtonClasses(page.slug)}>
              {language === 'ar' ? page.title_ar : page.title_en}
            </button>
          ))}
          <button onClick={() => setCurrentPage('contact')} className={getButtonClasses('contact')}>
            {t.contact}
          </button>
          <button onClick={() => setCurrentPage('legal')} className={getButtonClasses('legal')}>
            {t.legal}
          </button>

          {/* Language Toggle Button */}
          <button
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className={`p-2 rounded-full transition-all duration-200 hover:text-blue-400 text-gray-300`}
            title={language === 'ar' ? 'Change to English' : 'تغيير إلى العربية'}
          >
            <Globe size={20} className="transition-transform duration-300 transform rotate-0 hover:rotate-90" />
          </button>
        </nav>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full text-gray-300 hover:text-blue-400 transition-colors duration-200"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component for Mobile
const Sidebar = ({ isOpen, setIsOpen, setCurrentPage, language, setLanguage, t, globalSettings, dynamicPages }) => {
  const handleNavigationClick = (page) => {
    setCurrentPage(page);
    setIsOpen(false); // Close sidebar after navigation
  };

  const designerName = language === 'ar' ? globalSettings.designer_name_ar : globalSettings.designer_name_en;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 ${language === 'ar' ? 'right-0' : 'left-0'} w-64 bg-gray-800 text-white p-6 shadow-lg z-50 transform transition-transform duration-300
          ${isOpen ? (language === 'ar' ? 'translate-x-0' : 'translate-x-0') : (language === 'ar' ? 'translate-x-full' : '-translate-x-full')}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            {designerName || t.name}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full text-gray-300 hover:text-blue-400 transition-colors duration-200"
            aria-label="Close menu"
          >
            <CloseIcon size={24} />
          </button>
        </div>

        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => handleNavigationClick('home')}
            className="block text-lg text-gray-300 hover:text-blue-400 px-4 py-2 rounded-md transition-colors duration-200 text-right"
          >
            {t.home}
          </button>
          <button
            onClick={() => handleNavigationClick('portfolio')}
            className="block text-lg text-gray-300 hover:text-blue-400 px-4 py-2 rounded-md transition-colors duration-200 text-right"
          >
            {t.portfolio}
          </button>
          {/* Dynamic Pages in Sidebar Navigation */}
          {Object.values(dynamicPages).map(page => (
            <button key={page.slug} onClick={() => handleNavigationClick(page.slug)} className="block text-lg text-gray-300 hover:text-blue-400 px-4 py-2 rounded-md transition-colors duration-200 text-right">
              {language === 'ar' ? page.title_ar : page.title_en}
            </button>
          ))}
          <button
            onClick={() => handleNavigationClick('contact')}
            className="block text-lg text-gray-300 hover:text-blue-400 px-4 py-2 rounded-md transition-colors duration-200 text-right"
          >
            {t.contact}
          </button>
          <button
            onClick={() => handleNavigationClick('legal')}
            className="block text-lg text-gray-300 hover:text-blue-400 px-4 py-2 rounded-md transition-colors duration-200 text-right"
          >
            {t.legal}
          </button>

          {/* Language Toggle in Sidebar */}
          <div className="pt-4 border-t border-gray-700 mt-4">
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className={`w-full text-left flex items-center ${language === 'ar' ? 'justify-end space-x-2 rtl:space-x-reverse' : 'justify-start space-x-2'} text-lg text-gray-300 hover:text-blue-400 px-4 py-2 rounded-md transition-colors duration-200`}
            >
              <Globe size={20} />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

// Hero Section Component
const Hero = ({ language, setCurrentPage, setCurrentFilter, t, globalSettings, specializations }) => {
  const handleSkillClick = (category) => {
    setCurrentPage('portfolio');
    setCurrentFilter(category);
  };

  const currentTagline = language === 'ar' ? globalSettings.tagline_ar : globalSettings.tagline_en;
  const currentHeroDescription = language === 'ar' ? globalSettings.hero_description_ar : globalSettings.hero_description_en;

  return (
    <section className="py-20 text-center flex-grow flex flex-col justify-center items-center">
      <div className="container mx-auto px-4 md:px-6 w-full">
        <div className="flex flex-col items-center justify-center">
          <img
            src={globalSettings.profile_image || "https://placehold.co/150x150/6B46C1/FFFFFF?text=Profile"}
            alt={t.aboutMe}
            className="rounded-full w-36 h-36 object-cover mb-6 shadow-lg border-4 border-blue-400"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/6B46C1/FFFFFF?text=Profile"; }}
          />
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            {t.greeting} <span className="block mt-2">{language === 'ar' ? globalSettings.designer_name_ar : globalSettings.designer_name_en || t.name}</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 mb-8">
            {currentTagline}
          </p>

          <div className="max-w-4xl mx-auto mb-12 text-gray-300 prose prose-invert">
            <div dangerouslySetInnerHTML={{ __html: currentHeroDescription }} />
          </div>

          <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-600">
            {t.heroSkillsTitle}
          </h3>
          {/* Centering for specializations: use flex and justify-center on parent */}
          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto mb-12">
            {specializations.map((skill, index) => (
              <button
                key={skill.category_slug || index}
                onClick={() => handleSkillClick(skill.category_slug)}
                className="flex flex-col items-center p-6 rounded-lg shadow-lg bg-gray-700 transform hover:scale-105 transition-transform duration-300 border border-transparent hover:border-blue-400 cursor-pointer"
              >
                <div className="text-blue-400 mb-4">{getLucideIcon(skill.icon)}</div>
                <p className="text-lg font-semibold text-gray-100 text-center">
                  {language === 'ar' ? skill.name_ar : skill.name_en}
                </p>
              </button>
            ))}
          </div>

          <button
            onClick={() => handleSkillClick('all')}
            className="bg-blue-600 text-white text-xl py-3 px-8 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
          >
            {t.callToAction}
          </button>
        </div>
      </div>
    </section>
  );
};

// Portfolio Section Component
const Portfolio = ({ language, currentFilter, setCurrentFilter, t, portfolioProjects, setCurrentPage, setSelectedProjectSlug, specializations }) => {
  const [currentPageNum, setCurrentPageNum] = useState(1); // State for pagination current page
  const itemsPerPage = 10; // Number of projects per page

  const filteredItems = currentFilter === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(item => item.category === currentFilter);

  // Calculate items for the current page
  const indexOfLastItem = currentPageNum * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastI