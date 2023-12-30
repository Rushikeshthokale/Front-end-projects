const fromAmountElement = document.querySelector(".amount");
const convertedAmountElement = document.querySelector(".convertedAmount");
const fromCurrencyElement = document.querySelector(".fromCurrency");
const toCurrencyElement = document.querySelector(".toCurrency");
const resultElement = document.querySelector(".result");
const converterContainer = document.querySelector(".convertor-container");

//Array for countries
const countries = [
  {
    code: "USD",
    name: "United States Dollar",
  },
  {
    code: "INR",
    name: "Indian Rupee",
  },
  {
    code: "AED",
    name: "United Arab Emirates",
  },
  {
    code: "AFN",
    name: "Afghanistan",
  },
  {
    code: "ALL",
    name: "Albania",
  },
  {
    code: "AMD",
    name: "Armenia",
  },
  {
    code: "ANG",
    name: "Netherlands Antilles",
  },
  {
    code: "AOA",
    name: "Angola",
  },
  {
    code: "ARS",
    name: "Argentina",
  },
  {
    code: "AUD",
    name: "Australia",
  },
  {
    code: "AWG",
    name: "Aruba",
  },
  {
    code: "AZN",
    name: "	Azerbaijan",
  },
  {
    code: "BAM",
    name: "	Bosnia and Herzegovina",
  },
  {
    code: "BRL",
    name: "Brazil",
  },
  {
    code: "CAD",
    name: "Canada",
  },
  {
    code: "CNY",
    name: "China",
  },
  {
    code: "LKR",
    name: "Sri Lanka",
  },
  {
    code: "LKR",
    name: "Sri Lanka",
  },
  {
    code: "ZAR",
    name: "South Africa",
  },
];

//Showing countries from array to select tag
countries.forEach(country => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  option1.value = option2.value = country.code;
  option1.textContent = option2.textContent = `${country.code} (${country.name})`;
  fromCurrencyElement.appendChild(option1);
  toCurrencyElement.appendChild(option2);
  //Setting default values of select tag
  fromCurrencyElement.value = "USD";
  toCurrencyElement.value = "INR";
});

const getExchangeRate = async () => {
  const amount = parseFloat(fromAmountElement.value);
  const fromCurrency = fromCurrencyElement.value;
  const toCurrency = toCurrencyElement.value;
  resultElement.textContent = "Fetching Exchange Rates....";
  try {
    //Fetch data from API
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    const conversionRate = data.rates[toCurrency];
    const convertedAmount = (amount * conversionRate).toFixed(2);
    if (typeof conversionRate === "undefined") {
      resultElement.textContent = "Exchange rate data is not available for selected countries!!!";
      convertedAmountElement = "";
    } else {
      convertedAmountElement.value = convertedAmount;
      resultElement.textContent = `${amount}${fromCurrency} =${convertedAmount}${toCurrency}`;
    }
  } catch (error) {
    converterContainer.innerHTML = `<h2>Error while Fetching exchange rates !!</h2>`;
  }
};
//Fetching exchange rate when user inputs the amount
fromAmountElement.addEventListener("input", getExchangeRate);
//Fetching exchange rate when user chage currency
fromCurrencyElement.addEventListener("change", getExchangeRate);
toCurrencyElement.addEventListener("change", getExchangeRate);
window.addEventListener("load", getExchangeRate);
