export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init() {
    this.render();
  }

  render() {
    let input_currency = document.querySelectorAll(".money-input");

    let left_currency_value = document.querySelector(
      "input[name='radio1']:checked"
    ).value;

    let right_currency_value = document.querySelector(
      "input[name='radio2']:checked"
    ).value;

    let resultOfData = null;

    async function getDataFromApi(from, to) {
      let url = `https://api.exchangerate.host/convert?from=${from}&to=${to}`;

      const res = await fetch(url);
      const data = await res.json();

      resultOfData = data.result;
    }

    getDataFromApi(left_currency_value, right_currency_value);

    function convertValue(leftCurrency, rightCurrency) {
      rightCurrency.value = leftCurrency.value * resultOfData;

      const rateFrom = document.getElementById("rateFrom");
      rateFrom.innerText = `1 ${left_currency_value} = ${resultOfData.toFixed()} ${right_currency_value}`;

      const rateIn = document.getElementById("rateIn");
      rateIn.innerText = `1 ${right_currency_value} =  ${(
        1 / resultOfData
      ).toFixed(6)} ${left_currency_value}`;
    }

    this.model.radio1.forEach((el) => {
      el.addEventListener("click", async () => {
        left_currency_value = document.querySelector(
          "input[name='radio1']:checked"
        ).value;

        await getDataFromApi(left_currency_value, right_currency_value);
        convertValue(input_currency[0], input_currency[1]);

        const rateFrom = document.getElementById("rateFrom");
        rateFrom.innerText = `1 ${left_currency_value} = ${resultOfData.toFixed(
          6
        )} ${right_currency_value}`;

        const rateIn = document.getElementById("rateIn");
        rateIn.innerText = `1 ${right_currency_value} =  ${(
          1 / resultOfData
        ).toFixed(6)} ${left_currency_value}`;
      });
    });

    this.model.radio2.forEach((el) => {
      el.addEventListener("click", async () => {
        right_currency_value = document.querySelector(
          "input[name='radio2']:checked"
        ).value;
        await getDataFromApi(left_currency_value, right_currency_value);
        convertValue(input_currency[0], input_currency[1]);

        const rateFrom = document.getElementById("rateFrom");
        rateFrom.innerText = `1 ${left_currency_value} = ${resultOfData.toFixed(
          6
        )} ${right_currency_value}`;

        const rateIn = document.getElementById("rateIn");
        rateIn.innerText = `1 ${right_currency_value} =  ${(
          1 / resultOfData
        ).toFixed(6)} ${left_currency_value}`;
      });
    });

    input_currency[0].addEventListener("keyup", () => {
      convertValue(input_currency[0], input_currency[1]);

      const rateFrom = document.getElementById("rateFrom");
      rateFrom.innerText = `1 ${left_currency_value} = ${resultOfData.toFixed(
        6
      )} ${right_currency_value}`;

      const rateIn = document.getElementById("rateIn");
      rateIn.innerText = `1 ${right_currency_value} =  ${(
        1 / resultOfData
      ).toFixed(6)} ${left_currency_value}`;
    });

    input_currency[1].addEventListener("keyup", () => {
      convertValue(input_currency[1], input_currency[0]);

      const rateFrom = document.getElementById("rateFrom");
      rateFrom.innerText = `1 ${left_currency_value} = ${resultOfData.toFixed(
        6
      )} ${right_currency_value}`;

      const rateIn = document.getElementById("rateIn");
      rateIn.innerText = `1 ${right_currency_value} =  ${(
        1 / resultOfData
      ).toFixed(6)} ${left_currency_value}`;
    });
  }
}
