(function exposeStorage(global) {
  const key = 'skybar.finance.view';

  function loadView() {
    try {
      return JSON.parse(localStorage.getItem(key)) || {};
    } catch (error) {
      console.warn('Saved dashboard view could not be read.', error);
      return {};
    }
  }

  function saveView(view) {
    localStorage.setItem(key, JSON.stringify(view));
  }

  global.SKYBARStorage = { loadView, saveView };
})(window);
