const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg =document.querySelector(".msg");

for (let select of dropdowns) {
    for (let curr_code in countryList) {
        let newOption = document.createElement("option");
        newOption.value = curr_code;
        newOption.innerText = curr_code;
        if (select.name == "from" && curr_code == "USD") {
            newOption.selected = "selected";
        } else if (select.name == "to" && curr_code == "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let curr_code = element.value;
    let countrycode = countryList[curr_code];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amntVal = amount.value;
    if (amntVal === "" || amntVal < 1) {
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    
    let Final_amnt = rate * amntVal;
    msg.innerText = `${amntVal} ${fromCurr.value} = ${Final_amnt} ${toCurr.value}`;
});
