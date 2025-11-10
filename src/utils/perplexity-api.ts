// Perplexity API 유틸리티 - SSE 스트리밍 방식

export interface PerplexityMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface PerplexityStreamOptions {
  apiKey: string;
  messages: PerplexityMessage[];
  onUpdate: (text: string) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
  signal?: AbortSignal;
}

/**
 * Perplexity API SSE 스트리밍 요청
 */
export async function streamPerplexityResponse(options: PerplexityStreamOptions) {
  const { apiKey, messages, onUpdate, onComplete, onError, signal } = options;

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: messages,
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1000,
        stream: false, // API가 streaming을 지원하지 않으므로 일반 응답 사용
      }),
      signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API 오류 (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    
    // 응답 파싱 및 패치 적용
    if (data.choices && data.choices[0]?.message?.content) {
      const content = cleanPerplexityContent(data.choices[0].message.content);
      onUpdate(content);
      onComplete();
    } else {
      throw new Error('응답 형식 오류');
    }
  } catch (error) {
    if (error instanceof Error) {
      onError(error);
    } else {
      onError(new Error('알 수 없는 오류'));
    }
  }
}

/**
 * 콘텐츠 패치 적용 - pplx:// 링크 제거 등
 */
function cleanPerplexityContent(content: string): string {
  // pplx:// 링크를 일반 텍스트로 변환
  let cleaned = content.replace(/\[([^\]]+)\]\(pplx:\/\/[^)]+\)/g, '$1');
  
  // 추가 클린업 로직
  cleaned = cleaned.trim();
  
  return cleaned;
}
