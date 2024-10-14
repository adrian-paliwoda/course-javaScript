const interval = setInterval(() => console.log('Sending analytics....'), 2000);

document.getElementById('analyticsBtn').addEventListener('click', () => clearInterval(interval));