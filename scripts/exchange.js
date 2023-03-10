const currencies = ['USD', 'EUR', 'CNY', 'CHF', 'JPY', 'TRY'];
let ratesListInner = '';
const ratesList = document.querySelector('.rates-list');
const updateDate = document.querySelector('.exchange-aside__last-update');

async function getAndSetCurrencies() {
    const currentDate = new Date()
    const day = currentDate.getDate() > 9 ? currentDate.getDate() : `0${currentDate.getDate()}`
    const month = currentDate.getMonth() > 9 ? currentDate.getDate() + 1: `0${currentDate.getMonth() + 1}`
    const year = currentDate.getFullYear()
    const formattedDate = `${day}.${month}.${year}`
    updateDate.innerHTML = `Update every 15 minutes, MSC ${formattedDate}`

    for(let currency of currencies) {
        const course = await fetch(`https://currency-exchange.p.rapidapi.com/exchange?to=RUB&from=${currency}`, {
            headers: {
                'X-RapidAPI-Key': 'cbea4abd97msh640a68bb4870e2ep143135jsna1b8e410fbe0',
                'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
            }
        })
        .then(res => res.json())
        .then(res => Math.round(res * 100) / 100);
        
        ratesListInner += `
        <li class="rates-list__item">
            <span class="rate-name">${currency}:</span>
            <span class="rate-value">${course}</span>
        </li>`;
    }
    ratesList.innerHTML = ratesListInner;
};

getAndSetCurrencies();
setInterval(async () => {
    getAndSetCurrencies()
}, 900000)