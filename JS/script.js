// JavaScript code for adding items to the cart and handling place order

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


