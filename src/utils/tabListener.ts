export const addTabListener = (name: string, callback: (data: any) => void) => {
  chrome.runtime.onMessage.addListener(function (request) {
    if (request.message === name) {
      callback(request.data);
    }
  });
};
export const sendMessage = (name: string, data: any) => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab && activeTab.id)
      chrome.tabs.sendMessage(activeTab.id, { message: name, data });
  });
};
