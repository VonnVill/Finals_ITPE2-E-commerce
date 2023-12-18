document.addEventListener("DOMContentLoaded", function () {
    // Retrieve cart items and sold items from local storage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const soldItems = JSON.parse(localStorage.getItem("soldItems")) || [];

    // Get the cart and sold items list containers
    const cartListContainer = document.getElementById("cartList");
    const soldItemListContainer = document.getElementById("soldItemList");

    // Display each cart item
    cartItems.forEach(item => {
      const cartItem = createCartItem(item);
      cartListContainer.appendChild(cartItem);
    });

    // Display each sold item
    soldItems.forEach(item => {
      const soldItem = createSoldItem(item);
      soldItemListContainer.appendChild(soldItem);
    });

    updateTotal();

    function createCartItem(item) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("col-md-4", "mb-4");

      cartItem.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">Quantity: <span class="quantity" data-product="${item.name}">${item.quantity}</span>
              <button class="btn btn-secondary btn-sm" onclick="decreaseQuantity('${item.name}')">-</button>
              <button class="btn btn-secondary btn-sm" onclick="increaseQuantity('${item.name}')">+</button>
            </p>
            <p class="card-text">Cost: ${item.cost * item.quantity}</p>
            <button class="btn btn-danger" onclick="removeFromCart('${item.name}')">Remove</button>
          </div>
        </div>
      `;

      return cartItem;
    }

    function createSoldItem(item) {
      const soldItem = document.createElement("div");
      soldItem.classList.add("col-md-4", "mb-4");

      soldItem.innerHTML = `
        <div class="card bg-light">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">Quantity: ${item.quantity}</p>
            <p class="card-text">Cost: ${item.cost * item.quantity}</p>
          </div>
        </div>
      `;

      return soldItem;
    }

    function updateTotal() {
      const totalElement = document.getElementById("cartTotal");
      const total = cartItems.reduce((acc, item) => acc + item.cost * item.quantity, 0);
      totalElement.textContent = `$${total.toFixed(2)}`;
    }

    window.removeFromCart = function (productName) {
      // Remove the item from the cart
      const updatedCart = cartItems.filter(item => item.name !== productName);

      // Save the updated cart to local storage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Remove the item from the UI
      const cartItemElement = document.querySelector(`.card-title:contains(${productName})`).closest('.col-md-4');
      cartListContainer.removeChild(cartItemElement);

      // Update the total
      updateTotal();
    };

    window.increaseQuantity = function (productName) {
      const quantityElement = document.querySelector(`.quantity[data-product="${productName}"]`);
      const item = cartItems.find(item => item.name === productName);

      // Increase quantity
      item.quantity++;

      // Update UI
      quantityElement.textContent = item.quantity;

      // Update total
      updateTotal();

      // Save the updated cart to local storage
      localStorage.setItem("cart", JSON.stringify(cartItems));
    };

    window.decreaseQuantity = function (productName) {
      const quantityElement = document.querySelector(`.quantity[data-product="${productName}"]`);
      const item = cartItems.find(item => item.name === productName);

      // Decrease quantity, but not below 1
      if (item.quantity > 1) {
        item.quantity--;

        // Update UI
        quantityElement.textContent = item.quantity;

        // Update total
        updateTotal();

        // Save the updated cart to local storage
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }
    };

    window.checkout = function () {
      // Move items from cart to sold items
      soldItems.push(...cartItems);

      // Save the sold items to local storage
      localStorage.setItem("soldItems", JSON.stringify(soldItems));

      // Clear the cart
      localStorage.removeItem("cart");

      // Remove cart items from the UI
      while (cartListContainer.firstChild) {
        cartListContainer.removeChild(cartListContainer.firstChild);
      }

      // Display sold items
      soldItems.forEach(item => {
        const soldItem = createSoldItem(item);
        soldItemListContainer.appendChild(soldItem);
      });

      // Update the total
      updateTotal();

      alert("Checkout successful!");
    };
  });