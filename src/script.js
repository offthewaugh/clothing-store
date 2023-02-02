"use-strict";
const test = "This is a test";

let clothes = document.getElementById("clothes");
let shirts = document.getElementById("shirts");
let hoodies = document.getElementById("hoodies");
let jeans = document.getElementById("jeans");
let about = document.getElementById("about");

let cart = JSON.parse(localStorage.getItem("data")) || [];

// let generateAbout = () => {
//   return (about.innerHTML = `
//     <footer>
//     <h3>Contact:</h3>
//     <p>Email: chriswaugh.contact@gmail.com</p>
//     <p>Mobile: 513-926-6094</p>
//     <p></p>
//   </footer>
//   `);
// };
let generateItems = () => {
  return (clothes.innerHTML = itemDetails
    .map((x) => {
      let { id, name, price, img, alt, category } = x;
      let search = cart.find((x) => x.id === id) || [];
      return `
          <div  class="container">
          <img
            src="${img}"
            alt="${alt}
          />
          <div id=product-id-${id} class="item-details">
            <h4>${name}</h4>
            <div class="price-quantity">
              <div class="price">
                <p>$ ${price}</p>
              </div>
              <div class="quantity-buttons">
                <i onclick="minusButton(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">
                ${search.item === undefined ? 0 : search.item}
                </div>
                <i onclick="plusButton(${id})" class="bi bi-plus-lg"></i>
              </div>
            </div>
            <!--<button class="cartButton">Add to Cart</button> -->
          </div>
        </div>
  `;
    })
    .join(""));
};

generateItems();
// generateAbout();

let plusButton = (id) => {
  let selectedItem = id;
  let search = cart.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    cart.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(cart));
};

let minusButton = (id) => {
  let selectedItem = id;
  let search = cart.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }

  update(selectedItem.id);
  cart = cart.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(cart));
};

let update = (id) => {
  let search = cart.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartNumber = document.getElementById("cartAmount");
  cartNumber.innerHTML = cart.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
