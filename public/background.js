// Background Service Worker - Manifest V3
// declarativeNetRequest를 통해 X-Frame-Options 헤더 제거

// Service Worker 설치 시
chrome.runtime.onInstalled.addListener((details) => {
    console.log('[Gold Stock Coin Live] Extension installed:', details.reason);

    // 확장 프로그램 규칙 확인
    chrome.declarativeNetRequest.getEnabledRulesets((rulesets) => {
        console.log('[Gold Stock Coin Live] Active rulesets:', rulesets);
    });
});

// Service Worker 시작 시
console.log('[Gold Stock Coin Live] Service worker loaded');
console.log('[Gold Stock Coin Live] X-Frame-Options bypass active for gemini.google.com');

// 메시지 리스너 (디버깅용)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'checkExtension') {
        sendResponse({
            active: true,
            version: chrome.runtime.getManifest().version
        });
    }
    return true;
});

