import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const STORAGE_KEY = 'perplexity_messages';
const API_KEY_STORAGE = 'perplexity_api_key';

export const usePerplexity = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse messages:', e);
      }
    }

    const storedKey = localStorage.getItem(API_KEY_STORAGE);
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem(API_KEY_STORAGE, key);
    toast.success('API 키가 저장되었습니다');
  };

  const saveMessages = (newMessages: Message[]) => {
    setMessages(newMessages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
  };

  const sendMessage = async (content: string) => {
    if (!apiKey) {
      toast.error('Perplexity API 키를 먼저 설정해주세요');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    saveMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.content,
          })),
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API 오류: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: Date.now(),
      };

      saveMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error('Perplexity API 오류:', error);
      toast.error('메시지 전송에 실패했습니다');
      saveMessages(messages);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    toast.success('대화 기록이 삭제되었습니다');
  };

  return {
    messages,
    isLoading,
    apiKey,
    sendMessage,
    saveApiKey,
    clearHistory,
  };
};
