import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageCircle, Users, Target, Repeat,
    Database, Link, Zap, TrendingUp,
    Headphones, Cpu, Check,
    Instagram, Linkedin, Menu, X,
    Music, ChevronDown, Rocket, MessageSquare, Code
} from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility Functions ---
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// --- Components ---

// Grid Pattern Component (Light Mode - Transparent)
const GridPattern = () => (
    <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>
);

// Floating Element Component
const FloatingElement = ({ children, className, delay = 0 }) => (
    <motion.div
        animate={{
            y: [0, -15, 0],
        }}
        transition={{
            duration: 3,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
        }}
        className={className}
    >
        {children}
    </motion.div>
);

// Background Icons Component
const BackgroundIcons = () => {
    const icons = [
        { Icon: Code, top: "10%", left: "5%", size: 48, color: "text-clove-purple", delay: 0 },
        { Icon: Zap, top: "25%", right: "10%", size: 40, color: "text-clove-orange", delay: 1.5 },
        { Icon: MessageCircle, bottom: "15%", left: "15%", size: 56, color: "text-clove-blue", delay: 2 },
        { Icon: Rocket, top: "40%", left: "80%", size: 36, color: "text-clove-pink", delay: 0.5 },
        { Icon: Database, bottom: "30%", right: "5%", size: 42, color: "text-gray-300", delay: 3 },
        { Icon: Target, top: "15%", left: "40%", size: 32, color: "text-clove-purple", delay: 4 },
        { Icon: Link, bottom: "10%", right: "30%", size: 38, color: "text-clove-blue", delay: 1 },
        { Icon: Cpu, top: "60%", left: "2%", size: 50, color: "text-gray-300", delay: 2.5 },
        { Icon: Music, top: "5%", right: "25%", size: 30, color: "text-clove-orange", delay: 1.2 },
        { Icon: TrendingUp, bottom: "45%", left: "10%", size: 34, color: "text-clove-green", delay: 3.5 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {icons.map((item, index) => (
                <div key={index} className="absolute" style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}>
                    <FloatingElement delay={item.delay}>
                        <item.Icon size={item.size} className={`opacity-20 ${item.color}`} />
                    </FloatingElement>
                </div>
            ))}
        </div>
    );
};

// Typewriter Effect Component
// Typewriter Effect Component
const TypewriterEffect = ({
    text = "Tu negocio, en piloto automático",
    typingSpeed = 80,
    delayStart = 500,
    loop = false,
    deleteSpeed = 50,
    pauseAfterComplete = 2000,
    showCursor = true,
    cursorChar = "|",
    className = "",
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showText, setShowText] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);

    // Delay inicial antes de comenzar
    useEffect(() => {
        const startDelay = setTimeout(() => {
            setShowText(true);
        }, delayStart);
        return () => clearTimeout(startDelay);
    }, [delayStart]);

    // Efecto de escritura
    useEffect(() => {
        if (!showText) return;

        let timeout;

        if (!isDeleting && currentIndex < text.length) {
            // Typing
            timeout = setTimeout(() => {
                setDisplayedText(text.substring(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }, typingSpeed);
        } else if (!isDeleting && currentIndex === text.length) {
            // Finished typing
            if (loop) {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, pauseAfterComplete);
            }
        } else if (isDeleting && currentIndex > 0) {
            // Deleting
            timeout = setTimeout(() => {
                setDisplayedText(text.substring(0, currentIndex - 1));
                setCurrentIndex(currentIndex - 1);
            }, deleteSpeed);
        } else if (isDeleting && currentIndex === 0) {
            // Finished deleting
            setIsDeleting(false);
        }

        return () => clearTimeout(timeout);
    }, [currentIndex, isDeleting, showText, text, typingSpeed, deleteSpeed, pauseAfterComplete, loop]);

    return (
        <div className={`inline-flex items-center ${className}`}>
            <span className="typewriter-text" style={{ fontFamily: '"Playfair Display", serif' }}>
                {displayedText}
            </span>
            {showCursor && (
                <motion.span
                    className="typewriter-cursor ml-1 font-light"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                >
                    {cursorChar}
                </motion.span>
            )}
        </div>
    );
};

// Navbar Component
const Navbar = ({ activeSection, mobileMenuOpen, setMobileMenuOpen, scrolled }) => {
    const navLinks = [
        { name: 'Inicio', href: '#inicio' },
        { name: 'Servicios', href: '#servicios' },
        { name: 'Nosotros', href: '#nosotros' },
        { name: 'Planes', href: '#planes' },
        { name: 'Contacto', href: '#contacto' },
    ];

    const handleLinkClick = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-white/80 backdrop-blur-md shadow-md py-4" : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <a href="#inicio" onClick={(e) => handleLinkClick(e, '#inicio')} className="flex items-center gap-2 z-50 relative">
                    {/* Using text specific colors for logo gradient effect */}
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-clove-orange via-clove-purple to-clove-blue">
                        CLOVE
                    </span>
                    <span className="text-2xl font-bold text-black hidden sm:inline-block">
                        AUTOMATIONS
                    </span>
                </a>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-clove-purple relative",
                                activeSection === link.href.substring(1) ? "text-clove-purple" : "text-gray-600"
                            )}
                        >
                            {link.name}
                            {activeSection === link.href.substring(1) && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-clove-purple"
                                />
                            )}
                        </a>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-clove-orange to-clove-pink text-white font-medium shadow-lg shadow-clove-orange/20 hover:shadow-clove-orange/40 transition-shadow"
                    >
                        Agenda Demo
                    </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 z-50 text-gray-800"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    className="text-2xl font-bold text-gray-800 hover:text-clove-purple transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-clove-orange to-clove-pink text-white text-lg font-bold shadow-xl"
                            >
                                Agenda Demo
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

// Hero Section
const Hero = () => {
    return (
        <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40 overflow-hidden">
            <GridPattern />

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-clove-purple/20 blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 100, 0],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-clove-blue/20 blur-[100px]"
                />
            </div>

            {/* Distributed Background Icons */}
            <BackgroundIcons />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    {/* Logo Image */}
                    <img
                        src="/pictures/clove_logo2.png"
                        alt="Clove Automations Logo"
                        className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 object-contain mx-auto drop-shadow-2xl"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML += '<svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 mx-auto text-clove-purple"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>'
                        }}
                    />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black mb-4"
                >
                    Clove Automations
                </motion.h1>

                <div className="h-12 md:h-16 mb-6 flex items-center justify-center">
                    <TypewriterEffect
                        text="Tu negocio, en piloto automático"
                        typingSpeed={80}
                        delayStart={800}
                        loop={true}
                        deleteSpeed={50}
                        pauseAfterComplete={2000}
                        className="text-3xl md:text-5xl lg:text-6xl text-gray-700 font-serif italic tracking-wide"
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mb-10"
                >
                    Automatiza, escala y crece sin contratar más personal. Eliminamos el trabajo manual con agentes de IA que trabajan 24/7.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-clove-orange via-clove-pink to-clove-purple text-white font-bold text-lg shadow-xl shadow-clove-purple/25 hover:shadow-2xl hover:shadow-clove-purple/40 transition-all"
                    >
                        Agenda una Demo
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.05)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-gray-900 text-gray-900 font-bold text-lg hover:border-clove-purple hover:text-clove-purple transition-colors"
                    >
                        Ver Planes
                    </motion.button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 hidden md:block"
            >
                <ChevronDown size={32} />
            </motion.div>
        </section>
    );
};

// Services Section
const services = [
    {
        icon: MessageCircle,
        title: "Atención al Cliente 24/7",
        description: "Respuestas instantáneas y precisas sin importar la hora."
    },
    {
        icon: Users,
        title: "Generación de Leads",
        description: "Captura y califica prospectos automáticamente."
    },
    {
        icon: Target,
        title: "Calificación de Prospectos",
        description: "Identifica oportunidades de alto valor con IA."
    },
    {
        icon: Repeat,
        title: "Seguimiento Automatizado",
        description: "Nurturing personalizado que nunca olvida."
    },
    {
        icon: Database,
        title: "Procesamiento de Datos",
        description: "Extrae insights de miles de datos en segundos."
    },
    {
        icon: Link,
        title: "Integración con CRM",
        description: "Conecta con tus herramientas favoritas sin esfuerzo."
    }
];

const Services = () => {
    return (
        <section id="servicios" className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-40 pointer-events-none z-0">
                <GridPattern />
            </div>

            <BackgroundIcons />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-black mb-4"
                    >
                        ¿Qué Automatizamos?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-xl text-gray-600"
                    >
                        Soluciones de IA para cada área de tu negocio
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all group relative z-10"
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-clove-orange/10 to-clove-purple/10 flex items-center justify-center mb-6 group-hover:from-clove-orange/20 group-hover:to-clove-purple/20 transition-colors">
                                <service.icon className="w-6 h-6 md:w-8 md:h-8 text-clove-purple" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Benefits Section
const benefits = [
    {
        icon: Zap,
        title: "Implementación Rápida",
        description: "Tu primer agente operando en menos de 2 semanas."
    },
    {
        icon: TrendingUp,
        title: "ROI Comprobado",
        description: "Nuestros clientes recuperan su inversión en 3 meses promedio."
    },
    {
        icon: Headphones,
        title: "Soporte Dedicado",
        description: "Equipo de expertos disponible cuando lo necesites."
    },
    {
        icon: Cpu,
        title: "Tecnología de Punta",
        description: "Los modelos de IA más avanzados del mercado."
    }
];

const Benefits = () => {
    return (
        <section id="nosotros" className="py-20 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-black mb-4"
                    >
                        Por Qué Elegirnos
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-6 md:gap-8 p-6 md:p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-clove-blue/30"
                        >
                            <div className="shrink-0">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-clove-blue/10 flex items-center justify-center">
                                    <benefit.icon className="w-6 h-6 md:w-8 md:h-8 text-clove-blue" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600 text-base md:text-lg">{benefit.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Pricing Section
const Pricing = () => {
    return (
        <section id="planes" className="py-20 md:py-32 bg-gray-900 text-white relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-clove-purple/20 blur-[120px] rounded-full opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Elige Tu Plan
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-xl text-gray-400"
                    >
                        Soluciones escalables para cada etapa de tu negocio
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-8 items-center">
                    {/* Plan Básico */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors"
                    >
                        <div className="bg-gray-700 text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 text-gray-300">
                            Ideal para empezar
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Básico</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold">$499</span>
                            <span className="text-gray-400">/mes</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {[
                                "1 agente de IA",
                                "Hasta 1,000 interacciones/mes",
                                "1 integración básica",
                                "Soporte por email",
                                "Reportes mensuales",
                                "Onboarding incluido"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300">
                                    <Check className="w-5 h-5 text-clove-green" />
                                    <span className="text-sm md:text-base">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-3 rounded-xl border border-white text-white font-semibold hover:bg-white hover:text-black transition-all">
                            Comenzar
                        </button>
                    </motion.div>

                    {/* Plan Pro */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-gray-800 p-8 lg:p-10 rounded-2xl border-2 border-clove-purple relative shadow-2xl shadow-clove-purple/20 transform lg:scale-110 z-10"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-clove-purple to-clove-pink text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                            Más Popular
                        </div>
                        <h3 className="text-2xl font-bold mb-2">PRO</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-clove-purple to-clove-pink">$1,299</span>
                            <span className="text-gray-400">/mes</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {[
                                "3 agentes de IA",
                                "Hasta 5,000 interacciones/mes",
                                "Integraciones ilimitadas",
                                "Soporte prioritario 24/7",
                                "Reportes semanales",
                                "Personalización avanzada",
                                "Training personalizado"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-white font-medium">
                                    <Check className="w-5 h-5 text-clove-purple" />
                                    <span className="text-sm md:text-base">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-4 rounded-xl bg-gradient-to-r from-clove-purple to-clove-pink text-white font-bold shadow-lg hover:shadow-xl hover:shadow-clove-purple/25 transition-all transform hover:-translate-y-1">
                            Empezar Ahora
                        </button>
                    </motion.div>

                    {/* Enterprise */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors"
                    >
                        <div className="bg-gray-700 text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 text-gray-300">
                            Para grandes equipos
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-3xl font-bold">Personalizado</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Agentes de IA ilimitados",
                                "Interacciones ilimitadas",
                                "Infraestructura dedicada",
                                "Account Manager exclusivo",
                                "Reportes en tiempo real",
                                "SLA garantizado 99.9%",
                                "Desarrollo custom",
                                "Auditoría de seguridad"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300">
                                    <Check className="w-5 h-5 text-clove-blue" />
                                    <span className="text-sm md:text-base">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-3 rounded-xl border border-white text-white font-semibold hover:bg-white hover:text-black transition-all">
                            Contactar Ventas
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Contact Section
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        alert("¡Mensaje enviado! Nos pondremos en contacto contigo pronto.");
    };

    const socialLinks = [
        { name: 'WhatsApp', icon: MessageCircle, color: '#25D366', url: '#' },
        { name: 'Instagram', icon: Instagram, color: '#E1306C', url: '#' },
        { name: 'LinkedIn', icon: Linkedin, color: '#0A66C2', url: '#' },
        { name: 'TikTok', icon: Music, color: '#000000', url: '#' },
    ];

    return (
        <section id="contacto" className="py-20 md:py-32 bg-white relative overflow-hidden">
            {/* Background Icons */}
            <BackgroundIcons />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-black mb-4"
                    >
                        Agenda Tu Demo Gratuita
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base md:text-xl text-gray-600"
                    >
                        Descubre cómo la IA puede transformar tu negocio en 30 minutos
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-between"
                    >
                        <div className="space-y-8 mb-12">
                            {[
                                "Demo personalizada de 30 minutos",
                                "Sin compromiso ni tarjeta de crédito",
                                "Recibe un plan de automatización gratuito"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-clove-green/20 flex items-center justify-center shrink-0">
                                        <Check className="w-5 h-5 md:w-6 md:h-6 text-clove-blue" />
                                    </div>
                                    <span className="text-lg md:text-xl font-medium text-gray-800">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-6">Conéctate con Nosotros</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        whileHover={{ scale: 1.05, backgroundColor: social.color, color: 'white' }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-3 p-4 md:p-6 rounded-xl bg-gray-50 text-gray-800 transition-colors border border-gray-100 shadow-sm"
                                    >
                                        <social.icon size={28} />
                                        <span className="font-semibold">{social.name}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6">
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Nombre Completo</label>
                                <input required className="w-full p-3 md:p-4 rounded-lg border border-gray-300 focus:border-clove-purple focus:ring-2 focus:ring-clove-purple/20 outline-none transition-all" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Email Corporativo</label>
                                    <input type="email" required className="w-full p-3 md:p-4 rounded-lg border border-gray-300 focus:border-clove-purple focus:ring-2 focus:ring-clove-purple/20 outline-none transition-all" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Teléfono</label>
                                    <input type="tel" required className="w-full p-3 md:p-4 rounded-lg border border-gray-300 focus:border-clove-purple focus:ring-2 focus:ring-clove-purple/20 outline-none transition-all" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Empresa</label>
                                <input required className="w-full p-3 md:p-4 rounded-lg border border-gray-300 focus:border-clove-purple focus:ring-2 focus:ring-clove-purple/20 outline-none transition-all" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Cuéntanos tu reto (Opcional)</label>
                                <textarea rows={4} className="w-full p-3 md:p-4 rounded-lg border border-gray-300 focus:border-clove-purple focus:ring-2 focus:ring-clove-purple/20 outline-none transition-all resize-none" />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full py-4 rounded-lg bg-gradient-to-r from-clove-purple to-clove-pink text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                            >
                                Agendar Demo Ahora
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Footer Section
const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12 text-center md:text-left">

                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-clove-orange via-clove-purple to-clove-blue">
                                CLOVE
                            </span>
                            <span className="text-xl font-bold text-black">
                                AUTOMATIONS
                            </span>
                        </div>
                        <p className="text-gray-500">Tu negocio, en piloto automático.</p>
                        <div className="flex gap-4 mt-2">
                            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                <MessageCircle size={20} className="text-gray-600" />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                <Instagram size={20} className="text-gray-600" />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                <Linkedin size={20} className="text-gray-600" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-lg text-gray-900">Enlaces</h4>
                        <div className="flex flex-col gap-2 text-gray-600">
                            <a href="#inicio" className="hover:text-clove-purple transition-colors">Inicio</a>
                            <a href="#servicios" className="hover:text-clove-purple transition-colors">Servicios</a>
                            <a href="#nosotros" className="hover:text-clove-purple transition-colors">Nosotros</a>
                            <a href="#planes" className="hover:text-clove-purple transition-colors">Planes</a>
                            <a href="#contacto" className="hover:text-clove-purple transition-colors">Contacto</a>
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-lg text-gray-900">Legal</h4>
                        <div className="flex flex-col gap-2 text-gray-600">
                            <a href="#" className="hover:text-clove-purple transition-colors">Términos y Condiciones</a>
                            <a href="#" className="hover:text-clove-purple transition-colors">Política de Privacidad</a>
                            <a href="#" className="hover:text-clove-purple transition-colors">Aviso Legal</a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Clove Automations. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};

// Main App
function CloveAutomationsLanding() {
    const [activeSection, setActiveSection] = useState('inicio');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Scroll listener for navbar style
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Active section detection
            const sections = ['inicio', 'servicios', 'nosotros', 'planes', 'contacto'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top >= -100 && rect.top <= 300;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Navbar
                activeSection={activeSection}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                scrolled={scrolled}
            />

            <main>
                <Hero />
                <Services />
                <Benefits />
                <Pricing />
                <Contact />
            </main>

            <Footer />
        </div>
    );
}

export default CloveAutomationsLanding;
