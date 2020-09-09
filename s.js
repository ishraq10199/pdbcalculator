let kwh = "";

button = document.getElementById("submit");

button.addEventListener("click", () => {
  kwh = document.getElementById("units").value;
  console.log(kwh);
  calculate(kwh);
});

document.getElementById("myform").addEventListener("submit", (event) => {
  event.preventDefault();
  kwh = document.getElementById("units").value;
  console.log(kwh);
  calculate(kwh);
});

function calculate(kwh) {
  bigger_than = 0;

  rates = {
    0: 4.19,
    75: 5.72,
    200: 6.0,
    300: 6.34,
    400: 9.94,
    600: 11.46,
  };

  demand_charge = 240;

  vat = 0.0501;

  price = 0;

  if (kwh > 600) {
    bigger_than = 600;
    price = price + (kwh - 600) * rates["600"];
  }

  if (kwh > 400) {
    if (bigger_than == 600) {
      price = price + 200 * rates["400"];
    } else {
      bigger_than = 400;
      price = price + (kwh - 400) * rates["400"];
    }
  }
  if (kwh > 300) {
    if (bigger_than >= 400) {
      price = price + 100 * rates["300"];
    } else {
      bigger_than = 300;
      price = price + (kwh - 300) * rates["300"];
    }
  }
  if (kwh > 200) {
    if (bigger_than >= 300) {
      price = price + 100 * rates["200"];
    } else {
      bigger_than = 200;
      price = price + (kwh - 200) * rates["200"];
    }
  }
  if (kwh > 75) {
    if (bigger_than >= 200) {
      price = price + 125 * rates["75"];
    } else {
      bigger_than = 75;
      price = price + (kwh - 75) * rates["75"];
    }
  }
  if (kwh > 0) {
    if (bigger_than >= 75) {
      price = price + 75 * rates["0"];
    } else {
      price = price + kwh * rates["0"];
    }
  }

  document.getElementById("output_1").innerHTML =
    "Your monthly KWh charge is: BDT " + parseFloat(price).toFixed(2);
  document.getElementById("output_2").innerHTML =
    "Demand charge: BDT " + parseFloat(demand_charge).toFixed(2);
  document.getElementById("output_3").innerHTML =
    "VAT: BDT " + parseFloat((price + demand_charge) * vat).toFixed(2);
  document.getElementById("output_4").innerHTML =
    "Your payable dues: <b>BDT " +
    parseFloat(price + demand_charge + (price + demand_charge) * vat).toFixed(
      2
    ) +
    "</BDT>";
}
