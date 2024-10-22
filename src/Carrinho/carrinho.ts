// src/main.ts

interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  }
  
  let cart: CartItem[] = [];
  
  // Função para calcular o total
  const calculateTotal = () => {
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById('total-price')!.textContent = `R$ ${totalPrice.toFixed(2)}`;
  };
  
  // Função para renderizar os itens no carrinho
  const renderCartItems = () => {
    const cartItemsContainer = document.getElementById('cart-items')!;
    cartItemsContainer.innerHTML = '';
  
    cart.forEach((item) => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div>
          <h3>${item.title}</h3>
          <p>Preço: R$ ${item.price.toFixed(2)}</p>
          <p>Quantidade: ${item.quantity}</p>
        </div>
      `;
      cartItemsContainer.appendChild(cartItemElement);
    });
  
    calculateTotal();
  };
  
  // Simulando a adição de produtos ao carrinho
  const addToCart = (item: CartItem) => {
    cart.push(item);
    renderCartItems();
  };
  
  // Simulação de produtos adicionados ao carrinho
  addToCart({
    id: 1,
    title: 'Produto A',
    price: 100.00,
    image: 'https://via.placeholder.com/100',
    quantity: 1
  });
  
  addToCart({
    id: 2,
    title: 'Produto B',
    price: 50.00,
    image: 'https://via.placeholder.com/100',
    quantity: 2
  });
  
  addToCart({
    id: 3,
    title: 'Produto C',
    price: 50.00,
    image: 'https://via.placeholder.com/100',
    quantity: 2
  });
  
  // Evento de finalizar compra
  document.getElementById('checkout-btn')!.addEventListener('click', () => {
    const modal = document.getElementById('checkout-modal')!;
    modal.classList.remove('hidden');
  });
  
  // Fechar o modal
  document.getElementById('close-modal')!.addEventListener('click', () => {
    const modal = document.getElementById('checkout-modal')!;
    modal.classList.add('hidden');
  });
  