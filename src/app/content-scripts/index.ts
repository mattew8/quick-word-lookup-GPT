function findTextAreaAndAddEvent() {
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
}

findTextAreaAndAddEvent();
