const crypto = require('crypto');
/*const generateSevenDigitId = () => {// abonelik no oluşturucu
  return Math.floor(1000000 + Math.random() * 9000000);
};
const generateUserId = (name, surname) => {//kullanıcı id oluşturucu
  const letters = (name[0] + surname[0]).toUpperCase();
  const randomNumbers = Math.floor(10000 + Math.random() * 90000); 
  return `${letters}${randomNumbers}`;
};
const generateInvoiceId = (date) => {// fatura id oluşturucu
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2); // 2026 -> 26
  
  const randomNumbers = Math.floor(10000 + Math.random() * 90000); 
  return `${day}${month}${year}-${randomNumbers}`; // 140826-12345
};*/
const generateAdminToken = () => {
    return crypto.randomBytes(4).toString('hex'); // 8 karakterlik rastgele bir şifre
};
module.exports = {/* generateSevenDigitId, generateUserId, generateInvoiceId,*/ generateAdminToken };

