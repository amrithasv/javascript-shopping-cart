// JavaScript code for adding items to the cart from the home page

// Get the plus buttons
const plusButtons = document.querySelectorAll('.right span:first-child');

// Get the cart count element
const cartCountElement = document.getElementById('lblCartCount');

// Add event listeners to plus buttons
plusButtons.forEach((button) => {
  button.addEventListener('click', addToCart);
});

// Add to cart function
function addToCart() {
  const card = this.parentNode.parentNode;
  const itemName = card.querySelector('h2').textContent;
  const itemPrice = card.querySelector('span').textContent;

  // Create a new cart item object
  const cartItem = {
    name: itemName,
    price: itemPrice
  };

  // Check if item is already in the cart
  const existingCartItem = findCartItemByName(itemName);
  if (existingCartItem) {
    alert('Item already added to cart.');
    return;
  }

  // Add item to the cart
  addItemToCart(cartItem);

  // Update the cart count
  updateCartCount(1);
}

// Find cart item by name
function findCartItemByName(name) {
  const cartItems = getCartItems();
  return cartItems.find((item) => item.name === name);
}

// Add item to the cart
function addItemToCart(item) {
  const cartItems = getCartItems();
  cartItems.push(item);
  saveCartItems(cartItems);
}

// Get cart items from local storage
function getCartItems() {
  const cartItemsJson = localStorage.getItem('cartItems');
  return cartItemsJson ? JSON.parse(cartItemsJson) : [];
}

// Save cart items to local storage
function saveCartItems(cartItems) {
  const cartItemsJson = JSON.stringify(cartItems);
  localStorage.setItem('cartItems', cartItemsJson);
}

// Update cart count function
function updateCartCount(change) {
  const currentCount = parseInt(cartCountElement.textContent);
  const newCount = currentCount + change;
  cartCountElement.textContent = newCount;
}

// JavaScript code for the cart page

// Get the cart items container
const cartItemsContainer = document.querySelector('.cart-container tbody');

// Get the cart summary container
const cartSummaryContainer = document.querySelector('.cart-summary');

// Load cart items when the cart page loads
window.addEventListener('DOMContentLoaded', loadCartItems);

// Load cart items function
function loadCartItems() {
  const cartItems = getCartItems();

  if (cartItems.length > 0) {
    cartItems.forEach((item) => {
      createCartItemElement(item);
    });
  }

  // Calculate and display the cart summary
  calculateCartSummary();
}

// ...

// Create cart item element
function createCartItemElement(item) {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${item.name}</td>
    <td>${item.price}</td>
    <td>
      <div class="quantity-container">
        <button class="decrease-btn">-</button>
        <input type="number" class="quantity-input" value="${item.quantity}" min="1">
        <button class="increase-btn">+</button>
      </div>
    </td>
    <td>₹${(item.price * item.quantity).toFixed(2)}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;

  // Append the new row to the cart items container
  cartItemsContainer.appendChild(newRow);

  // Add event listeners to the buttons and quantity input
  const increaseButton = newRow.querySelector('.increase-btn');
  increaseButton.addEventListener('click', () => increaseQuantity(item.name));

  const decreaseButton = newRow.querySelector('.decrease-btn');
  decreaseButton.addEventListener('click', () => decreaseQuantity(item.name));

  const deleteButton = newRow.querySelector('.delete-btn');
  deleteButton.addEventListener('click', () => removeFromCart(item.name));

  const quantityInput = newRow.querySelector('.quantity-input');
  quantityInput.addEventListener('change', (event) => updateQuantity(item.name, event.target.value));
}

// ...

// Remove item from cart function
function removeFromCart(name) {
  const cartItems = getCartItems();
  const updatedCartItems = cartItems.filter((item) => item.name !== name);
  saveCartItems(updatedCartItems);

  // Reload the cart items after updating the cart
  loadCartItems();
}

// Increase quantity function
function increaseQuantity(name) {
  const cartItems = getCartItems();
  const updatedCartItems = cartItems.map((item) => {
    if (item.name === name) {
      item.quantity++;
    }
    return item;
  });
  saveCartItems(updatedCartItems);

  // Reload the cart items after updating the quantity
  loadCartItems();
}

// Decrease quantity function
function decreaseQuantity(name) {
  const cartItems = getCartItems();
  const updatedCartItems = cartItems.map((item) => {
    if (item.name === name && item.quantity > 1) {
      item.quantity--;
    }
    return item;
  });
  saveCartItems(updatedCartItems);

  // Reload the cart items after updating the quantity
  loadCartItems();
}

// Update quantity function
function updateQuantity(name, newQuantity) {
  const cartItems = getCartItems();
  const updatedCartItems = cartItems.map((item) => {
    if (item.name === name) {
      item.quantity = parseInt(newQuantity, 10);
    }
    return item;
  });
  saveCartItems(updatedCartItems);

  // Reload the cart items after updating the quantity
  loadCartItems();
}

// ...


// Calculate and display the cart summary
function calculateCartSummary() {
  const cartItems = getCartItems();
  let totalPrice = 0;

  cartItems.forEach((item) => {
    const price = parseFloat(item.price.substring(1));
    totalPrice += price * item.quantity;
  });

  const cartSummary = `
    <h3>Cart Summary</h3>
    <div class="summary-row">
      <span>Total Items:</span>
      <span>${cartItems.length}</span>
    </div>
    <div class="summary-row">
      <span>Total Price:</span>
      <span>₹${totalPrice.toFixed(2)}</span>
    </div>
    <button id="placeOrderBtn" class="checkout-btn">Place Order</button>
  `;

  cartSummaryContainer.innerHTML = cartSummary;
// Add event listener to the place order button
const placeOrderButton = cartSummaryContainer.querySelector('#placeOrderBtn');
placeOrderButton.addEventListener('click', () => {
  placeOrder();
  showOrderMessage();
});
}

// Show order message
function showOrderMessage() {
const orderMessage = document.getElementById('orderMessage');
orderMessage.style.display = 'block';
}