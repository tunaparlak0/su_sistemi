const formatMeterNo = (number) => {
    return String(number).padStart(6, '0');
};


const generateSubscriptionId = (number) => {
    return String(number);
};
const generateWorkerId = (name, surname) => {
  //Türkçe karakterleri İngilizce karşılıklarına dönüştüren yardımcı fonksiyon
  const removeTurkishChars = (str) => {
    if (!str) return '';
    return str
      .trim()
      .normalize("NFD") // Harfler ile aksanlarını ayırır (Örn: ş -> s + çengel)
      .replace(/[\u0300-\u036f]/g, "") // Aksan işaretlerini siler
      .replace(/ı/g, 'i') 
      .replace(/İ/g, 'I'); 
  };

  const cleanName = removeTurkishChars(name);
  const cleanSurname = removeTurkishChars(surname);

  const firstInitial = cleanName ? cleanName.charAt(0).toUpperCase() : 'W';
  const lastInitial = cleanSurname ? cleanSurname.charAt(0).toUpperCase() : 'K';
  const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4 basamaklı rastgele sayı
  
  return `${firstInitial}${lastInitial}${randomDigits}`;
};
const generateRandomPassword = () => {
  // 8 haneli rastgele harf ve sayı karışımı token
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};
module.exports = { formatMeterNo, generateSubscriptionId, generateWorkerId, generateRandomPassword };