// ==========================================
// TEMUR.FIT — JAVASCRIPT LOGIC
// ==========================================

let currentCurrency = 'KRW';

// 1. Valyuta almashtirish
function initCurrencyToggle() {
  const toggleContainer = document.getElementById('currencyToggle');
  if (!toggleContainer) return;

  const buttons = toggleContainer.querySelectorAll('.curr-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCurrency = btn.getAttribute('data-curr');
      updatePrices();
    });
  });
}

function updatePrices() {
  const priceElements = document.querySelectorAll('.price-val');
  priceElements.forEach(el => {
    if (currentCurrency === 'UZS') {
      const uzs = el.getAttribute('data-uzs');
      if (uzs) el.textContent = uzs;
    } else {
      const krw = el.getAttribute('data-krw');
      if (krw) el.textContent = krw;
    }
  });

  const stickyPrice = document.getElementById('stickyPriceText');
  if (stickyPrice) {
    stickyPrice.textContent = currentCurrency === 'UZS' ? '700,000 SO\'M' : '100,000 KRW';
  }
}

// 2. Ro'yxatdan o'tish modali
function openEnroll(tariffName, tariffPrice) {
  const modal = document.getElementById('enrollModal');
  const titleEl = document.getElementById('modalTariffTitle');
  const priceEl = document.getElementById('modalTariffPrice');
  const tgLink = document.getElementById('modalTgLink');
  const instaLink = document.getElementById('modalInstaLink');

  if (titleEl) titleEl.textContent = tariffName;
  if (priceEl) priceEl.textContent = tariffPrice;

  const encodedMsg = encodeURIComponent(
    `Assalomu alaykum Temur! Men saytingiz orqali "${tariffName}" (${tariffPrice}) tarifiga yozilmoqchiman.`
  );

  if (tgLink) {
    tgLink.href = `https://t.me/karate_patsan?text=${encodedMsg}`;
  }
  if (instaLink) {
    instaLink.href = `https://instagram.com/temur.fit`;
  }

  if (modal) {
    modal.classList.add('active');
  }
}

function closeEnroll() {
  const modal = document.getElementById('enrollModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// 3. Kaloriya & Suv Kalkulyatori
function initCalculator() {
  const calcBtn = document.getElementById('btnCalculate');
  if (!calcBtn) return;

  calcBtn.addEventListener('click', () => {
    const weight = parseFloat(document.getElementById('calcWeight').value) || 75;
    const height = parseFloat(document.getElementById('calcHeight').value) || 178;
    const age = parseFloat(document.getElementById('calcAge').value) || 24;
    const goal = document.getElementById('calcGoal').value;

    // BMR formulasi (Mifflin-St Jeor)
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    let tdee = bmr * 1.35; // O'rtacha faollik

    let targetCal = Math.round(tdee);
    let tariffRecommendation = '02 - 40 Kunlik Transformatsiya';

    if (goal === 'cut') {
      targetCal = Math.round(tdee - 450);
      tariffRecommendation = '02 - 40 Kunlik Transformatsiya (Yog\' eritish)';
    } else if (goal === 'lean') {
      targetCal = Math.round(tdee + 300);
      tariffRecommendation = '03 - Individual Ishlash (Maksimal Natija)';
    } else {
      targetCal = Math.round(tdee - 350);
      tariffRecommendation = '02 - 40 Kunlik Transformatsiya (Hit)';
    }

    const waterMin = (weight * 0.035).toFixed(1);
    const waterMax = (weight * 0.042).toFixed(1);

    document.getElementById('resCalories').textContent = `${targetCal.toLocaleString()} kkal / kun`;
    document.getElementById('resWater').textContent = `${waterMin} - ${waterMax} Litr`;
    document.getElementById('resTariff').textContent = tariffRecommendation;
  });
}

// Boshlang'ich sozlamalar
document.addEventListener('DOMContentLoaded', () => {
  initCurrencyToggle();
  initCalculator();

  const modal = document.getElementById('enrollModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeEnroll();
      }
    });
  }
});
