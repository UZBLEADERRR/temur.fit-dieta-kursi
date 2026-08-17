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

// 3. Kaloriya & Suv Kalkulyatori (Real-time Jonli Hisoblash)
function computeFitnessMetrics() {
  const weightInput = document.getElementById('calcWeight');
  const heightInput = document.getElementById('calcHeight');
  const ageInput = document.getElementById('calcAge');
  const goalInput = document.getElementById('calcGoal');

  if (!weightInput || !heightInput || !ageInput || !goalInput) return;

  const weight = parseFloat(weightInput.value) || 75;
  const height = parseFloat(heightInput.value) || 178;
  const age = parseFloat(ageInput.value) || 25;
  const goal = goalInput.value;

  // Ko'rsatkich qiymatlarini ekranga yozish
  const dispWeight = document.getElementById('valWeightDisp');
  const dispHeight = document.getElementById('valHeightDisp');
  const dispAge = document.getElementById('valAgeDisp');

  if (dispWeight) dispWeight.textContent = weight + ' kg';
  if (dispHeight) dispHeight.textContent = height + ' sm';
  if (dispAge) dispAge.textContent = age + ' yosh';

  // Mifflin-St Jeor formulasi
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  let tdee = bmr * 1.35; // O'rtacha faollik koeffitsiyenti

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

  const resCal = document.getElementById('resCalories');
  const resWater = document.getElementById('resWater');
  const resTariff = document.getElementById('resTariff');

  if (resCal) resCal.textContent = `${targetCal.toLocaleString()} kkal / kun`;
  if (resWater) resWater.textContent = `${waterMin} - ${waterMax} Litr`;
  if (resTariff) resTariff.textContent = tariffRecommendation;
}

function initCalculator() {
  const weightInput = document.getElementById('calcWeight');
  const heightInput = document.getElementById('calcHeight');
  const ageInput = document.getElementById('calcAge');
  const goalInput = document.getElementById('calcGoal');

  if (weightInput) weightInput.addEventListener('input', computeFitnessMetrics);
  if (heightInput) heightInput.addEventListener('input', computeFitnessMetrics);
  if (ageInput) ageInput.addEventListener('input', computeFitnessMetrics);
  if (goalInput) goalInput.addEventListener('change', computeFitnessMetrics);

  computeFitnessMetrics();
}

// Boshlang'ich ishga tushirish
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
