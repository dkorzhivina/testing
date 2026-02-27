console.log("JS подключён");

const products = [
  { id: 1, title: "Nike Air Force", price: 15000, available: true, image: "image/Nike Air Force.jpg" },
  { id: 2, title: "Adidas Superstar", price: 12000, available: false, image: "image/Adidas Superstar.jpg" },
  { id: 3, title: "Puma RS-X", price: 9800, available: true, image: "image/Puma RS-X.jpg" },
  { id: 4, title: "New Balance 550", price: 17000, available: true, image: "image/New Balance 550.jpg" },
  { id: 5, title: "Jordan 1 Low", price: 21000, available: false, image: "image/Jordan 1 Low.jpg" },
  { id: 6, title: "Reebok Classic", price: 8700, available: true, image: "image/Reebok Classic.jpg" },
  { id: 7, title: "Vans Old Skool", price: 7600, available: true, image: "image/Vans Old Skool.jpg" },
  { id: 8, title: "Converse Chuck 70", price: 9900, available: false, image: "image/Converse Chuck 70.jpg" },
  { id: 9, title: "Asics Gel", price: 13500, available: true, image: "image/Asics Gel.jpg" },
  { id: 10, title: "Nike Dunk", price: 18000, available: true, image: "image/Nike Dunk.jpg" },
  { id: 11, title: "Adidas Forum", price: 14000, available: true, image: "image/Adidas Forum.jpg" },
  { id: 12, title: "Puma Suede", price: 8300, available: false, image: "image/Puma Suede.jpg" },
];

const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const availableCheckbox = document.getElementById("available");

function render(items) {
  grid.innerHTML = "";

  if (items.length === 0) {
    grid.innerHTML = "<p>Ничего не найдено</p>";
    return;
  }

  items.forEach(product => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <div class="card_image">
      <img src="${product.image}" alt="${product.title}">
      </div>
      <h3 class="card_title">${product.title}</h3>
      <p class="card_price">${product.price.toLocaleString()} ₽</p>
      <button class="btn" ${!product.available ? "disabled" : ""}>
        ${product.available ? "В корзину" : "Нет в наличии"}
      </button>
    `;

    grid.appendChild(card);
  });
}

function filterAndSort() {
  let filtered = [...products];

  const searchValue = searchInput.value.toLowerCase();
  const sortValue = sortSelect.value;
  const onlyAvailable = availableCheckbox.checked;

  if (searchValue) {
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchValue)
    );
  }

  if (onlyAvailable) {
    filtered = filtered.filter(product => product.available);
  }

  if (sortValue === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sortValue === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  render(filtered);
}

searchInput.addEventListener("input", filterAndSort);
sortSelect.addEventListener("change", filterAndSort);
availableCheckbox.addEventListener("change", filterAndSort);

render(products);