/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KORA Growth - Premium Landing Page
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { 
  Menu, X, ArrowRight, CheckCircle2, TrendingUp, TrendingDown,
  ShieldCheck, Target, BarChart3, Check, ChevronDown, 
  Sparkles, Clock, Users, Zap, Calendar, Mail, Linkedin,
  ArrowUpRight, MousePointer2
} from 'lucide-react';

import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import TrustBar from './components/TrustBar';
import CountUp from './components/CountUp';
import TiltCard from './components/TiltCard';
import Accordion, { FAQ_DATA } from './components/Accordion';
import Countdown from './components/Countdown';
import logo from '@/assets/logo.svg';

import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerContainerSlow,
  scaleIn,
  revealFromBottom,
  springTransition,
  useScrollAnimation,
} from './components/AnimationSystem';

// ============================================
// DATA
// ============================================

const SERVICES = [
  { 
    name: 'Diagnóstico Comercial', 
    price: 'Gratuito', 
    tag: 'INÍCIO',
    description: 'Análise completa do seu momento comercial atual.',
    features: ['Análise de Narrativa', 'Esboço de Funil', 'Mapa de Objeções', 'Priorização de Canais', 'Plano de 3 Semanas'],
    highlight: false,
    caseStudy: 'TechFlow usou o diagnóstico para identificar o canal ideal'
  },
  { 
    name: 'Estruturação Comercial', 
    price: 'Core', 
    tag: 'MAIS POPULAR',
    description: 'Construção dos ativos fundamentais de venda.',
    features: ['Definição de ICP', 'Playbook de Vendas', 'Matriz de Objeções', 'Rotina Comercial', 'Setup de CRM'],
    highlight: true,
    caseStudy: 'Nexus aumentou pipeline em 340% após estruturação'
  },
  { 
    name: 'Execução Assistida', 
    price: 'Growth', 
    tag: 'ESCALA',
    description: 'Acompanhamento prático e co-produção de vendas.',
    features: ['Abordagens Reais', 'Ajustes Semanais', 'Previsibilidade', 'Shadowing de Calls', 'Relatórios de Conversão'],
    highlight: false,
    caseStudy: 'Quantum fechou 12 deals em 6 semanas com execução assistida'
  },
];

const SOLUTION_CARDS = [
  { 
    icon: Target, 
    title: 'Estrutura Comercial', 
    desc: 'Funil, ICP, narrativa, objeções, canais priorizados. Criamos a base sólida que transforma caos em processo.',
    metric: '+340%',
    metricLabel: 'pipeline médio'
  },
  { 
    icon: ShieldCheck, 
    title: 'Execução Guiada', 
    desc: 'Acompanhamos as primeiras abordagens reais junto com o time fundador. Shadowing e feedback em tempo real.',
    metric: '2-3',
    metricLabel: 'semanas p/ resultado'
  },
  { 
    icon: BarChart3, 
    title: 'Previsibilidade', 
    desc: 'Transformamos caos em processo, ritmo e tração. Dados reais, métricas claras, não achismos.',
    metric: '94%',
    metricLabel: 'taxa de sucesso'
  },
];

const DIAGNOSIS_FEATURES = [
  'Análise da narrativa comercial',
  'Esboço do funil ideal',
  'Mapa de objeções',
  'Priorização de canais',
  'Plano de sobrevivência de 3 semanas'
];

const STEPS = [
  { step: '01', title: 'Você agenda', desc: 'Preenche um formulário curto com o contexto da sua startup.', time: '2 min' },
  { step: '02', title: 'Diagnóstico', desc: 'Sessão de 60 min onde entregamos clareza e o mapa inicial.', time: '60 min' },
  { step: '03', title: 'Decisão conjunta', desc: 'Se houver fit, conversamos sobre como estruturar sua operação.', time: 'Sem compromisso' }
];

// ============================================
// COMPONENTS
// ============================================

// Scroll Progress Bar
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#6A6FF0] origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

// Scroll Indicator
const ScrollIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2, duration: 1 }}
    className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
  >
    <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
    <div className="scroll-indicator">
      <motion.div
        className="w-1 h-2 bg-[#6A6FF0] rounded-full absolute top-2 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  </motion.div>
);

// Stats Badge
const StatsBadge: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.8 }}
    className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8"
  >
    {[
      { value: '47+', label: 'startups' },
      { value: '230%', label: 'crescimento médio' },
      { value: 'R$12M+', label: 'em vendas geradas' },
    ].map((stat, i) => (
      <div key={i} className="flex items-center gap-2 text-sm">
        <span className="font-heading font-bold text-white">{stat.value}</span>
        <span className="text-white/40">{stat.label}</span>
        {i < 2 && <span className="text-white/20 ml-2 hidden md:inline">|</span>}
      </div>
    ))}
  </motion.div>
);

// Section Header
interface SectionHeaderProps {
  tag?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  tag, title, subtitle, centered = true, light = false 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={`mb-16 ${centered ? 'text-center' : ''}`}
    >
      {tag && (
        <motion.span
          variants={fadeInUp}
          className={`inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4 ${
            light ? 'text-[#6A6FF0]' : 'text-[#6A6FF0]'
          }`}
        >
          {tag}
        </motion.span>
      )}
      <motion.h2
        variants={fadeInUp}
        className={`text-section font-heading font-medium ${
          light ? 'text-[#0C0D26]' : 'text-white'
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className={`mt-4 text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${
            light ? 'text-gray-600' : 'text-[#C8C9D9]'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

// ============================================
// MAIN APP
// ============================================

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', linkedin: '' });

  // Parallax values
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Scroll detection for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset or redirect
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-[#6A6FF0] selection:text-white cursor-auto md:cursor-none overflow-x-hidden font-sans">
      <ScrollProgress />
      <CustomCursor />
      <FluidBackground />
      
      {/* ============================================
          NAVIGATION
          ============================================ */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0C0D26]/95 backdrop-blur-xl border-b border-white/10 py-3' 
            : 'bg-transparent py-6'
        }`}
      >
        <motion.img 
          src={logo}
          alt="KORA Growth" 
          className="h-8 md:h-10 w-auto object-contain cursor-pointer z-50 select-none"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        />
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-xs font-bold tracking-widest uppercase">
          {['Problema', 'Solução', 'Serviços', 'FAQ'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
              className="link-underline hover:text-[#6A6FF0] transition-colors text-white/80 cursor-pointer bg-transparent border-none py-2"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>

        <motion.button 
          onClick={() => scrollToSection('diagnostico')}
          className="hidden md:inline-flex items-center gap-2 bg-white text-[#0C0D26] px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#C8C9D9] transition-all duration-300 cursor-pointer rounded-sm btn-shimmer"
          data-hover="true"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Diagnóstico Gratuito
        </motion.button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-[#0C0D26]/98 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainer}
              className="flex flex-col items-center gap-6"
            >
              {['Problema', 'Solução', 'Serviços', 'FAQ'].map((item, i) => (
                <motion.button
                key={item}
                  variants={fadeInUp}
                onClick={() => scrollToSection(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
                className="text-3xl font-heading font-bold text-white hover:text-[#6A6FF0] transition-colors uppercase bg-transparent border-none"
              >
                {item}
                </motion.button>
            ))}
              <motion.button 
                variants={fadeInUp}
              onClick={() => scrollToSection('diagnostico')}
              className="mt-8 bg-white text-[#0C0D26] px-10 py-4 text-sm font-bold tracking-widest uppercase"
            >
              Diagnóstico Gratuito
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <header className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-32">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="z-10 flex flex-col items-center w-full max-w-5xl text-center"
        >
          {/* Social Proof Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 text-[10px] md:text-xs font-mono text-[#C8C9D9] tracking-[0.3em] uppercase mb-10 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm bg-white/5"
          >
            <span className="w-2 h-2 bg-[#6A6FF0] rounded-full animate-pulse"/>
            <span>Consultoria Comercial para Startups</span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#6A6FF0]" />
              47+ startups estruturadas
            </span>
          </motion.div>

          {/* Main Title - Split Animation */}
          <div className="relative w-full mb-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-3"
            >
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight text-center text-white leading-tight"
              >
                Sua startup validou o problema.
              </motion.h1>
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight text-center text-white/50 leading-tight"
              >
                Agora precisa vender.
              </motion.h1>
            </motion.div>
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-24 h-1 bg-[#6A6FF0] mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-lg lg:text-xl font-light max-w-2xl mx-auto text-[#C8C9D9] leading-relaxed mb-10"
          >
            <span className="text-white font-medium">70% das startups morrem</span> por falta de estratégia comercial — não por falta de produto. Estruture seu processo antes que o pipeline seque.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
             onClick={() => scrollToSection('diagnostico')}
              className="group relative px-8 py-4 bg-[#6A6FF0] text-white font-bold tracking-widest uppercase text-xs hover:bg-[#585CE0] transition-all overflow-hidden btn-glow rounded-sm"
             data-hover="true"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Agendar Diagnóstico Gratuito 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('solucao')}
              className="group px-8 py-4 bg-transparent border border-white/20 text-white font-bold tracking-widest uppercase text-xs hover:bg-white/5 hover:border-white/40 transition-all rounded-sm"
              data-hover="true"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                Ver como funciona
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>

          {/* Stats */}
          <StatsBadge />
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-36 md:bottom-40 left-1/2 -translate-x-1/2 z-10">
          <ScrollIndicator />
        </div>

        {/* MARQUEE */}
        <div className="absolute bottom-0 left-0 w-full py-4 md:py-5 bg-white text-[#0C0D26] z-20 overflow-hidden border-t-4 border-[#6A6FF0]">
          <motion.div 
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-xl md:text-3xl font-heading font-bold px-8 flex items-center gap-4 tracking-tighter">
                    KORA GROWTH <span className="text-[#6A6FF0] text-lg">●</span> 
                    ESTRUTURAÇÃO COMERCIAL <span className="text-[#6A6FF0] text-lg">●</span> 
                    PREVISIBILIDADE <span className="text-[#6A6FF0] text-lg">●</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* ============================================
          TRUST BAR
          ============================================ */}
      <TrustBar />

      {/* ============================================
          PROBLEM SECTION
          ============================================ */}
      <section id="problema" className="relative z-10 py-24 md:py-32 bg-[#0C0D26] bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.span
                variants={fadeInUp}
                className="text-xs font-bold tracking-[0.3em] uppercase text-[#6A6FF0] mb-4 block"
              >
                O Problema
              </motion.span>
              <motion.h2 
                variants={fadeInUp}
                className="text-section font-heading font-medium mb-8 leading-tight"
              >
                  O Vale da <br/>
                <span className="text-gradient">Morte Comercial</span>
              </motion.h2>
              <motion.div 
                variants={staggerContainer}
                className="space-y-6 text-[#C8C9D9] text-lg font-light leading-relaxed"
              >
                <motion.p variants={fadeInUp}>
                  Você validou o problema, construiu o MVP e fez o pitch. Mas vender para além de <span className="text-white font-medium">"friends & family"</span> ainda não aconteceu de forma consistente.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  Sem um funil claro, narrativa definida, ICP validado e ritmo, o pipeline seca. <span className="text-white font-medium">É aqui que o sonho termina para a maioria.</span>
                </motion.p>
              </motion.div>

              {/* Quote Card */}
              <motion.div
                variants={fadeInUp}
                className="mt-10 p-6 glass-card"
              >
                <p className="text-sm italic text-[#C8C9D9] mb-4">
                  "Tínhamos produto, tínhamos interesse... mas não sabíamos converter em vendas reais. A KORA mudou isso."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6A6FF0] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm">
                    MF
                </div>
                  <div>
                    <p className="text-sm font-medium text-white">Marcos Ferreira</p>
                    <p className="text-xs text-white/50">CEO, TechFlow</p>
             </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <TiltCard className="h-[500px] w-full">
                <div className="h-full w-full glass-card p-8 flex flex-col justify-center items-center overflow-hidden">
                  {/* Graph Visualization */}
                  <div className="w-full h-64 relative mb-8">
                    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
                      {/* Grid Lines */}
                      {[...Array(5)].map((_, i) => (
                        <line 
                          key={i}
                          x1="40" 
                          y1={40 + i * 35} 
                          x2="380" 
                          y2={40 + i * 35} 
                          stroke="rgba(255,255,255,0.05)" 
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Decline Line (Without KORA) */}
                      <motion.path
                        d="M40,60 Q150,80 250,140 T380,170"
                        fill="none"
                        stroke="rgba(239,68,68,0.5)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeOut" }}
                      />
                      
                      {/* Growth Line (With KORA) */}
                      <motion.path
                        d="M40,140 Q150,120 250,70 T380,40"
                        fill="none"
                        stroke="#6A6FF0"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                      />

                      {/* Labels */}
                      <text x="50" y="25" fill="white" fontSize="10" fontWeight="500">PIPELINE</text>
                      <text x="350" y="195" fill="rgba(255,255,255,0.5)" fontSize="10">TEMPO</text>
                   </svg>

                    {/* Legend */}
                    <div className="absolute bottom-0 left-0 flex gap-6 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#6A6FF0]" />
                        <span className="text-white/70">Com KORA</span>
                </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <span className="text-white/70">Sem estrutura</span>
                  </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-md border border-white/10">
                      <TrendingDown className="w-7 h-7 text-red-400" />
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-2">Entender o Problema</h3>
                  <p className="text-sm text-gray-400 max-w-xs mx-auto">O primeiro passo é admitir que o produto não se vende sozinho.</p>
                </div>
             </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          METRICS SECTION
          ============================================ */}
      <section className="w-full py-24 bg-[#0C0D26] border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { 
                value: 70, 
                suffix: '%', 
                label: 'Das startups morrem sem um Go-To-Market validado.',
                icon: TrendingDown,
                iconColor: 'text-red-400'
              },
              { 
                value: 3, 
                suffix: 'x', 
                label: 'Mais chances de sobreviver ao fazer as primeiras 10 vendas rápido.',
                icon: Zap,
                iconColor: 'text-yellow-400'
              },
              { 
                value: 1, 
                suffix: 'º', 
                label: 'O comercial é o primeiro gargalo real após o MVP.',
                icon: Target,
                iconColor: 'text-[#6A6FF0]'
              },
            ].map((metric, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
              >
                <TiltCard maxTilt={8} scale={1.03}>
                  <div className="glass-card p-8 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl font-heading font-bold text-white">
                        <CountUp end={metric.value} duration={2} delay={0.3 * i} suffix={metric.suffix} />
            </div>
                      <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
            </div>
              <p className="text-[#C8C9D9] text-sm leading-relaxed">
                      {metric.label}
              </p>
            </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================
          WHO WE ARE
          ============================================ */}
      <section className="relative z-10 py-20 bg-[#1D1E4F] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-[#6A6FF0] mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Quem Somos
            </motion.span>
            <motion.p
              variants={fadeInUp}
              className="text-2xl md:text-4xl font-light leading-tight text-white mb-8"
            >
              A <span className="font-bold text-gradient">KORA Growth</span> é uma consultoria comercial especializada em startups early-stage.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-[#C8C9D9] text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Nossa missão é simples: <span className="text-white font-medium">reduzir a mortalidade das startups</span> construindo estruturas comerciais reais — funil, narrativa, ICP, objeções, canais e ritmo.
            </motion.p>

            {/* Badge */}
            <motion.div
              variants={scaleIn}
              className="inline-flex items-center gap-2 mt-8 px-4 py-2 bg-white/5 rounded-full border border-white/10"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-white/60">Operando desde 2023</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          SOLUTION SECTION
          ============================================ */}
      <section id="solucao" className="relative z-10 py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            tag="Nossa Abordagem"
            title="O que fazemos"
            subtitle="Três pilares que transformam caos comercial em previsibilidade."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerSlow}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {SOLUTION_CARDS.map((card, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
              >
                <TiltCard maxTilt={6} scale={1.02}>
                  <div className="premium-card p-10 flex flex-col items-start min-h-[420px] h-full" data-hover="true">
                    <div className="p-4 bg-[#6A6FF0]/10 rounded-xl mb-8 text-[#6A6FF0] border border-[#6A6FF0]/20">
                  <card.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-white">{card.title}</h3>
                    <p className="text-[#C8C9D9] leading-relaxed mb-6 flex-grow">{card.desc}</p>
                    
                    {/* Metric */}
                    <div className="w-full pt-6 border-t border-white/10">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-heading font-bold text-[#6A6FF0]">{card.metric}</span>
                        <span className="text-sm text-white/50">{card.metricLabel}</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================
          DIAGNOSIS SECTION
          ============================================ */}
      <section id="diagnostico" className="relative z-10 py-24 md:py-32 bg-white text-[#0C0D26]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#6A6FF0]/10 text-[#6A6FF0] text-xs font-bold tracking-widest uppercase mb-6 rounded-full"
              >
                <Sparkles className="w-3 h-3" />
                100% Gratuito
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="text-section font-heading font-bold mb-6"
              >
                O que você recebe no Diagnóstico
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-gray-600 mb-8 text-lg"
              >
                Só trabalhamos com startups onde faz sentido para ambos. O diagnóstico é nossa forma de <span className="font-semibold text-[#0C0D26]">entregar valor primeiro</span> — e depois avaliar fit.
              </motion.p>
              
              {/* Checklist with staggered animation */}
              <motion.ul
                variants={staggerContainer}
                className="space-y-4 mb-10"
              >
                {DIAGNOSIS_FEATURES.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={fadeInLeft}
                    className="flex items-center gap-3 text-lg"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, type: 'spring', stiffness: 300 }}
                    >
                      <CheckCircle2 className="w-6 h-6 text-[#6A6FF0]" />
                    </motion.div>
                    <span className="font-medium">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Trust Badges */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-4 mb-8"
              >
                {[
                  { icon: Clock, text: 'Resposta em 2h' },
                  { icon: ShieldCheck, text: 'Sem cartão' },
                  { icon: Users, text: 'Sem compromisso' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                    <badge.icon className="w-4 h-4 text-[#6A6FF0]" />
                    {badge.text}
                  </div>
                ))}
              </motion.div>

              {/* Form */}
              <motion.form
                variants={fadeInUp}
                onSubmit={handleFormSubmit}
                className="space-y-4 p-6 bg-gray-50 rounded-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[#0C0D26] placeholder-gray-400 focus:outline-none focus:border-[#6A6FF0] focus:ring-2 focus:ring-[#6A6FF0]/20 transition-all"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email profissional"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[#0C0D26] placeholder-gray-400 focus:outline-none focus:border-[#6A6FF0] focus:ring-2 focus:ring-[#6A6FF0]/20 transition-all"
                    required
                  />
                </div>
                <input
                  type="url"
                  placeholder="LinkedIn (opcional)"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-[#0C0D26] placeholder-gray-400 focus:outline-none focus:border-[#6A6FF0] focus:ring-2 focus:ring-[#6A6FF0]/20 transition-all"
                />
              <button 
                  type="submit"
                  className="w-full bg-[#0C0D26] text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-[#1D1E4F] transition-all flex items-center justify-center gap-3 rounded-lg btn-shimmer"
                data-hover="true"
              >
                Quero meu diagnóstico <ArrowRight className="w-4 h-4" />
              </button>
              </motion.form>
            </motion.div>

            {/* Steps */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="bg-gray-50 p-10 rounded-2xl relative overflow-hidden"
            >
              <motion.h3
                variants={fadeInUp}
                className="text-xl font-bold mb-10 uppercase tracking-widest text-[#0C0D26]/50"
              >
                Como Funciona
              </motion.h3>

              <div className="space-y-10 relative z-10">
                {STEPS.map((s, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInRight}
                    className="flex gap-6 group"
                  >
                    <div className="relative">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 * i, type: 'spring' }}
                        className="text-5xl font-bold text-[#6A6FF0]/20 group-hover:text-[#6A6FF0]/40 transition-colors"
                      >
                        {s.step}
                      </motion.div>
                     </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-xl font-bold">{s.title}</h4>
                        <span className="text-xs px-2 py-1 bg-[#6A6FF0]/10 text-[#6A6FF0] rounded-full">
                          {s.time}
                        </span>
                   </div>
                      <p className="text-gray-500">{s.desc}</p>
                    </div>
                  </motion.div>
                 ))}
               </div>

               {/* Decorative line */}
              <div className="absolute top-24 left-[3.2rem] bottom-24 w-px bg-gradient-to-b from-[#6A6FF0]/30 via-[#6A6FF0]/10 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          SERVICES/PRICING
          ============================================ */}
      <section id="servicos" className="relative z-10 py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            tag="Soluções"
            title="Nossas 3 Soluções"
            subtitle="Desenhadas para cada estágio de maturidade comercial."
          />
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerSlow}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {SERVICES.map((service, i) => {
              const isHighlight = service.highlight;

              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                >
                  <TiltCard maxTilt={isHighlight ? 8 : 5} scale={isHighlight ? 1.03 : 1.02}>
                    <div
                      className={`relative p-8 border backdrop-blur-md flex flex-col min-h-[550px] transition-all duration-300 rounded-xl
                    ${isHighlight 
                      ? 'bg-[#1D1E4F] border-[#6A6FF0] shadow-2xl shadow-[#6A6FF0]/20' 
                          : 'bg-[#0C0D26]/60 border-white/10 hover:border-white/20'
                    }`}
                  data-hover="true"
                >
                      {/* Top Glow for Highlight */}
                  {isHighlight && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6A6FF0] via-[#8B5CF6] to-[#6A6FF0] animate-gradient-x" />
                      )}

                      {/* Tag Badge */}
                      <div className={`inline-flex self-start px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-6 ${
                        isHighlight 
                          ? 'bg-[#6A6FF0] text-white' 
                          : 'bg-white/5 text-white/60 border border-white/10'
                      }`}>
                        {service.tag}
                      </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-heading font-bold mb-2 text-white">{service.name}</h3>
                    <div className={`text-sm font-mono tracking-widest uppercase mb-6 ${isHighlight ? 'text-[#6A6FF0]' : 'text-gray-400'}`}>
                      {service.price}
                    </div>
                    <p className="text-[#C8C9D9] text-sm mb-8 min-h-[40px]">
                      {service.description}
                    </p>
                    
                        <div className="h-px w-full bg-white/10 mb-6" />
                    
                        <ul className="space-y-3">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                              <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isHighlight ? 'text-[#6A6FF0]' : 'text-gray-500'}`} /> 
                          {feat}
                        </li>
                      ))}
                    </ul>

                        {/* Case Study */}
                        <div className="mt-6 pt-6 border-t border-white/5">
                          <p className="text-xs text-white/40 italic">
                            "{service.caseStudy}"
                          </p>
                        </div>
                  </div>
                  
                  <button 
                    onClick={() => scrollToSection('diagnostico')}
                        className={`w-full py-4 text-xs font-bold uppercase tracking-widest border transition-all duration-300 mt-8 rounded-lg
                      ${isHighlight 
                            ? 'bg-[#6A6FF0] text-white border-[#6A6FF0] hover:bg-[#585CE0] btn-glow' 
                        : 'bg-transparent text-white border-white/20 hover:bg-white hover:text-[#0C0D26]'
                      }`}
                  >
                        {isHighlight ? 'Começar Agora' : 'Saiba Mais'}
                  </button>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>
          </div>
      </section>

      {/* ============================================
          FAQ SECTION
          ============================================ */}
      <section id="faq" className="relative z-10 py-24 md:py-32 px-6 bg-[#0C0D26] border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            tag="Dúvidas"
            title="Perguntas Frequentes"
            subtitle="Tudo que você precisa saber antes de agendar seu diagnóstico."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion items={FAQ_DATA} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-[#C8C9D9] mb-4">Ainda tem dúvidas?</p>
            <a 
              href="mailto:contato@koragrowth.com" 
              className="inline-flex items-center gap-2 text-[#6A6FF0] hover:text-[#8B5CF6] transition-colors font-medium"
            >
              <Mail className="w-4 h-4" />
              Fale conosco diretamente
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          URGENCY SECTION
          ============================================ */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-br from-[#1D1E4F] via-[#0C0D26] to-[#1D1E4F] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 text-xs font-bold tracking-widest uppercase mb-6 rounded-full border border-red-500/20"
            >
              <Clock className="w-3 h-3" />
              Vagas Limitadas
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-heading font-bold mb-6"
            >
              Últimas vagas para{' '}
              <span className="text-gradient">
                {new Date().toLocaleString('pt-BR', { month: 'long' })}
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-[#C8C9D9] text-lg mb-10 max-w-2xl mx-auto"
            >
              Limitamos a <span className="text-white font-medium">5 diagnósticos por mês</span> para garantir qualidade e atenção total a cada startup.
            </motion.p>

            <motion.div variants={scaleIn} className="mb-10">
              <Countdown showLabels={true} />
            </motion.div>

            {/* Slots */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {[
                { day: 'Seg 10h', available: true },
                { day: 'Ter 14h', available: true },
                { day: 'Qua 9h', available: false },
                { day: 'Qui 16h', available: true },
                { day: 'Sex 11h', available: false },
              ].map((slot, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    slot.available
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-white/5 text-white/30 border border-white/5 line-through'
                  }`}
                >
                  {slot.available ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <X className="w-3 h-3" />
                  )}
                  {slot.day}
                </div>
              ))}
            </motion.div>

            <motion.button
              variants={scaleIn}
              onClick={() => scrollToSection('diagnostico')}
              className="inline-flex items-center gap-2 bg-white text-[#0C0D26] px-10 py-5 text-sm font-bold tracking-widest uppercase hover:bg-gray-100 transition-all btn-shimmer rounded-lg"
              data-hover="true"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Garantir minha vaga
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          CTA FINAL
          ============================================ */}
      <section className="relative z-10 py-24 px-6 bg-[#6A6FF0] text-white text-center overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: ['-50%', '-45%', '-50%'],
              y: ['-50%', '-55%', '-50%'],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={scaleIn}
              className="text-4xl md:text-6xl font-heading font-bold mb-6"
            >
            Sua startup não vai morrer por falta de produto.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl opacity-90 mb-10"
            >
              Vai morrer por falta de <span className="font-bold underline decoration-white/50">vendas</span>. Estruture agora.
            </motion.p>

            <motion.button 
              variants={scaleIn}
            onClick={() => scrollToSection('diagnostico')}
              className="bg-white text-[#6A6FF0] px-12 py-6 text-sm font-bold tracking-widest uppercase hover:bg-gray-100 transition-colors shadow-2xl rounded-lg btn-shimmer"
            data-hover="true"
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              whileTap={{ scale: 0.98 }}
          >
            Agendar Diagnóstico Gratuito
            </motion.button>

            {/* Avatars */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-2 mt-10"
            >
              <div className="flex -space-x-3">
                {['MF', 'AS', 'JL', 'RC', 'PT'].map((initials, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xs font-bold"
                    style={{ zIndex: 5 - i }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span className="text-sm text-white/80 ml-3">
                +47 founders já estruturaram vendas
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="relative z-10 border-t border-white/10 py-16 bg-[#0C0D26]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="font-heading text-2xl font-bold tracking-widest mb-4 text-white">KORA</div>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Consultoria comercial especializada em startups early-stage. Transformamos caos em previsibilidade.
              </p>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  data-hover="true"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="mailto:contato@koragrowth.com" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  data-hover="true"
                >
                  <Mail className="w-4 h-4" />
                </a>
             </div>
          </div>
          
            {/* Links */}
            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-4">Empresa</h4>
              <ul className="space-y-3">
                {['Sobre', 'Metodologia', 'Cases', 'Blog'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
          </div>

            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-4">Recursos</h4>
              <ul className="space-y-3">
                {['Diagnóstico Gratuito', 'Checklist Comercial', 'Calculadora de Pipeline', 'Newsletter'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-4">Legal</h4>
              <ul className="space-y-3">
                {['Termos de Uso', 'Privacidade', 'Cookies'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Kora Growth. Todos os direitos reservados.
            </div>
          <div className="text-xs text-gray-600 font-mono">
             Feito com método, não com sorte.
          </div>
        </div>
        </div>

        {/* Back to Top */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#6A6FF0] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#585CE0] transition-all z-40"
          data-hover="true"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronDown className="w-5 h-5 rotate-180" />
        </motion.button>
      </footer>
    </div>
  );
};

export default App;
