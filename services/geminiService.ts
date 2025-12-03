/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY || '';

let chatSession: Chat | null = null;

// Respostas mockadas para quando não há API key
const getMockResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('diagnóstico') || lowerMessage.includes('diagnostico')) {
    return "O diagnóstico gratuito inclui análise da narrativa comercial, esboço do funil, mapa de objeções, priorização de canais e plano de 3 semanas. Agende pelo botão abaixo!";
  }
  
  if (lowerMessage.includes('preço') || lowerMessage.includes('preco') || lowerMessage.includes('valor') || lowerMessage.includes('custo')) {
    return "Temos 3 soluções: Diagnóstico (obrigatório), Estruturação Comercial (core) e Execução Assistida (growth). O diagnóstico é gratuito. Agende para conhecer os valores!";
  }
  
  if (lowerMessage.includes('serviço') || lowerMessage.includes('servico') || lowerMessage.includes('o que fazem')) {
    return "Estruturação comercial (funil, ICP, narrativa), execução guiada e previsibilidade. Tudo para transformar caos em processo comercial. Quer agendar um diagnóstico?";
  }
  
  if (lowerMessage.includes('startup') || lowerMessage.includes('empresa')) {
    return "Trabalhamos com startups early-stage que validaram o problema mas ainda não têm vendas consistentes. Se esse é seu caso, agende um diagnóstico gratuito!";
  }
  
  return "Entendo sua dúvida. A melhor forma de ajudar é através do nosso diagnóstico gratuito, onde analisamos sua situação comercial específica. Quer agendar?";
};

export const initializeChat = (): Chat | null => {
  if (!API_KEY) return null;
  
  if (chatSession) return chatSession;

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are 'KORA AI', a senior sales consultant for KORA Growth.
        
        Mission: Help early-stage startups structure their sales process.
        Tone: Professional, direct, authoritative but accessible. Avoid buzzwords. Be concise.
        
        About KORA:
        - We fix the "Valley of Death" where startups have product but no sales.
        - We offer: Sales Structure (Funnel, ICP, Narrative), Guided Execution, Predictability.
        - Lead Magnet: Free Commercial Diagnosis.
        
        If asked about pricing/services: Mention the 3 tiers: 1) Diagnosis, 2) Commercial Structure, 3) Assisted Execution.
        
        Keep responses short (under 3 sentences). Always drive them to "Schedule a Diagnosis".`,
      },
    });

    return chatSession;
  } catch (error) {
    console.error("Error initializing Gemini:", error);
    return null;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  // Se não há API key, usar respostas mockadas
  if (!API_KEY) {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 500));
    return getMockResponse(message);
  }

  try {
    const chat = initializeChat();
    if (!chat) {
      return getMockResponse(message);
    }
    
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Sem resposta do servidor.";
  } catch (error) {
    console.error("Gemini Error:", error);
    // Em caso de erro, usar resposta mockada
    return getMockResponse(message);
  }
};