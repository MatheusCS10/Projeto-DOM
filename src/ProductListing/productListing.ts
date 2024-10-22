window.addEventListener('DOMContentLoaded', () => {
 loadProducts(); 
})


interface IProduct {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  title: string;
}

const user = sessionStorage.getItem('username');
const logout = document.getElementById('logout');
logout?.addEventListener('click', () => {
  sessionStorage.removeItem('authToken');
  window.location.href = '/index.html';
})
const token = sessionStorage.getItem('authToken');
const username = document.querySelector('.username') as HTMLParagraphElement;
username.innerHTML = user ?? 'Usário';
const productList = await getProductList();
const cart = document.querySelector('.cart') as HTMLButtonElement;
const grid = document.getElementById('product-grid');
const sortMenu = document.getElementById('sort-menu') as HTMLSelectElement;
const selectdCategories = document.querySelectorAll('input[name="category"]') as NodeListOf<HTMLInputElement>;
const loading = document.querySelector('.loading') as HTMLDivElement;

sortMenu.addEventListener('change', () => {
  loadProducts(sortMenu.value);
  // limpando a caixa de seleção de categorias
  selectdCategories.forEach(category => {
    category.checked = false;
  })
})

selectdCategories.forEach(category => {
  category.addEventListener('change', () => {
    loadProducts(undefined, category.value);
  })
})

cart.addEventListener('click', () => {
  window.location.href = '/carrinho.html';
})
async function getProductList(): Promise<IProduct[]> {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Erro na rede ao buscar produtos');
  }
  const products: IProduct[] = await response.json();
  return products;
}

function loadProducts(order?: string, category?: string) {
  loading.classList.toggle('show');
  try {
    if (!productList) throw new Error("Erro ao buscar os produtos");
    let filteredList: Array<IProduct> = productList;
    // Filtrar por category, se uma category for passada
    if (category) {
    filteredList = productList.filter(product => product.category.includes(category));
    }
    // Ordenar se uma order for passada
    if (order) {
    filteredList = sort(order, filteredList);
    }
    // Renderizar a lista filtrada e/ou ordenada
    render(filteredList);
  } catch (error) {
    alert(error)
  } finally {
     loading.classList.toggle('show');
  }
  
}

function sort(order: string, list: Array<IProduct>): Array<IProduct> {
  if (order === 'alfabetica') {
    return list.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (order === 'crescente') {
    return list.sort((a, b) => a.price - b.price);
  }
  if (order === 'decrescente') {
    return list.sort((a, b) => b.price - a.price);
  }
  return list; // Retorna a lista caso não tenha nenhuma order específica
}

function render(productList: IProduct[]) {
  grid!.innerHTML = '';
  for (const product of productList) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    const btnAdd = document.createElement('button');
    const btnComprar = document.createElement('button');
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.src = product.image;
    const h4 = document.createElement('h4');
    h4.innerText = product.title;
    const p = document.createElement('p');
    p.innerText = `R$ ${product.price.toFixed(2)}`;
    btnComprar.innerHTML = 'Comprar';
    btnAdd.innerHTML = `<i class="fa-solid fa-cart-plus"></i>`;
    btnAdd.addEventListener('click', () => addToCart(product.id));
    div.classList.add('container-btn');
    btnComprar.addEventListener('click', () => {
      buyProduct(product);
    });
    div.appendChild(btnComprar);
    div.appendChild(btnAdd);
    card.appendChild(img);
    card.appendChild(h4);
    card.appendChild(p);
    card.appendChild(div);
    grid!.appendChild(card);
  }
}
function addToCart(id: number) {
  if (!token) {
    window.location.href = '/login.html';
    return;
  }
  const cart = JSON.parse(sessionStorage.getItem('cart') ?? '[]');
  cart.push(id);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Produto adicionado ao carrinho!');
}
function buyProduct(product: IProduct) {
  localStorage.setItem('cart', JSON.stringify(['product']));
  window.location.href = '/carrinho.html';
}
loadProducts();