function initiallize() {
  const CHAT_GPT_URL = 'https://chatgpt.com';

  const url = new URL(window.location.href);
  if (url.origin !== CHAT_GPT_URL) return;

  const xpath = "//textarea[@id='prompt-textarea']";
  const textArea = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  ).singleNodeValue;
  if (textArea === null) return;

  textArea.addEventListener('click', function openSidePanel() {
    chrome.runtime.sendMessage('open_side_panel');
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (
      message.action === 'paste-text' &&
      typeof message.payload === 'string' &&
      textArea instanceof HTMLTextAreaElement
    ) {
      // input 요소의 현재 값을 가져옵니다.
      const currentValue = textArea.value;

      // 추가할 텍스트를 정의합니다.
      const additionalText = ` ${message.payload}`;

      // input 요소의 값에 추가 텍스트를 붙입니다.
      textArea.value = currentValue + additionalText;
    }
  });
}

initiallize();
