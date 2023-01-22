"use-strict";

let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let cart = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartNumber = document.getElementById("cartAmount");
  cartNumber.innerHTML = cart.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let cartItems = () => {
  if (cart.length !== 0) {
    return (shoppingCart.innerHTML = cart
      .map((x) => {
        let { id, item } = x;
        let search = itemDetails.find((y) => y.id === id) || [];
        let { img, name, price, alt } = search;
        return `
        
      <div class="cart-item">
        <img width="100" src=${img} alt=${alt} />
          <div class="details">
            <div class="name-price-x">
            <i onclick="removeCartButton(${id})" class="bi bi-x-square-fill"></i>
              <h4 class="name-price"><p>${name}</p></h4>
              <h4 class="name-price"><p>$ ${price}</p><h4>
              </div>
            <div class="cart-buttons">
            <div class="quantity-buttons">
                <i onclick="minusButton(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}
                </div>
                <i onclick="plusButton(${id})" class="bi bi-plus-lg"></i>
              </div>
              <h3>$ ${Math.round(item * price)}</h3>
            </div>
          </div>
      </div>
  
      `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to Home</button>
      </a>
    `;
  }
};

// let hoodieCartItems = () => {
//   if (cart.length !== 0) {
//     return (shoppingCart.innerHTML = cart
//       .map((x) => {
//         let { id, item } = x;
//         let search = hoodieDetails.find((y) => y.id === id) || [];
//         return `

//       <div class="cart-item">
//         <img width="100" src=${search.img} alt=${search.alt} />
//           <div class="details">
//             <div class="name-price-x">
//               <h4 class="name-price"><p>${search.name}</p></h4>
//               <h4 class="name-price"><p>$ ${search.price}</p><h4>
//               <i class="bi bi-x-square-fill"></i>
//               </div>
//             <div class="cart-buttons">
//             <div class="quantity-buttons">
//                 <i onclick="minusButton(${id})" class="bi bi-dash-lg"></i>
//                 <div id=${id} class="quantity">${item}
//                 </div>
//                 <i onclick="plusButton(${id})" class="bi bi-plus-lg"></i>
//               </div>
//               <h3>$ ${Math.round(item * search.price)}</h3>
//             </div>
//           </div>
//       </div>

//       `;
//       })
//       .join(""));
//   } else {
//     shoppingCart.innerHTML = ``;
//     label.innerHTML = `
//     <h2>Cart is Empty</h2>
//     <a href="index.html">
//       <button class="HomeBtn">Back to Home</button>
//       </a>
//     `;
//   }
// };

cartItems();

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
  cartItems();
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
  cartItems();
  // || hoodieCartItems() || jeansCartItems();
  localStorage.setItem("data", JSON.stringify(cart));
};

let update = (id) => {
  let search = cart.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  total();
};
let removeCartButton = (id) => {
  let selectedItem = id;
  cart = cart.filter((x) => x.id !== selectedItem.id);
  cartItems();
  total();
  calculation();
  localStorage.setItem("data", JSON.stringify(cart));
};

let clearCart = () => {
  cart = [];
  cartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(cart));
};

let total = () => {
  if (cart.length !== 0) {
    let amount = cart
      .map((x) => {
        let { item, id } = x;
        let search = itemDetails.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);

    label.innerHTML = `
    <h2>Total: $ ${Math.round(amount)} </h2>
    <button onclick="checkout()" class="buttonCheckout">Checkout</button>
    <button onclick="clearCart()" class="buttonClearCart">Clear Cart</button>`;
  } else return;
};

let checkout = () => {
  total();
  shoppingCart.innerHTML = ``;
  label.innerHTML = `<h2>Thanks for shopping with us, Please come again!<h2>
  <a href="index.html">
  <button class="HomeBtn">Back to Home</button>
  </a>
  `;
  cart = [];
  calculation();
  localStorage.setItem("data", JSON.stringify(cart));
};
total();
