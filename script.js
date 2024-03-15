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
const dateSpan = document.getElementById("date-span");
const phone = "86995164003";

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
  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));

    //Adiciona o item ao carrinho
    addItemToCart(name, price);
    alertToastify("Item adicionado ao carrinho!", "green")
  }
});

// Função para adicionar um item ao carrinho

function addItemToCart(name, price) {
  // Verifica se o item já está no carrinho
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quanty += 1;
  } else {
    cart.push({ name, price, quanty: 1 });
  }

  updateCartModal();
}

// Função para renderizar os itens no carrinho
function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quanty;
    total += itemTotal;

    cartItemsContainer.innerHTML += `
        <div class="flex items-center justify-between py-3">
            <div>
                <p class="font-bold">${item.name}</p>
                <p class="">(Qtd: ${item.quanty})</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>
            <div>
                <button class="remove-from-cart" data-name="${
                  item.name
                }">Remover</button>
            </div>
        </div>
        `;
  });

  cartTotal.innerHTML = `${total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}`;
  cartCount.innerHTML = cart.length;
}

//remove item do carrinho
cartItemsContainer.addEventListener("click", (e) => {
  // Analisa se o botão clicado é o de remover e pega o nome do item
  if (e.target.classList.contains("remove-from-cart")) {
    const name = e.target.getAttribute("data-name");

    removeCartItem(name);
  }
});

function removeCartItem(name) {
  // Encontra o item no carrinho pelo nome
  const index = cart.findIndex((item) => item.name === name);

  // Se o item existir, remove ele do carrinho se a quantidade for maior que 1
  //senão remove o item do carrinho
  if (index !== -1) {
    const item = cart[index];
    if (item.quanty > 1) {
      item.quanty--;
    } else {
      cart.splice(index, 1);
    }
  }

  updateCartModal();
}

// Validação do campo de endereço
adressInput.addEventListener("input", (e) => {
  let inputValue = e.target.value;

  if (inputValue.length < 10) {
    adressWarn.classList.remove("hidden");
  } else {
    adressWarn.classList.add("hidden");
  }
});

// Função para finalizar a compra
checkoutBtn.addEventListener("click", () => {
  const isOpen = checkOpen();

  if(!isOpen) {
      alertToastify("Desculpe, o restaurante está fechado no momento!", "red")
      cartModal.style.display = "none"
      return
  }

  if (cart.length === 0) {
    alertToastify("Adicione itens ao carrinho antes de finalizar a compra!", "red")
    return;
  }

  if (adressInput.value.length < 10) {
    adressWarn.classList.remove("hidden");
    adressInput.classList.add("border-red-500");
    return;
  }

  // Simula o envio do pedido
  const cartItems = cart
    .map((item) => {
      return `${item.name} - Quantidade: (${
        item.quanty
      }) - R$ ${item.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}`;
    })
    .join("\n");

    alertToastify("Pedido enviado com sucesso!", "green")

  const message = encodeURIComponent(
    `Olá, gostaria de fazer o pedido:\n${cartItems}\n\nTotal: ${cartTotal.textContent}\n\nEndereço para entrega: ${adressInput.value}`
  );

  const url = `https://wa.me/${phone}?text=${message}`;

  window.open(url, "_blank");

  // Limpa o carrinho e fecha o modal
  cart = [];
  updateCartModal();
});

// Função para verificar se o restaurante está aberto
function checkOpen() {
  const data = new Date();
  const hour = data.getHours();
  return hour >= 18 && hour < 22;
}

const isOpen = checkOpen();

// Muda a cor do span de acordo com o status do restaurante
if (isOpen) {
  dateSpan.classList.remove("bg-red-500");
  dateSpan.classList.add("bg-green-600");
} else {
  dateSpan.classList.remove("bg-green-600");
  dateSpan.classList.add("bg-red-500");
}

function alertToastify(message, color) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: color,
        },
      }).showToast();
}
