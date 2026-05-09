// assets/js/dashboard.js

function formatNumber(num) {
  return num.toLocaleString();
}

function animateCounter(elementId, endValue, duration = 1500) {
  const element = document.getElementById(elementId);
  if (!element) return;

  let start = 0;
  const increment = endValue / (duration / 16);

  function updateCounter() {
    start += increment;

    if (start < endValue) {
      element.innerText = formatNumber(Math.floor(start));
      requestAnimationFrame(updateCounter);
    } else {
      element.innerText = formatNumber(endValue);
    }
  }

  updateCounter();
}

function loadRevenueChart() {
  const ctx = document.getElementById('revenueChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Revenue',
        data: [420000, 580000, 730000, 946573],
        borderColor: 'white',
        backgroundColor: 'rgba(255,255,255,0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: 'white'
          }
        }
      },
      scales: {
        x: {
          ticks: { color: 'white' }
        },
        y: {
          ticks: { color: 'white' }
        }
      }
    }
  });
}

function initializeDashboard() {
  animateCounter('ytdRevenue', 2676573);
  animateCounter('ytdBudget', 2748696);
  loadRevenueChart();
}

document.addEventListener('DOMContentLoaded', initializeDashboard);
