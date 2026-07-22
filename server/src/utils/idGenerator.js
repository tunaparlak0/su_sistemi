const crypto = require('crypto');

const generateWorkerId = (name, surname) => {//çalışan id oluşturucu
  const letters = (name[0] + surname[0]).toUpperCase();
  const randomNumbers = Math.floor(10000 + Math.random() * 90000); 
  return `${letters}${randomNumbers}`;
};
const generateWorkerToken = () => {
    return crypto.randomBytes(4).toString('hex'); // 8 karakterlik rastgele bir şifre
};
const formatMeterNo = (number) => {
    // Sayıyı 6 basamağa tamamlar (Örn: 1 -> 000001)
    const paddedNumber = String(number).padStart(6, '0');
    return `SK-${paddedNumber}`;
};
const generateSubscriptionId = (number) => {
    // Sayıyı 7 basamağa tamamlar (Örn: 1000000 -> 1000000)
    const paddedNumber = String(number).padStart(7, '0');
    return `SUB-${paddedNumber}`;
};
module.exports = {generateWorkerId, generateWorkerToken, formatMeterNo, generateSubscriptionId};

