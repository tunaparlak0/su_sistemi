const generateSevenDigitId = () => {
  return Math.floor(1000000 + Math.random() * 9000000);
};
const generateUserId = (name, surname) => {
  const letters = (name[0] + surname[0]).toUpperCase();
  const randomNumbers = Math.floor(10000 + Math.random() * 90000); // 5 basamaklı sayı
  return `${letters}${randomNumbers}`;
};
const generateInvoiceId = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2); // 2026 -> 26
  
  const randomNumbers = Math.floor(10000 + Math.random() * 90000); // 5 basamaklı
  return `${day}${month}${year}-${randomNumbers}`; // 140826-12345
};

module.exports = { generateSevenDigitId, generateUserId, generateInvoiceId };

