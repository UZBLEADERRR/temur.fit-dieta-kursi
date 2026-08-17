// TEMUR.FIT — Interaktiv funksiyalar

// 1. Valyutani oʻzgartirish (KRW / UZS)
function setCurrency(curr) {
  const krwBtns = document.querySelectorAll('.curr-btn');
  krwBtns.forEach(btn => {
    if (btn.dataset.curr === curr) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const krwElements = document.querySelectorAll('.price-krw');
  const uzsElements = document.querySelectorAll('.price-uzs');

  if (curr === 'UZS') {
    krwElements.forEach(el => el.classList.add('hidden'));
    uzsElements.forEach(el => el.classList.remove('hidden'));
  } else {
    krwElements.forEach(el => el.classList.remove('hidden'));
    uzsElements.forEach(el => el.classList.add('hidden'));
  }
}

// 2. Roʻyxatdan oʻtish / Tanlash modali
function openTariffModal(tariffName, tariffPrice) {
  const modal = document.getElementById('enrollModal');
  const modalTitle = document.getElementById('modalTariffName');
  const modalMsg = document.getElementById('modalCustomMsg');
  const tgBtn = document.getElementById('modalTgBtn');
  const instaBtn = document.getElementById('modalInstaBtn');

  modalTitle.textContent = tariffName;
  modalMsg.textContent = `${tariffName} bo'yicha shaxsiy konsultatsiya yoki qatnashish uchun to'g'ridan-to'g'ri Temurga yozing.`;

  const encodedMsg = encodeURIComponent(`Assalomu alaykum Temur! Men saytingiz orqali "${tariffName}" (${tariffPrice}) tarifiga yozilmoqchiman.`);
  
  tgBtn.href = `https://t.me/karate_patsan?text=${encodedMsg}`;
  instaBtn.href = `https://instagram.com/temur.fit`;

  modal.classList.remove('hidden');
}

function closeTariffModal() {
  const modal = document.getElementById('enrollModal');
  modal.classList.add('hidden');
}

// 3. Kaloriya va norma kalkulyatori
function calculateFitness() {
  const gender = document.getElementById('calcGender').value;
  const age = parseFloat(document.getElementById('calcAge').value) || 25;
  const weight = parseFloat(document.getElementById('calcWeight').value) || 70;
  const height = parseFloat(document.getElementById('calcHeight').value) || 175;
  const goal = document.getElementById('calcGoal').value;

  // Mifflin-St Jeor formulasi
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // O'rtacha faollik koeffitsiyenti (1.375)
  let tdee = Math.round(bmr * 1.375);
  let targetCalories = tdee;
  let advice = '';

  if (goal === 'loss') {
    targetCalories = Math.round(tdee - 450);
    advice = '🔥 Yogʻ eritish uchun kunlik 400-500 kkal defitsit va yuqori oqsil ratsioni tavsiya etiladi.';
  } else if (goal === 'gain') {
    targetCalories = Math.round(tdee + 350);
    advice = '💪 Mushak massasi yigʻish uchun sof mahsulotlar va ortiqcha 350 kkal profisit kerak.';
  } else {
    advice = '⚡ Tana shaklini saqlash va relefni yaxshilash uchun muvozanatli ovqatlanish rejasi zarur.';
  }

  const protein = Math.round(weight * 2.0); // 2g/kg
  const water = (weight * 0.035).toFixed(1); // 35ml/kg

  document.getElementById('resCalories').textContent = targetCalories + ' kkal';
  document.getElementById('resProtein').textContent = protein + ' g';
  document.getElementById('resWater').textContent = water + ' L';
  document.getElementById('resAdvice').textContent = advice;

  document.getElementById('calcResult').classList.remove('hidden');
}

// Sahifa yuklanganda hodisalarni ulash
document.addEventListener('DOMContentLoaded', () => {
  // Modal fonini bosganda yopish
  const modal = document.getElementById('enrollModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeTariffModal();
      }
    });
  }
});
