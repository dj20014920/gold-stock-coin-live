const NAVER_PROXY_PATH = '/naver-api/v1/search/news.json';
const GOOGLE_ENDPOINT = 'https://www.googleapis.com/customsearch/v1';

const stripHtml = (value) => {
  if (!value) return '';
  const withoutTags = value.replace(/<[^>]*>/g, '');
  return withoutTags
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
};

const formatDate = (value) => {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toISOString().split('T')[0];
};

const extractHostname = (url) => {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

const extractGoogleDate = (item) => {
  const metatags = item?.pagemap?.metatags?.[0] ?? {};
  const newsArticle = item?.pagemap?.newsarticle?.[0] ?? {};
  const candidates = [
    metatags['article:published_time'],
    metatags['og:published_time'],
    metatags['og:pubdate'],
    metatags.pubdate,
    newsArticle.datepublished,
    newsArticle.datemodified,
  ];

  for (const candidate of candidates) {
    const formatted = formatDate(candidate);
    if (formatted) return formatted;
  }
  return '';
};

const assertEnv = (value, message) => {
  if (!value) {
    throw new Error(message);
  }
  return value;
};

const resolveNaverEndpoint = () => {
  const proxyBase = import.meta.env.VITE_NAVER_PROXY_URL;
  if (proxyBase) {
    return `${proxyBase.replace(/\/$/, '')}/v1/search/news.json`;
  }
  // 기본: 같은 도메인에서 /naver-api/* 로 프록시(rewrite 필요)
  return NAVER_PROXY_PATH;
};

const fetchGoogleNews = async (query) => {
  const apiKey = assertEnv(
    import.meta.env.VITE_GOOGLE_SEARCH_API_KEY,
    '구글 API 키(VITE_GOOGLE_SEARCH_API_KEY)가 설정되지 않았습니다.'
  );
  const searchEngineId = assertEnv(
    import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID,
    '구글 검색 엔진 ID(VITE_GOOGLE_SEARCH_ENGINE_ID)가 설정되지 않았습니다.'
  );

  const url = new URL(GOOGLE_ENDPOINT);
  url.search = new URLSearchParams({
    key: apiKey,
    cx: searchEngineId,
    q: query,
    num: '10',
    gl: 'kr',
    lr: 'lang_ko',
    safe: 'off',
  }).toString();

  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('구글 API 호출 한도에 도달했습니다. 잠시 후 다시 시도해 주세요.');
    }
    throw new Error(`구글 뉴스 검색에 실패했습니다. (HTTP ${response.status})`);
  }

  const data = await response.json();
  const items = data.items ?? [];

  return items.map((item, index) => ({
    id: item.cacheId ? `google-${item.cacheId}` : `google-${index}`,
    title: stripHtml(item.title),
    source: item.displayLink || extractHostname(item.link) || 'Google News',
    date: extractGoogleDate(item),
    snippet: stripHtml(item.snippet ?? ''),
    url: item.link,
  }));
};

const fetchNaverNews = async (query) => {
  const clientId = assertEnv(
    import.meta.env.VITE_NAVER_CLIENT_ID,
    '네이버 Client ID(VITE_NAVER_CLIENT_ID)가 설정되지 않았습니다.'
  );
  const clientSecret = assertEnv(
    import.meta.env.VITE_NAVER_CLIENT_SECRET,
    '네이버 Client Secret(VITE_NAVER_CLIENT_SECRET)가 설정되지 않았습니다.'
  );

  const endpoint = resolveNaverEndpoint();
  const url =
    endpoint.startsWith('http')
      ? new URL(endpoint)
      : new URL(endpoint, window.location.origin);

  url.search = new URLSearchParams({
    query,
    display: '20',
    sort: 'date',
  }).toString();

  let response;
  try {
    response = await fetch(url, {
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
    });
  } catch (error) {
    const isCors = error instanceof TypeError && error.message === 'Failed to fetch';
    if (isCors) {
      throw new Error('네이버 뉴스 호출이 CORS로 차단되었습니다. 프록시 설정을 확인해 주세요.');
    }
    throw error;
  }

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('네이버 API 호출 한도에 도달했습니다. 잠시 후 다시 시도해 주세요.');
    }
    throw new Error(`네이버 뉴스 검색에 실패했습니다. (HTTP ${response.status})`);
  }

  const data = await response.json();
  const items = data.items ?? [];

  return items.map((item, index) => {
    const source = extractHostname(item.originallink || item.link) || 'Naver News';
    return {
      id: `naver-${index}-${item.link}`,
      title: stripHtml(item.title),
      source,
      date: formatDate(item.pubDate),
      snippet: stripHtml(item.description ?? ''),
      url: item.originallink || item.link,
    };
  });
};

export const searchNews = async (query, apiType = 'google') => {
  const trimmed = query.trim();
  if (!trimmed) return [];

  if (apiType === 'naver') {
    return fetchNaverNews(trimmed);
  }
  return fetchGoogleNews(trimmed);
};
