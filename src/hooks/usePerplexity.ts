import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { streamPerplexityResponse } from '@/utils/perplexity-api';

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

    // 임시 응답 메시지 생성
    const tempAssistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };

    const messagesWithTemp = [...updatedMessages, tempAssistantMessage];
    setMessages(messagesWithTemp);

    try {
      await streamPerplexityResponse({
        apiKey,
        messages: updatedMessages.map(m => ({
          role: m.role,
          content: m.content,
        })),
        onUpdate: (text) => {
          // 실시간 업데이트
          const updated = [...updatedMessages, {
            ...tempAssistantMessage,
            content: text,
          }];
          setMessages(updated);
        },
        onComplete: () => {
          // 완료 시 저장
          const finalMessages = [...updatedMessages, {
            ...tempAssistantMessage,
            content: messages[messages.length - 1]?.content || '',
          }];
          saveMessages(finalMessages);
          setIsLoading(false);
        },
        onError: (error) => {
          console.error('Perplexity API 오류:', error);
          toast.error('메시지 전송에 실패했습니다');
          saveMessages(messages);
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error('Perplexity API 오류:', error);
      toast.error('메시지 전송에 실패했습니다');
      saveMessages(messages);
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
