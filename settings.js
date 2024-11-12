document.getElementById('save').addEventListener('click', () => {
  const settings = {
    apiEndpoint: document.getElementById('api-endpoint').value,
    apiKey: document.getElementById('api-key').value,
    prompt: document.getElementById('prompt').value
  };
  
  chrome.storage.sync.set(settings, () => {
    alert('Settings saved!');
  });
});