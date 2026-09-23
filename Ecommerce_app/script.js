let search = document.getElementById("search");
let category = document.getElementById("category");
let sort = document.getElementById("sort");
let productList = document.getElementById("productList");

let previous = document.getElementById("previous");
let next = document.getElementById("next");
let pageNumber = document.getElementById("pageNumber");

let cartButton = document.getElementById("cartButton");
let cartCount = document.getElementById("cartCount");
let cartSection = document.getElementById("cartSection");
let cartList = document.getElementById("cartList");

let wishlistButton = document.getElementById("wishlistButton");
let wishlistCount = document.getElementById("wishlistCount");

let checkoutForm = document.getElementById("checkoutForm");

let productModal = document.getElementById("productModal");
let closeModal = document.getElementById("closeModal");
let modalImage = document.getElementById("modalImage");
let modalTitle = document.getElementById("modalTitle");
let modalCategory = document.getElementById("modalCategory");
let modalPrice = document.getElementById("modalPrice");
let modalRating = document.getElementById("modalRating");
let modalDescription = document.getElementById("modalDescription");


let currentPage = 1;
let productsPerPage = 4;

let products = [];
let filteredProducts = [];


let cart = JSON.parse(localStorage.getItem("cart")) || [];
cartCount.textContent = cart.length;

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
wishlistCount.textContent = wishlist.length;


async function getProducts() {

    let response = await fetch("https://dummyjson.com/products?limit=12");

    let data = await response.json();

    products = data.products;

    filteredProducts = products;

    displayCategories();
    displayProducts(filteredProducts);
}


//display category

function displayCategories() {

    let categories = new Set();

    products.forEach(function(product) {

        categories.add(product.category);

    });

    categories.forEach(function(categoryName) {

        let option = document.createElement("option");

        option.textContent = categoryName;
        option.value = categoryName;

        category.appendChild(option);

    });
}


//display product

function displayProducts(list) {

    productList.innerHTML = "";

    let start = (currentPage - 1) * productsPerPage;

    let pageProducts = list.slice(
        start,
        start + productsPerPage
    );

    pageProducts.map(function(product) {

        let {thumbnail,title,category,price,rating}=product;
        let card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img src="${thumbnail}" class="product-image">
            <h3>${title}</h3>
            <p>${category}</p>
            <p>Rs ${price}</p>
            <p>* ${rating}</p>
        `;

        let productImage = card.querySelector(".product-image");

        productImage.addEventListener("click", function() {

            showProductDetails(product);

        });


        // ADD TO CART

        let addCartButton = document.createElement("button");

        addCartButton.textContent = "Add to Cart";

        addCartButton.addEventListener("click", function() {

            let existingProduct = cart.find(function(item) {

                return item.id === product.id;

            });

            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({
                    ...product,
                    quantity: 1
                });

            }

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            cartCount.textContent = cart.length;

            displayCart();

        });

        card.appendChild(addCartButton);


        // ADD TO WISHLIST

        let wishlistButton = document.createElement("button");

        wishlistButton.textContent = "Wishlist";

        wishlistButton.addEventListener("click", function() {

            wishlist.push(product);

            localStorage.setItem(
                "wishlist",
                JSON.stringify(wishlist)
            );

            wishlistCount.textContent = wishlist.length;

        });

        card.appendChild(wishlistButton);

        productList.appendChild(card);

    });

    pageNumber.textContent = "Page " + currentPage;
}


function showProductDetails(product) {

    modalImage.src = product.thumbnail;
    modalTitle.textContent = product.title;
    modalCategory.textContent = product.category;
    modalPrice.textContent = "Rs " + product.price;
    modalRating.textContent = "Rating: " + product.rating;
    modalDescription.textContent = product.description;

    productModal.style.display = "block";
}


closeModal.addEventListener("click", function() {

    productModal.style.display = "none";

});


//display cart

function displayCart() {

    cartList.innerHTML = "";

    cart.map(function(product, index) {

        let {title,price,quantity}=product;
        let cartItem = document.createElement("div");

        cartItem.innerHTML = `
            <h3>${title}</h3>
            <p>Rs ${price}</p>
            <p>Quantity: ${quantity}</p>

            <button onclick="increaseQuantity(${index})">+</button>
            <button onclick="decreaseQuantity(${index})">-</button>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;

        cartList.appendChild(cartItem);

    });


    // Total

    let total = cart.reduce(function(total, product) {

        return total + product.price * product.quantity;

    }, 0);


    cartList.innerHTML += `
        <h3>Total: Rs ${total}</h3>
    `;
}


//increase quantity

function increaseQuantity(index) {

    cart[index].quantity++;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}

//decrease quantity

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}

//remove from cart

function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

    cartCount.textContent = cart.length;
}

//search

search.addEventListener("input", function() {

    let text = search.value.toLowerCase();

    let result = products.filter(function(product) {

        return product.title
            .toLowerCase()
            .includes(text);

    });

    currentPage = 1;

    filteredProducts = result;

    displayProducts(filteredProducts);

});


//category

category.addEventListener("change", function() {

    let result = products.filter(function(product) {

        return category.value === "all" ||
               product.category === category.value;

    });

    currentPage = 1;

    filteredProducts = result;

    displayProducts(filteredProducts);

});

//sorting
sort.addEventListener("change", function() {

    let result = [...products];


    // LOW TO HIGH

    if (sort.value === "price-low") {

        result.sort(function(product1, product2) {

            if (product1.price < product2.price) {
                return -1;
            }

            if (product1.price > product2.price) {
                return 1;
            }

            return 0;

        });

    }


    // HIGH TO LOW

    else if (sort.value === "price-high") {

        result.sort(function(product1, product2) {

            if (product1.price > product2.price) {
                return -1;
            }

            if (product1.price < product2.price) {
                return 1;
            }

            return 0;

        });

    }


    // RATING HIGH TO LOW

    else if (sort.value === "rating-high") {

        result.sort(function(product1, product2) {

            if (product1.rating > product2.rating) {
                return -1;
            }

            if (product1.rating < product2.rating) {
                return 1;
            }

            return 0;

        });

    }


    currentPage = 1;

    filteredProducts = result;

    displayProducts(filteredProducts);

});

//paging-->previous

previous.addEventListener("click", function() {

    if (currentPage > 1) {

        currentPage--;

        displayProducts(filteredProducts);

    }

});

//next
next.addEventListener("click", function() {

    let totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    );

    if (currentPage < totalPages) {

        currentPage++;

        displayProducts(filteredProducts);

    }

});


//cart button

cartButton.addEventListener("click", function() {

    cartSection.style.display = "block";

    displayCart();

});

//wishlist button
wishlistButton.addEventListener("click", function() {

    wishlist.map(function(product) {

        cart.push({
            ...product,
            quantity: 1
        });

    });

    wishlist = [];

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    wishlistCount.textContent = 0;

    cartCount.textContent = cart.length;

    displayCart();

});


// CHECKOUT

checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;

    if (name === "" || email === "" || address === "") {

        alert("Fill required fields");

        return;
    }

    alert("Order placed successfully");

});

getProducts();