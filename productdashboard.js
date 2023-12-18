document.addEventListener("DOMContentLoaded", function () {
  // Retrieve products from local storage
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // Get the product list container
  const productListContainer = document.getElementById("productList");

  // Display each product as a card
  products.forEach(product => {
    const productCard = createProductCard(product);
    productListContainer.appendChild(productCard);
  });

  // Shopping Cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to render the cart
  function renderCart() {
    // You can display the cart items wherever you want in your HTML
    console.log("Cart Items:", cart);
  }

  // Function to add a product to the cart
  window.addToCart = function (productId) {
    const selectedProduct = products.find(product => product.id === productId);

    if (selectedProduct) {
      cart.push(selectedProduct);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      alert(`${selectedProduct.name} added to the cart.`);
    }
  };

   // Function to toggle the on-sale status of a product
   window.toggleOnSale = function (index) {
    products[index].isOnSale = !products[index].isOnSale;

    // Update the product card in the UI
    const updatedCard = createProductCard(products[index]);
    productListContainer.replaceChild(updatedCard, productListContainer.children[index]);

    // Save the updated products to local storage
    localStorage.setItem("products", JSON.stringify(products));
  }

  function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");

    card.innerHTML = `
      <div class="card">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text">Cost: ${product.cost}</p>
          ${product.isOnSale ? '<p class="text-success">On Sale!</p>' : ''}
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#updateProductModal" onclick="openUpdateModal(${products.indexOf(product)})">Update</button>
          <button type="button" class="btn btn-danger" onclick="deleteProduct(${products.indexOf(product)})">Delete</button>
          <button type="button" class="btn btn-warning" onclick="toggleOnSale(${products.indexOf(product)})">Toggle On Sale</button>
        </div>
      </div>
    `;

    return card;
  }
  
  // Function to put a product on sale
  window.putOnSale = function (index) {
    // You can implement the logic to put the product on sale here
    alert(`Product "${products[index].name}" is now on sale!`);
    // For example, you might want to update a "sale" property in your product object
    products[index].isOnSale = true;
  
    // Update the product card in the UI
    const updatedCard = createProductCard(products[index]);
    productListContainer.replaceChild(updatedCard, productListContainer.children[index]);
  
    // Save the updated products to local storage
    localStorage.setItem("products", JSON.stringify(products));
  };

  // Update Product Modal
  const updateProductForm = document.getElementById("updateProductForm");
  updateProductForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get updated product details
    const updatedProductName = document.getElementById("updateProductName").value;
    const updatedProductDescription = document.getElementById("updateProductDescription").value;
    const updatedProductCost = document.getElementById("updateProductCost").value;

    // Update the product in the local storage
    const selectedIndex = updateProductForm.dataset.selectedIndex;
    products[selectedIndex].name = updatedProductName;
    products[selectedIndex].description = updatedProductDescription;
    products[selectedIndex].cost = updatedProductCost;

    // Update the product card in the UI
    const updatedCard = createProductCard(products[selectedIndex]);
    productListContainer.replaceChild(updatedCard, productListContainer.children[selectedIndex]);

    // Save the updated products to local storage
    localStorage.setItem("products", JSON.stringify(products));

    // Close the modal
    $('#updateProductModal').modal('hide');
  });

  window.openUpdateModal = function (index) {
    // Populate the form with the selected product details
    document.getElementById("updateProductName").value = products[index].name;
    document.getElementById("updateProductDescription").value = products[index].description;
    document.getElementById("updateProductCost").value = products[index].cost;

    // Set the selected index as a data attribute
    updateProductForm.dataset.selectedIndex = index;
  };

  // Delete Product
  window.deleteProduct = function (index) {
    // Remove the product from the local storage
    products.splice(index, 1);

    // Remove the product card from the UI
    productListContainer.removeChild(productListContainer.children[index]);

    // Save the updated products to local storage
    localStorage.setItem("products", JSON.stringify(products));
  };
});
