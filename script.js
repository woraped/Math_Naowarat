const form = document.getElementById('compound-form');
const resultSection = document.getElementById('result');
const totalAmountEl = document.getElementById('total-amount');
const interestAmountEl = document.getElementById('interest-amount');
const resetBtn = document.getElementById('reset-btn');

const formatCurrency = (value) =>
  new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const principal = Number(form.principal.value);
  const annualRatePercent = Number(form.rate.value);
  const compoundsPerYear = Number(form.times.value);
  const years = Number(form.years.value);

  if (
    Number.isNaN(principal) ||
    Number.isNaN(annualRatePercent) ||
    Number.isNaN(compoundsPerYear) ||
    Number.isNaN(years) ||
    principal < 0 ||
    annualRatePercent < 0 ||
    compoundsPerYear < 1 ||
    years < 0
  ) {
    alert('กรุณากรอกข้อมูลให้ถูกต้องครบทุกช่อง');
    return;
  }

  const rate = annualRatePercent / 100;
  const total = principal * Math.pow(1 + rate / compoundsPerYear, compoundsPerYear * years);
  const interest = total - principal;

  totalAmountEl.textContent = formatCurrency(total);
  interestAmountEl.textContent = formatCurrency(interest);
  resultSection.hidden = false;
  resetBtn.hidden = false;
});

resetBtn?.addEventListener('click', () => {
  form.reset();
  resultSection.hidden = true;
  resetBtn.hidden = true;
  totalAmountEl.textContent = '-';
  interestAmountEl.textContent = '-';
  form.principal.focus();
});
