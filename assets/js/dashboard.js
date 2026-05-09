<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Restaurant Finance Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #B794F4, #8B5CF6, #93C5FD);
      min-height: 100vh;
    }

    .glass {
      background: rgba(255,255,255,0.12);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 24px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    }
  </style>
</head>
<body class="p-4 md:p-8 text-white">

<div class="max-w-7xl mx-auto">

  <header class="glass p-6 mb-6 sticky top-4 z-50">
    <h1 class="text-3xl font-bold">Restaurant Finance Dashboard</h1>
    <p class="text-white/70 mt-2">Revenue • Budget • GOP • Food & Beverage</p>
  </header>

  <!-- YTD -->
  <section class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <div class="glass p-5"><p>YTD Revenue</p><h2 id="ytdRevenue" class="text-2xl font-bold mt-2">0</h2></div>
    <div class="glass p-5"><p>YTD Budget</p><h2 id="ytdBudget" class="text-2xl font-bold mt-2">0</h2></div>
    <div class="glass p-5"><p>Achievement</p><h2 class="text-2xl font-bold text-green-300 mt-2">97.4%</h2></div>
    <div class="glass p-5"><p>Variance</p><h2 class="text-2xl font-bold text-red-300 mt-2">-72,123</h2></div>
  </section>

  <!-- MTD + GOP -->
  <section class="grid lg:grid-cols-2 gap-6 mb-6">

    <div class="glass p-6">
      <h2 class="text-xl font-semibold mb-4">Month To Date</h2>
      <div class="space-y-2">
        <p>Revenue: <strong>176,510</strong></p>
        <p>Budget: <strong>167,124</strong></p>
        <p>Achievement: <strong class="text-green-300">30.7%</strong></p>
      </div>
    </div>

    <div class="glass p-6">
      <h2 class="text-xl font-semibold mb-4">Gross Operating Profit</h2>
      <div class="space-y-2">
        <p>Revenue: <strong>176,510</strong></p>
        <p>COGS: <strong>109,219</strong></p>
        <p>GOP: <strong class="text-green-300">67,291</strong></p>
      </div>
    </div>

  </section>

  <!-- Charts -->
  <section class="grid lg:grid-cols-2 gap-6 mb-6">

    <div class="glass p-6">
      <h2 class="text-xl font-semibold mb-4">Revenue Trend</h2>
      <canvas id="revenueChart"></canvas>
    </div>

    <div class="glass p-6">
      <h2 class="text-xl font-semibold mb-4">Food vs Beverage</h2>
      <canvas id="pieChart"></canvas>
    </div>

  </section>

  <!-- Table -->
  <section class="glass p-6">
    <h2 class="text-xl font-semibold mb-4">Recent Entries</h2>

    <input id="searchInput" type="text" placeholder="Search date..."
      class="mb-4 px-4 py-2 rounded-xl text-black w-full md:w-64" />

    <div class="overflow-auto">
      <table class="w-full text-left" id="financeTable">
        <thead>
          <tr>
            <th class="py-2">Date</th>
            <th>Revenue</th>
            <th>Budget</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>04-05-2026</td><td>26,209</td><td>18,000</td><td class="text-green-300">Good</td></tr>
          <tr><td>08-05-2026</td><td>18,179</td><td>22,000</td><td class="text-red-300">Poor</td></tr>
          <tr><td>10-05-2026</td><td>21,900</td><td>20,000</td><td class="text-orange-300">Average</td></tr>
        </tbody>
      </table>
    </div>
  </section>

</div>

<script>
function animateCounter(id, endValue) {
  const element = document.getElementById(id);
  let current = 0;
  const increment = endValue / 100;

  const timer = setInterval(() => {
    current += increment;

    if (current >= endValue) {
      current = endValue;
      clearInterval(timer);
    }

    element.innerText = Math.floor(current).toLocaleString();
  }, 15);
}

animateCounter('ytdRevenue', 2676573);
animateCounter('ytdBudget', 2748696);

new Chart(document.getElementById('revenueChart'), {
  type: 'line',
  data: {
    labels: ['Week 1','Week 2','Week 3','Week 4'],
    datasets: [{
      data: [420000, 580000, 730000, 946573],
      borderColor: 'white',
      tension: 0.4
    }]
  }
});

new Chart(document.getElementById('pieChart'), {
  type: 'doughnut',
  data: {
    labels: ['Food', 'Beverage'],
    datasets: [{
      data: [29.2, 70.8],
      backgroundColor: [
        'rgba(255,255,255,0.85)',
        'rgba(255,255,255,0.3)'
      ]
    }]
  }
});

document.getElementById('searchInput').addEventListener('keyup', function() {
  const filter = this.value.toLowerCase();
  const rows = document.querySelectorAll('#financeTable tbody tr');

  rows.forEach(row => {
    const date = row.cells[0].innerText.toLowerCase();
    row.style.display = date.includes(filter) ? '' : 'none';
  });
});
</script>

</body>
</html>
