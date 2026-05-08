async function loadSampleData() {
  const response = await fetch('data/sample-data.json', { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Unable to load sample data: ${response.status}`);
  }

  return response.json();
}

async function bootDashboard() {
  try {
    const data = await loadSampleData();
    window.SkybarFinance.renderDashboard(data.quarters);
  } catch (error) {
    document.querySelector('#quarter-table').innerHTML = `
      <tr><td colspan="4">${error.message}</td></tr>
    `;
  }
}

document.querySelector('#refresh-data')?.addEventListener('click', bootDashboard);
bootDashboard();
