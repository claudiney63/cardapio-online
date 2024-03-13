const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeBtn = document.getElementById("closer-modal-btn");
const cartCount = document.getElementById("cart-count");
const adressInput = document.getElementById("adress");
const adressWarn = document.getElementById("adress-warn");

let cart = [];

// Abre e fecha o modal do carrinho
cartBtn.addEventListener("click", () => {
    cartModal.style.display = "flex";
});

cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = "none";
    }
});

closeBtn.addEventListener("click", () => {
    cartModal.style = "hidden";
});

menu.addEventListener("click", (e) => {
    let parentButton = e.target.closest(".add-to-cart-btn");
    if(parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        //Adiciona o item ao carrinho
        addItemToCart(name, price);
    }
});

// Função para adicionar um item ao carrinho

function addItemToCart(name, price) {
    alert("Adicionando: " + name + " ao carrinho por " + price);
}