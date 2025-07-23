import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react'; // Import all Lucide icons needed for dynamic use
import { Globe, Mail, Phone, Eye, MessageSquare, Menu, X as CloseIcon, ChevronLeft, ChevronRight, LayoutList, Image, Text, TextSelect } from 'lucide-react'; // Added icons for dynamic pages

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

  const designerName = language === 'ar' ? globalSettings.designer_name_ar : globalSettings.designer_en;

  return (
    <header className={`fixed top-0 w-full z-50 shadow-lg transition-all duration-300 bg-gray-800 text-white
      ${isScrolled ? 'py-2 text-sm bg-opacity-90 backdrop-blur-sm' : 'py-4 text-base bg-opacity-100 backdrop-blur-none'}`}>
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <h1 className={`font-bold rounded-md px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transition-all duration-300
          ${isScrolled ? 'text-xl' : 'text-2xl'}`}>
          {designerName || t.name}
        </h1>

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
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleViewProject = (project) => {
    setSelectedProjectSlug(project.slug);
    setCurrentPage('projectDetail');
  };

  const paginate = (pageNumber) => {
    setCurrentPageNum(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  };

  return (
    <section className="py-16 flex-grow flex flex-col justify-between">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          {t.portfolioIntro}
        </h2>
        <p className="text-center text-lg max-w-3xl mx-auto mb-12 opacity-90">
          {t.portfolioDescription}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => { setCurrentFilter('all'); setCurrentPageNum(1); }}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-md
              ${currentFilter === 'all' ? 'bg-blue-600 text-white transform scale-105' : 'bg-gray-700 text-gray-300 hover:text-blue-400'}`}
          >
            {t.all}
          </button>
          {specializations.map((spec) => (
            <button
              key={spec.category_slug}
              onClick={() => { setCurrentFilter(spec.category_slug); setCurrentPageNum(1); }}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-md
                ${currentFilter === spec.category_slug ? 'bg-blue-600 text-white transform scale-105' : 'bg-gray-700 text-gray-300 hover:text-blue-400'}`}
            >
              {language === 'ar' ? spec.name_ar : spec.name_en}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-gray-700 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300
                         dark:shadow-none dark:border dark:border-gray-600"
            >
              <img
                src={item.main_image || "https://placehold.co/600x400/CCCCCC/333333?text=Image+Error"}
                alt={language === 'ar' ? item.title_ar : item.title_en}
                className="w-full h-56 object-cover transition-opacity duration-300 group-hover:opacity-70"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/333333?text=Image+Error"; }}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'ar' ? item.title_ar : item.title_en}
                </h3>
                <p className="text-gray-300">
                  {language === 'ar' ? item.short_description_ar : item.short_description_en}
                </p>
              </div>
              {/* Overlay with View Project button */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleViewProject(item)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2"
                >
                  <Eye size={20} /> {t.viewProject}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={() => paginate(currentPageNum - 1)}
              disabled={currentPageNum === 1}
              className="p-3 rounded-full bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Conditional arrow direction for "Previous" */}
              {language === 'ar' ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              <span className="sr-only">{t.prev}</span>
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300
                  ${currentPageNum === index + 1 ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPageNum + 1)}
              disabled={currentPageNum === totalPages}
              className="p-3 rounded-full bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Conditional arrow direction for "Next" */}
              {language === 'ar' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              <span className="sr-only">{t.next}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// Project Detail Page Component
const ProjectDetail = ({ project, language, t }) => {
  if (!project) {
    return (
      <section className="py-16 text-center flex-grow flex flex-col justify-center items-center">
        <div className="container mx-auto px-4 md:px-6 w-full">
          <h2 className="text-3xl font-bold mb-4">{t.projectNotFound}</h2>
          <p className="text-lg text-gray-400">{t.projectNotFoundDesc}</p>
        </div>
      </section>
    );
  }

  const title = language === 'ar' ? project.title_ar : project.title_en;
  const description = language === 'ar' ? project.short_description_ar : project.short_description_en;
  const bodyContent = language === 'ar' ? project.body_ar : project.body_en;
  const additionalImages = project.additional_images || [];

  return (
    <section className="py-16 flex-grow flex flex-col justify-between">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          {title}
        </h2>
        <img
          src={project.main_image || "https://placehold.co/800x500/CCCCCC/333333?text=Project+Image"}
          alt={title}
          className="w-full max-w-4xl h-auto max-h-96 object-contain rounded-lg shadow-lg mb-8 mx-auto block"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x500/CCCCCC/333333?text=Project+Image"; }}
        />
        {additionalImages.length > 0 && (
          <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalImages.map((img, index) => (
              <img
                key={index}
                src={img.image || `https://placehold.co/600x400/CCCCCC/333333?text=Image+${index + 1}`}
                alt={`${title} - Image ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-md"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/CCCCCC/333333?text=Image+${index + 1}`; }}
              />
            ))}
          </div>
        )}
        <p className="text-lg text-gray-300 text-center mb-8 max-w-3xl mx-auto">
          {description}
        </p>

        {project.project_url && (
          <div className="text-center mb-8">
            <a
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-green-700 transition-colors duration-300 shadow-lg"
            >
              {t.visitProject}
            </a>
          </div>
        )}

        {bodyContent && (
          <div className="bg-gray-700 p-8 rounded-lg shadow-xl prose prose-invert max-w-none mx-auto">
            <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
          </div>
        )}
      </div>
    </section>
  );
};


// Contact Section Component
const Contact = ({ language, t, globalSettings }) => {
  const socialLinks = globalSettings.social_links || [];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900 transition-colors duration-300 flex-grow flex flex-col justify-center items-center">
      <div className="container mx-auto px-4 md:px-6 w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-white">
          {t.contactTitle}
        </h2>
        <p className="text-center text-lg max-w-3xl mx-auto mb-12 opacity-90 text-gray-300">
          {t.contactDescription}
        </p>

        <div className="flex justify-center">
          <div className="bg-gray-700 p-8 rounded-lg shadow-xl w-full max-w-lg text-center">
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center gap-3">
                <Mail size={20} className="text-blue-400" />
                <a href={`mailto:${globalSettings.contact_email || 'your.email@example.com'}`} className="text-blue-400 hover:underline" dir="ltr">
                  {globalSettings.contact_email || 'your.email@example.com'}
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone size={20} className="text-blue-400" />
                <a href={`tel:${globalSettings.contact_phone || '+1234567890'}`} className="text-blue-400 hover:underline" dir="ltr">
                  {globalSettings.contact_phone || '+123 456 7890'}
                </a>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-6 text-white">{t.socialMedia}</h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map((link, index) => {
                const IconComponent = getLucideIcon(link.icon);
                return IconComponent ? (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-600 text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md"
                    title={link.platform_name}
                  >
                    {IconComponent}
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section Renderer for Dynamic Pages
const SectionRenderer = ({ section, language, t }) => {
  const heading = language === 'ar' ? section.heading_ar : section.heading_en;
  const content = language === 'ar' ? section.content_ar : section.content_en;
  const alt = language === 'ar' ? section.alt_ar : section.alt_en;
  const caption = language === 'ar' ? section.caption_ar : section.caption_en;

  switch (section.type) {
    case 'text_block':
      return (
        <div className="bg-gray-700 p-8 rounded-lg shadow-xl mb-8 prose prose-invert max-w-none mx-auto">
          {heading && <h2 className="text-3xl font-bold mb-4">{heading}</h2>}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      );
    case 'image_block':
      return (
        <div className="bg-gray-700 p-8 rounded-lg shadow-xl mb-8 text-center">
          <img
            src={section.image || "https://placehold.co/800x500/CCCCCC/333333?text=Image+Block"}
            alt={alt || "Image"}
            className="w-full h-auto object-contain rounded-lg mb-4 mx-auto"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x500/CCCCCC/333333?text=Image+Block"; }}
          />
          {caption && <p className="text-gray-300 text-sm">{caption}</p>}
        </div>
      );
    case 'text_image_block':
      const imageOrderClass = section.image_position === 'left' ? 'md:flex-row-reverse' : 'md:flex-row';
      return (
        <div className={`bg-gray-700 p-8 rounded-lg shadow-xl mb-8 flex flex-col md:flex-row items-center gap-8 ${imageOrderClass}`}>
          <div className="md:w-1/2 w-full">
            <img
              src={section.image || "https://placehold.co/800x500/CCCCCC/333333?text=Image+Block"}
              alt={alt || "Image"}
              className="w-full h-auto object-contain rounded-lg mb-4 md:mb-0"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x500/CCCCCC/333333?text=Image+Block"; }}
            />
            {caption && <p className="text-gray-300 text-sm mt-2 text-center">{caption}</p>}
          </div>
          <div className="md:w-1/2 w-full prose prose-invert">
            {heading && <h2 className="text-3xl font-bold mb-4">{heading}</h2>}
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      );
    default:
      return null;
  }
};

// Dynamic Page Component
const DynamicPage = ({ pageData, language, t }) => {
  if (!pageData || !pageData.sections) {
    return (
      <section className="py-16 text-center flex-grow flex flex-col justify-center items-center">
        <div className="container mx-auto px-4 md:px-6 w-full">
          <h2 className="text-3xl font-bold mb-4">{t.pageNotFound}</h2>
          <p className="text-lg text-gray-400">{t.pageNotFoundDesc}</p>
        </div>
      </section>
    );
  }

  const pageTitle = language === 'ar' ? pageData.title_ar : pageData.title_en;
  const metaDescription = language === 'ar' ? pageData.meta_description_ar : pageData.meta_description_en;

  // Update document title and meta description for dynamic pages
  useEffect(() => {
    if (pageTitle) {
      document.title = pageTitle;
    }
    if (metaDescription) {
      let metaDescTag = document.querySelector('meta[name="description"]');
      if (!metaDescTag) {
        metaDescTag = document.createElement('meta');
        metaDescTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescTag);
      }
      metaDescTag.setAttribute('content', metaDescription);
    }
    // Restore default meta description if navigating away from a dynamic page
    return () => {
      if (metaDescription) {
        const defaultMetaDescription = language === 'ar' ? translations.ar.metaDescription : translations.en.metaDescription;
        let metaDescTag = document.querySelector('meta[name="description"]');
        if (metaDescTag) {
          metaDescTag.setAttribute('content', defaultMetaDescription);
        }
      }
    };
  }, [pageData, language, pageTitle, metaDescription]);


  return (
    <section className="py-16 flex-grow flex flex-col justify-between">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          {pageTitle}
        </h1>
        {pageData.sections.map((section, index) => (
          <SectionRenderer key={index} section={section} language={language} t={t} />
        ))}
      </div>
    </section>
  );
};


// Legal Information Component
const Legal = ({ language, t, legalInfo }) => {
  const legalTitle = language === 'ar' ? legalInfo.title_ar : legalInfo.title_en;
  const legalContentHtml = language === 'ar' ? legalInfo.content_ar : legalInfo.content_en;

  return (
    <section className="py-16 flex-grow flex flex-col justify-between">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          {legalTitle || t.legalTitle}
        </h2>
        <div
          className="bg-gray-700 p-8 rounded-lg shadow-xl prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: legalContentHtml || t.legalContent }}
        ></div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = ({ language, t, globalSettings, setCurrentPage }) => {
  const designerName = language === 'ar' ? globalSettings.designer_name_ar : globalSettings.designer_name_en;
  return (
    <footer className="py-8 text-center text-sm opacity-80 mt-12 bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center">
        {/* Contact Us Button - now above copyright */}
        <button
          onClick={() => setCurrentPage('contact')}
          className="bg-blue-600 text-white text-base py-2 px-6 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg flex items-center gap-2 mb-4" {/* Added mb-4 for spacing */}
        >
          <MessageSquare size={20} /> {t.contactUsButton}
        </button>
        {/* Copyright - now last */}
        <p>&copy; {new Date().getFullYear()} {designerName || t.name}. {t.copyright}</p>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  // Initialize state from localStorage or browser preferences
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? savedPage : 'home';
  });

  const [currentFilter, setCurrentFilter] = useState('all');

  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      return savedLanguage;
    }
    // Detect browser language
    const browserLanguage = navigator.language.split('-')[0]; // e.g., "en-US" -> "en"
    return browserLanguage === 'ar' ? 'ar' : 'en'; // Default to English if not Arabic
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [globalSettings, setGlobalSettings] = useState({});
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [specializations, setSpecializations] = useState([]); // New state for specializations
  const [legalInfo, setLegalInfo] = useState({});
  const [dynamicPages, setDynamicPages] = useState({}); // New state for dynamic pages
  const [selectedProjectSlug, setSelectedProjectSlug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Set document direction and font based on language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    // Force Zain font for both languages
    document.documentElement.style.fontFamily = "'Zain', sans-serif";
    // Save language to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  // Save currentPage to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  // Update document title and meta description dynamically for static pages (home, portfolio, contact, legal)
  useEffect(() => {
    const defaultPageTitle = language === 'ar' ? translations.ar.page_title_ar : translations.en.page_title_en;
    const defaultMetaDescription = language === 'ar' ? translations.ar.meta_description_ar : translations.en.meta_description_en;
    const favicon = globalSettings.favicon;

    let titleToSet = defaultPageTitle;
    let metaDescToSet = defaultMetaDescription;

    // Override with global settings if available and on a static page
    if (globalSettings.page_title_ar && (currentPage === 'home' || currentPage === 'portfolio' || currentPage === 'contact' || currentPage === 'legal')) {
      titleToSet = language === 'ar' ? globalSettings.page_title_ar : globalSettings.page_title_en;
    }
    if (globalSettings.meta_description_ar && (currentPage === 'home' || currentPage === 'portfolio' || currentPage === 'contact' || currentPage === 'legal')) {
      metaDescToSet = language === 'ar' ? globalSettings.meta_description_ar : globalSettings.meta_description_en;
    }

    document.title = titleToSet;

    let metaDescTag = document.querySelector('meta[name="description"]');
    if (!metaDescTag) {
      metaDescTag = document.createElement('meta');
      metaDescTag.setAttribute('name', 'description');
      document.head.appendChild(metaDescTag);
    }
    metaDescTag.setAttribute('content', metaDescToSet);

    if (favicon) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = favicon;
    }
  }, [globalSettings, language, currentPage]);


  // Fetch data from CMS-generated JSON files
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch global settings
        const globalResponse = await fetch('/data/global.json');
        if (!globalResponse.ok) {
          console.warn("global.json not found, using default settings. Please publish from CMS.");
          setGlobalSettings({}); // Set to empty object to use defaults from translations
        } else {
          const globalData = await globalResponse.json();
          setGlobalSettings(globalData);
        }

        // Fetch legal info
        const legalResponse = await fetch('/data/legal.json');
        if (!legalResponse.ok) {
          console.warn("legal.json not found, using default legal info. Please publish from CMS.");
          setLegalInfo({}); // Set to empty object to use defaults from translations
        } else {
          const legalData = await legalResponse.json();
          setLegalInfo(legalData);
        }

        // Fetch specializations
        const specializationsResponse = await fetch('/data/specializations.json');
        if (!specializationsResponse.ok) {
          console.warn("specializations.json not found, using empty specializations. Please publish from CMS.");
          setSpecializations([]); // Set to empty array
        } else {
          const specializationsData = await specializationsResponse.json();
          // Assuming specializations.json contains an object with a 'specializations' array
          setSpecializations(specializationsData.specializations || []);
        }

        // Fetch portfolio projects
        const portfolioResponse = await fetch('/data/portfolio.json');
        if (!portfolioResponse.ok) {
          console.warn("portfolio.json not found, using empty portfolio. Please publish from CMS.");
          setPortfolioProjects([]); // Set to empty array
        } else {
          const portfolioData = await portfolioResponse.json();
          // Add a slug to each project for routing and ensure unique ID
          const projectsWithSlugs = (portfolioData.projects || []).map(project => ({
            ...project,
            slug: (language === 'ar' ? project.title_ar : project.title_en)
              .toLowerCase()
              .replace(/ /g, '-')
              .replace(/[^\w-]+/g, ''), // Basic slug generation
            id: project.id || Math.random().toString(36).substring(2, 9) // Ensure unique ID
          }));
          setPortfolioProjects(projectsWithSlugs);
        }

        // Fetch dynamic pages
        // Get list of page files from public/data/pages/ (requires a server-side endpoint or knowing slugs)
        // For simplicity, we'll assume we know the slugs or fetch a list of slugs.
        // Decap CMS 'folder' collections store each entry as a separate file.
        // We'll need to list the files in the 'public/data/pages/' directory.
        // This is tricky for a client-side React app without a backend.

        // A better approach for dynamic pages with Decap CMS folder collection:
        // Decap CMS generates a `collection.json` file for folder collections
        // if configured with `summary: '{{slug}}'` and `format: 'json'` or `yaml`.
        // However, the standard way is to fetch each file by its slug.
        // For now, let's assume we fetch a list of page slugs first, then fetch each page.
        // Or, even simpler, list the pages in config.yml as a 'file' collection.

        // Let's adjust App.js to fetch all files from 'public/data/pages/'
        // This requires a bit of a workaround for client-side fetch.
        // The most robust way is to have a list of page slugs from CMS itself.
        // Given the config.yml uses `folder`, Decap CMS creates individual JSON files.
        // We need to fetch a list of these files. This is not directly possible from client-side.

        // Re-thinking dynamic pages:
        // To make dynamic pages truly discoverable and manageable from CMS
        // and fetchable from client-side, we need a "master list" of pages.
        // The current `config.yml` for `dynamic_pages` uses `folder`. This means
        // each page (e.g., `about-us.json`, `my-services.json`) is a separate file.
        // To get a list of all pages, the React app would need to know their slugs in advance,
        // or there would need to be a separate CMS collection that lists all dynamic pages.
        // The simplest client-side way is if Decap CMS *also* generated a single JSON file
        // containing a list of all entries in a folder collection. This is not standard.

        // Alternative: Use a "list" widget within a single file for dynamic pages.
        // This would be similar to `specializations_list` or `portfolio_projects`.
        // Let's modify `config.yml` to reflect this for `dynamic_pages`.
        // This makes fetching much easier.

        // ***Correction: The current config.yml for `dynamic_pages` uses `folder`.
        // This implies each page is a separate file. To list them, the app needs to know slugs.
        // The most common way to handle this in a static site is to have a "pages_list.json"
        // that CMS also manages, which simply lists the slugs of active pages.
        // Or, we can change `dynamic_pages` to be a `file` collection with a `list` of pages.
        // Let's go with the `file` collection with a `list` of pages for simplicity in React.
        // This means `config.yml` needs another small adjustment.

        // For now, I will assume dynamic pages are fetched based on a known slug if navigated directly.
        // To list them in navigation, we need a way to get all slugs.
        // I will add a placeholder for `dynamicPages` fetch, and adjust `config.yml` in the next step
        // if the user confirms this approach.

        // For the current `App.js`, I will fetch a specific example dynamic page if a slug is known.
        // But for navigation, we need a list.
        // Let's make `dynamicPages` an object where keys are slugs and values are page data.

        // Fetch all dynamic pages by iterating over known slugs.
        // This is a limitation without a backend or a "pages_list.json" generated by CMS.
        // For now, I will fetch them by listing files in the `data/pages` directory.
        // This is a common pattern for static sites where you might have a pre-generated list
        // of content files. Since Decap CMS creates these files, we need to know their names.

        // Let's adjust `App.js` to try to fetch all files in `public/data/pages/`
        // This is not directly possible via client-side fetch.
        // The `folder` collection in Decap CMS does not automatically generate an index.json.
        // To make `dynamicPages` work for navigation, we need to either:
        // 1. Change `dynamic_pages` collection type in `config.yml` to `files` and have a single file with a list of pages. (Recommended for simplicity)
        // 2. Or, manually add slugs to `dynamicPages` state for navigation and fetch on demand.
        // 3. Or, have a separate collection just for navigation links.

        // Given the current `config.yml` for `dynamic_pages` is `folder`, I need to change it
        // to `files` with a list of pages for easier fetching in App.js.
        // I will make this change in the `config.yml` provided in this response,
        // and update `App.js` accordingly.

        // ***REVISED STRATEGY FOR DYNAMIC PAGES IN `config.yml` AND `App.js`***
        // `config.yml`: Change `dynamic_pages` from `folder` to `files` collection,
        // with a single file (e.g., `public/data/dynamic_pages_list.json`) containing a `list` of pages.
        // Each item in the list will be a page with its sections.
        // This makes fetching all pages for navigation straightforward.

        // Re-fetching global settings and legal info for App.js
        // The previous fetch logic for global and legal info was correct.
        // Now, for dynamic pages:
        const dynamicPagesResponse = await fetch('/data/dynamic_pages_list.json');
        if (!dynamicPagesResponse.ok) {
          console.warn("dynamic_pages_list.json not found, using empty dynamic pages. Please publish from CMS.");
          setDynamicPages({});
        } else {
          const dynamicPagesData = await dynamicPagesResponse.json();
          // Transform the array of pages into an object keyed by slug for easy lookup
          const pagesMap = (dynamicPagesData.pages || []).reduce((acc, page) => {
            acc[page.slug] = page;
            return acc;
          }, {});
          setDynamicPages(pagesMap);
        }

      } catch (e) {
        console.error("Failed to fetch CMS data:", e);
        setError("Failed to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]); // Re-fetch if language changes (for slug generation based on title)

  // Scroll to top when currentPage or selectedProjectSlug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentPage, selectedProjectSlug]);

  const t = translations[language];

  // Render content based on currentPage
  const renderPage = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen-minus-header">
          <div className="text-xl text-gray-300">{language === 'ar' ? 'جاري تحميل المحتوى...' : 'Loading content...'}</div>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex justify-center items-center h-screen-minus-header text-red-400">
          <div className="text-xl">{error}</div>
        </div>
      );
    }

    // Check if currentPage matches a dynamic page slug
    if (dynamicPages[currentPage]) {
      return <DynamicPage pageData={dynamicPages[currentPage]} language={language} t={t} />;
    }

    switch (currentPage) {
      case 'home':
        return <Hero language={language} setCurrentPage={setCurrentPage} setCurrentFilter={setCurrentFilter} t={t} globalSettings={globalSettings} specializations={specializations} />;
      case 'portfolio':
        return <Portfolio language={language} currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} t={t} portfolioProjects={portfolioProjects} setCurrentPage={setCurrentPage} setSelectedProjectSlug={setSelectedProjectSlug} specializations={specializations} />;
      case 'projectDetail':
        const project = portfolioProjects.find(p => p.slug === selectedProjectSlug);
        return <ProjectDetail project={project} language={language} t={t} />;
      case 'contact':
        return <Contact language={language} t={t} globalSettings={globalSettings} />;
      case 'legal':
        return <Legal language={language} t={t} legalInfo={legalInfo} />;
      default:
        // Fallback for unknown pages (e.g., if a dynamic page slug is invalid)
        return (
          <section className="py-16 text-center flex-grow flex flex-col justify-center items-center">
            <div className="container mx-auto px-4 md:px-6 w-full">
              <h2 className="text-3xl font-bold mb-4">{t.pageNotFound}</h2>
              <p className="text-lg text-gray-400">{t.pageNotFoundDesc}</p>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Header
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        language={language}
        setLanguage={setLanguage}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        t={t}
        globalSettings={globalSettings}
        dynamicPages={dynamicPages}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
        t={t}
        globalSettings={globalSettings}
        dynamicPages={dynamicPages}
      />
      <main className="flex-grow pt-16 md:pt-20">
        {renderPage()}
      </main>
      <Footer language={language} t={t} globalSettings={globalSettings} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
