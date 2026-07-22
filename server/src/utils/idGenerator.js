
const formatMeterNo = (number) => {
    return String(number).padStart(6, '0');
};


const generateSubscriptionId = (number) => {
    return String(number);
};

module.exports = { formatMeterNo, generateSubscriptionId };