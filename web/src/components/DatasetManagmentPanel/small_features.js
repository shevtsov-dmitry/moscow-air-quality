const show_selectors_button = document.querySelector(".show-action-button");
let count_times_clicked = 0; // needed to disable bug when on first click doesn't appear
show_selectors_button.addEventListener("click", () => {
  count_times_clicked++;
  if (count_times_clicked == 1) {
    hide(selectors);
  }
  if (selectors.style.display === "none") {
    show(selectors);
  } else {
    hide(selectors);
  }
  hide(id_form);
});

function hide(value) {
  value.style.display = "none";
}
function show(value) {
  value.style.display = "flex";
}
const selectors = document.querySelector(".selectors");
const id_div = document.querySelector(".choose-list-div");
const form_filled_with_variants = document.querySelector(
  ".form-filled-with-variants",
);

id_div.innerHTML += `<div class="idForm">
            <input class="id-form-text-input" type="text" placeholder="Введите ID">
            <button class="fn-btn">accept</button>
        </div>`;

const id_form = document.querySelector(".idForm");
const fn_btn = document.querySelector(".fn-btn");
const tables = document.querySelector(".tables");
function alignTableLeft() {
  tables.style.justifyContent = "left";
}

fn_btn.addEventListener("click", () => {
  hide(selectors);
});
const btn_everything = document.querySelector(".btn_everything");
const btn_ID = document.querySelector(".btn_ID");
const btn_station_name = document.querySelector(".btn_station_name");
const btn_parameter = document.querySelector(".btn_parameter");

btn_everything.addEventListener("click", () => {
  hide(close_sign);
  hide(form_filled_with_variants);
  hide(id_form);
  hide(selectors);

  alignTableLeft();
});
btn_ID.addEventListener("click", () => {
  hide(close_sign);
  hide(selectors);

  show(id_form);

  alignTableLeft();
});
btn_station_name.addEventListener("click", () => {
  hide(id_form);

  show(close_sign);
  show(form_filled_with_variants);

  alignTableLeft();
});
btn_parameter.addEventListener("click", () => {
  hide(id_form);

  show(close_sign);
  show(form_filled_with_variants);

  alignTableLeft();
});

const submit_btn = document.querySelector(".submitUploadBtn");
const loading_gif = document.querySelector(".loading-gif");

submit_btn.addEventListener("click", () => {
  loading_gif.style.display = "initial";
});

const close_sign = document.querySelector(".close-sign");
close_sign.addEventListener("click", () => {
  setTimeout(() => {
    hide(close_sign);
    hide(form_filled_with_variants);
    form_filled_with_variants.innerHTML = "";
  }, 200);
});
