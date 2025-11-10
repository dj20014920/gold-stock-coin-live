import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const STORAGE_KEY = 'perplexity_messages';
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/perplexity-chat`;

export const usePerplexity = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        console.error('메시지 로드 실패:', e);
      }
    }
  }, []);

  const saveMessages = (newMessages: Message[]) => {
    setMessages(newMessages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
  };

  const sendMessage = async (content: string) => {
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
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast.error('요청이 너무 많습니다. 잠시 후 다시 시도해주세요.');
          saveMessages(messages);
          return;
        }
        if (response.status === 402) {
          toast.error('크레딧이 부족합니다. 설정에서 크레딧을 충전해주세요.');
          saveMessages(messages);
          return;
        }
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
      console.error('메시지 전송 실패:', error);
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
    sendMessage,
    clearHistory,
  };
};
