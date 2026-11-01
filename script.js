
const products = [
    {
        id: 1,
        name: "Headphones",
        price: 999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    },
    {
        id: 3,
        name: "Shoes",
        price: 1999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    },
    {
        id: 4,
        name: "Backpack",
        price: 799,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
    }
];

let cart = [];

const productDiv = document.getElementById("products");
const cartItems = document.getElementById("cartItems");

// Display products
function displayProducts() {
    productDiv.innerHTML = "";

    products.forEach(product => {
        productDiv.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

// Add product to cart
function addToCart(id) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity++;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({...product, quantity: 1});
    }

    updateCart();
}

// Update cart
function updateCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "Your cart is empty!";
    }

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <div>
                    <button onclick="changeQuantity(${item.id}, -1)">−</button>
                    ${item.quantity}
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
                <span>₹${item.price * item.quantity}</span>
            </div>
        `;
    });

    document.getElementById("cartCount").textContent = count;
    document.getElementById("total").textContent = total;
}

// Change quantity
function changeQuantity(id, amount) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    updateCart();
}

// Checkout
document.getElementById("checkoutBtn").addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let summary = "";

    cart.forEach(item => {
        summary += `
            <p>${item.name} × ${item.quantity} = ₹${item.price * item.quantity}</p>
        `;
    });

    document.getElementById("summary").innerHTML = summary;
    document.getElementById("finalTotal").textContent =
        document.getElementById("total").textContent;

    document.getElementById("checkoutModal").style.display = "flex";
});

// Close modal
document.getElementById("closeModal").addEventListener("click", function() {
    document.getElementById("checkoutModal").style.display = "none";
});

// Confirm order
document.getElementById("confirmBtn").addEventListener("click", function() {
    alert("Your order has been confirmed!");

    cart = [];
    updateCart();

    document.getElementById("checkoutModal").style.display = "none";
});

// Initial display
displayProducts();
updateCart();
