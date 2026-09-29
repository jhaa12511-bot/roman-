// ==========================================
// NAMAN ENTERPRISES - MOBILE SHOP
// ==========================================


// PRODUCTS DATABASE

const products = [

    {
        id: 1,
        name: "iPhone 17 Pro Max",
        brand: "Apple",
        price: 149999,
        oldPrice: 159999,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1592286927505-2fd7c9c7b5a8?w=500",
        ram: "12GB",
        storage: "256GB",
        camera: "48MP",
        battery: "4685mAh",
        processor: "A19 Pro",
        display: "6.9 inch OLED"
    },

    {
        id: 2,
        name: "Galaxy S25 Ultra",
        brand: "Samsung",
        price: 129999,
        oldPrice: 139999,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
        ram: "12GB",
        storage: "256GB",
        camera: "200MP",
        battery: "5000mAh",
        processor: "Snapdragon",
        display: "6.9 inch AMOLED"
    },

    {
        id: 3,
        name: "OnePlus 13",
        brand: "OnePlus",
        price: 69999,
        oldPrice: 74999,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
        ram: "16GB",
        storage: "512GB",
        camera: "50MP",
        battery: "6000mAh",
        processor: "Snapdragon 8 Elite",
        display: "6.82 inch AMOLED"
    },

    {
        id: 4,
        name: "Google Pixel 9 Pro",
        brand: "Google",
        price: 99999,
        oldPrice: 109999,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
        ram: "16GB",
        storage: "256GB",
        camera: "50MP",
        battery: "4700mAh",
        processor: "Tensor G4",
        display: "6.3 inch OLED"
    },

    {
        id: 5,
        name: "Xiaomi 15 Ultra",
        brand: "Xiaomi",
        price: 89999,
        oldPrice: 94999,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
        ram: "16GB",
        storage: "512GB",
        camera: "200MP",
        battery: "5410mAh",
        processor: "Snapdragon 8 Elite",
        display: "6.73 inch AMOLED"
    },

    {
        id: 6,
        name: "Vivo X200 Pro",
        brand: "Vivo",
        price: 79999,
        oldPrice: 84999,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
        ram: "16GB",
        storage: "512GB",
        camera: "200MP",
        battery: "6000mAh",
        processor: "Dimensity 9400",
        display: "6.78 inch AMOLED"
    },

    {
        id: 7,
        name: "iPhone 16 Pro",
        brand: "Apple",
        price: 119999,
        oldPrice: 129999,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1592286927505-2fd7c9c7b5a8?w=500",
        ram: "8GB",
        storage: "256GB",
        camera: "48MP",
        battery: "3582mAh",
        processor: "A18 Pro",
        display: "6.3 inch OLED"
    },

    {
        id: 8,
        name: "OnePlus 13R",
        brand: "OnePlus",
        price: 42999,
        oldPrice: 46999,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500",
        ram: "12GB",
        storage: "256GB",
        camera: "50MP",
        battery: "6000mAh",
        processor: "Snapdragon 8 Gen 3",
        display: "6.78 inch AMOLED"
    }

];


// CART

let cart = JSON.parse(localStorage.getItem("namanCart")) || [];


// WISHLIST

let wishlist = JSON.parse(localStorage.getItem("namanWishlist")) || [];


// PRODUCT GRID

const productGrid = document.getElementById("productGrid");


function displayProducts(list) {

    productGrid.innerHTML = "";

    if (list.length === 0) {

        productGrid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:50px">
                <h2>No products found 😔</h2>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }


    list.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <span class="brand">${product.brand}</span>

            <h3>${product.name}</h3>


            <div class="rating">
                ⭐ ${product.rating}
            </div>


            <div class="specs">

                <span>${product.ram} RAM</span>

                <span>${product.storage}</span>

                <span>${product.camera}</span>

                <span>${product.battery}</span>

            </div>


            <div class="price">

                ₹${product.price.toLocaleString("en-IN")}

                <span class="old-price">
                    ₹${product.oldPrice.toLocaleString("en-IN")}
                </span>

            </div>


            <div class="product-buttons">

                <button onclick="viewProduct(${product.id})">
                    View
                </button>

                <button onclick="addToWishlist(${product.id})">
                    ❤️
                </button>

                <button onclick="addToCart(${product.id})">
                    🛒
                </button>

                <button
                    class="buy"
                    onclick="buyNow(${product.id})"
                >
                    Buy
                </button>

            </div>

        `;

        productGrid.appendChild(card);

    });

}


displayProducts(products);


// SEARCH

document
    .getElementById("searchInput")
    .addEventListener("input", filterProducts);


// BRAND

document
    .getElementById("brandFilter")
    .addEventListener("change", filterProducts);


// PRICE

document
    .getElementById("priceFilter")
    .addEventListener("change", filterProducts);



function filterProducts() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const brand =
        document
            .getElementById("brandFilter")
            .value;


    const price =
        document
            .getElementById("priceFilter")
            .value;


    let filtered = products.filter(product => {

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(search) ||
            product.brand
                .toLowerCase()
                .includes(search);


        const matchesBrand =
            brand === "all" ||
            product.brand === brand;


        const matchesPrice =
            price === "all" ||
            product.price <= Number(price);


        return matchesSearch &&
               matchesBrand &&
               matchesPrice;

    });


    displayProducts(filtered);

}



// ADD CART

function addToCart(id) {

    const product =
        products.find(p => p.id === id);


    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    saveCart();

    updateCart();


    alert(`${product.name} added to cart 🛒`);

}



// SAVE CART

function saveCart() {

    localStorage.setItem(
        "namanCart",
        JSON.stringify(cart)
    );

}



// UPDATE CART

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");


    const cartCount =
        document.getElementById("cartCount");


    const cartTotal =
        document.getElementById("cartTotal");


    cartItems.innerHTML = "";


    let total = 0;

    let quantity = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;

        quantity += item.quantity;


        const div =
            document.createElement("div");


        div.className = "cart-item";


        div.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                </p>


                <div class="qty">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                    <button
                        class="remove"
                        onclick="removeFromCart(${item.id})"
                    >
                        ×
                    </button>

                </div>

            </div>

        `;


        cartItems.appendChild(div);

    });


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div style="text-align:center;padding:50px 10px">
                <div style="font-size:50px">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some smartphones.</p>
            </div>
        `;

    }


    cartCount.textContent = quantity;

    cartTotal.textContent =
        "₹" + total.toLocaleString("en-IN");

}


updateCart();



// CHANGE QUANTITY

function changeQuantity(id, change) {

    const item =
        cart.find(product => product.id === id);


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(product => product.id !== id);

    }


    saveCart();

    updateCart();

}



// REMOVE

function removeFromCart(id) {

    cart =
        cart.filter(product => product.id !== id);


    saveCart();

    updateCart();

}



// OPEN CART

document
    .getElementById("cartBtn")
    .addEventListener("click", () => {

        document
            .getElementById("cartSidebar")
            .classList.add("active");

    });



function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("active");

}



// PRODUCT DETAILS

function viewProduct(id) {

    const product =
        products.find(p => p.id === id);


    const modal =
        document.getElementById("productModal");


    document.getElementById("modalProduct").innerHTML = `

        <div style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:30px;
            align-items:center;
        ">

            <div class="product-image">

                <img
                    src="${product.image}"
                    style="max-width:90%;max-height:300px"
                >

            </div>


            <div>

                <span class="brand">
                    ${product.brand}
                </span>

                <h1>${product.name}</h1>

                <div class="rating">
                    ⭐ ${product.rating} / 5
                </div>

                <h2 style="margin:15px 0;color:#00eaff">
                    ₹${product.price.toLocaleString("en-IN")}
                </h2>


                <p>
                    Experience powerful performance,
                    premium design and advanced technology.
                </p>


                <div class="specs" style="margin-top:20px">

                    <span>RAM: ${product.ram}</span>

                    <span>Storage: ${product.storage}</span>

                    <span>Camera: ${product.camera}</span>

                    <span>Battery: ${product.battery}</span>

                    <span>Processor: ${product.processor}</span>

                    <span>Display: ${product.display}</span>

                </div>


                <button
                    class="checkout-btn"
                    onclick="addToCart(${product.id});closeModal()"
                >
                    Add To Cart
                </button>

            </div>

        </div>

    `;


    modal.classList.add("active");

}



function closeModal() {

    document
        .getElementById("productModal")
        .classList.remove("active");

}



// BUY NOW

function buyNow(id) {

    const existing =
        cart.find(item => item.id === id);


    if (!existing) {

        const product =
            products.find(p => p.id === id);


        cart.push({
            ...product,
            quantity: 1
        });

        saveCart();

        updateCart();

    }


    checkout();

}



// CHECKOUT

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    closeCart();


    document
        .getElementById("checkoutModal")
        .classList.add("active");

}



function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .classList.remove("active");

}



// PLACE ORDER

document
    .getElementById("checkoutForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();


        const orderId =
            "NE" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        alert(
            `🎉 Order Placed Successfully!\n\nOrder ID: ${orderId}\n\nThank you for shopping with Naman Enterprises.`
        );


        cart = [];

        saveCart();

        updateCart();

        closeCheckout();

        this.reset();

    });



// WISHLIST

function addToWishlist(id) {

    const product =
        products.find(p => p.id === id);


    const exists =
        wishlist.find(item => item.id === id);


    if (exists) {

        wishlist =
            wishlist.filter(item => item.id !== id);

        alert("Removed from wishlist ❤️");

    } else {

        wishlist.push(product);

        alert("Added to wishlist ❤️");

    }


    localStorage.setItem(
        "namanWishlist",
        JSON.stringify(wishlist)
    );


    document.getElementById("wishCount")
        .textContent = wishlist.length;

}


document.getElementById("wishCount")
    .textContent = wishlist.length;



// THEME

document
    .getElementById("themeBtn")
    .addEventListener("click", () => {

        document.body.classList.toggle("light");


        const light =
            document.body.classList.contains("light");


        document.getElementById("themeBtn")
            .textContent = light ? "☀️" : "🌙";

    });



// OFFERS

function showOffers() {

    alert(
        "🔥 SPECIAL OFFERS 🔥\n\n" +
        "• Selected smartphones up to ₹10,000 OFF\n" +
        "• Free delivery on selected products\n" +
        "• Easy EMI options\n" +
        "• Exchange offers available\n\n" +
        "Visit Naman Enterprises for details."
    );

}