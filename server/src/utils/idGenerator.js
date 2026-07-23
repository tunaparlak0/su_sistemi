
const formatMeterNo = (number) => {
    return String(number).padStart(6, '0');
};


const generateSubscriptionId = (number) => {
    return String(number);
};
const generateWorkerId = (name, surname) => {
  const firstInitial = name ? name.trim().charAt(0).toUpperCase() : 'W';
  const lastInitial = surname ? surname.trim().charAt(0).toUpperCase() : 'K';
  const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4 basamaklı rastgele sayı
  
  return `${firstInitial}${lastInitial}${randomDigits}`;
};
const generateRandomToken = () => {
  // 8 haneli rastgele harf ve sayı karışımı token
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};
module.exports = { formatMeterNo, generateSubscriptionId, generateWorkerId, generateRandomToken };