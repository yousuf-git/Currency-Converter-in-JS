const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
// for (let currencyCode in countryList) {
//   console.log(`${currencyCode}: ${countryList[currencyCode]}`); // currency code country code
// }
let fromCurrCode = document.querySelector(".from select");
let toCurrCode = document.querySelector(".to select");
const msg = document.querySelector(".msg")

let selectDropDowns = document.querySelectorAll(".dropdown select");
for (let select of selectDropDowns) {
  for (let currencyCode in countryList) {
    let option = document.createElement("option");
    option.innerText = currencyCode;
    option.value = currencyCode;
    select.append(option);
    if (select.id === "select-from" && currencyCode === "USD") {
      option.selected = "selected";
    }
    if (select.id === "select-to" && currencyCode === "PKR") {
      option.selected = "selected";
    }
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  //   console.log(element);
  //   console.log(element.value) // currency code
  countryCode = countryList[element.value];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

const btn = document.querySelector("form button");
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amountTf = document.querySelector("input");
  let amountVal = amountTf.value;
  if (amountVal == 0 || amountVal < 0) {
    alert("Enter Valid Amount");
    amountTf.value = 0.0;
  } else {
    // console.log(amountVal)
    // console.log(fromCurrCode.value);
    rateLink = `${BASE_URL}/${fromCurrCode.value.toLowerCase()}.json`
    let response = await fetch(rateLink);
    // console.log(response)
    let data = await response.json()
    console.log("Data" + data)
    rate = data[fromCurrCode.value.toLowerCase()][toCurrCode.value.toLowerCase()]
    console.log("Rate: " + rate)
    msg.innerText = `${amountVal} ${fromCurrCode.value} = ${amountVal * rate} ${toCurrCode.value}`
  }
});
