/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Accordion Component - FAQ with smooth animations
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface AccordionItemData {
  question: string;
  answer: string;
  category?: string;
}

interface AccordionItemProps {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
  index,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [item.answer]);

  return (
    <motion.div
      className="accordion-item"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      data-open={isOpen}
    >
      <button
        className="accordion-trigger group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="pr-8 font-heading">{item.question}</span>
        <motion.div
          className="accordion-icon flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-[#6A6FF0]/20 transition-colors"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Plus className="w-4 h-4 text-[#6A6FF0]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: height, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div ref={contentRef} className="pb-6 pr-12">
              <p className="text-[#C8C9D9] leading-relaxed">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(index);
      }
      
      return newSet;
    });
  };

  return (
    <div className={`accordion ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isOpen={openItems.has(index)}
          onToggle={() => toggleItem(index)}
          index={index}
        />
      ))}
    </div>
  );
};

export default Accordion;

// FAQ Data
export const FAQ_DATA: AccordionItemData[] = [
  {
    question: 'O que está incluso no Diagnóstico Gratuito?',
    answer: 'O diagnóstico inclui análise da sua narrativa comercial, esboço do funil ideal, mapa de objeções, priorização de canais e um plano de ação para as próximas 3 semanas. Tudo isso em uma sessão de 60 minutos.',
    category: 'Diagnóstico',
  },
  {
    question: 'Quanto tempo leva para ver resultados?',
    answer: 'Startups que implementam nossa estrutura comercial começam a ver resultados nas primeiras 2-3 semanas. A previsibilidade total do pipeline geralmente acontece entre 6-8 semanas.',
    category: 'Resultados',
  },
  {
    question: 'Vocês trabalham com qualquer tipo de startup?',
    answer: 'Focamos em startups early-stage (pre-seed a Series A) que já validaram o problema e têm um MVP. Se você ainda está na fase de ideação, podemos não ser o melhor fit.',
    category: 'Processo',
  },
  {
    question: 'Qual o investimento para a Estruturação Comercial?',
    answer: 'O investimento varia conforme a complexidade e necessidades da sua startup. Após o diagnóstico gratuito, apresentamos uma proposta personalizada. Trabalhamos com projetos a partir de R$15k.',
    category: 'Investimento',
  },
  {
    question: 'Vocês garantem resultados?',
    answer: 'Trabalhamos com métricas claras e checkpoints semanais. Se após 30 dias você não estiver satisfeito com o progresso, devolvemos seu investimento. Nossa taxa de sucesso é de 94%.',
    category: 'Resultados',
  },
  {
    question: 'Como funciona a Execução Assistida?',
    answer: 'Acompanhamos suas primeiras abordagens comerciais em tempo real, fazemos shadowing de calls, ajustamos o pitch semanalmente e construímos junto os primeiros playbooks de objeção.',
    category: 'Processo',
  },
  {
    question: 'Posso começar direto pela Estruturação sem o Diagnóstico?',
    answer: 'O diagnóstico é obrigatório para todos os novos clientes. É nossa forma de garantir que há fit e entregar valor desde o primeiro contato. Sem diagnóstico, não há proposta.',
    category: 'Processo',
  },
  {
    question: 'Vocês integram com nosso CRM atual?',
    answer: 'Sim! Trabalhamos com os principais CRMs do mercado (Pipedrive, HubSpot, Salesforce, RD Station). Se você não tem CRM, ajudamos a escolher e configurar o ideal.',
    category: 'Processo',
  },
];

