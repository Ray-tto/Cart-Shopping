let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    { id: 1, name: 'Chefs Special', image: '1.PNG', price: 39.90 },
    { id: 2, name: 'Chicken Wings', image: '2.PNG', price: 25.90 },
    { id: 3, name: 'Salmon Salad', image: '3.PNG', price: 34.80 },
    { id: 4, name: 'Pumpkin Soup', image: '4.PNG', price: 15.80 },
    { id: 5, name: 'Salad', image: '5.PNG', price: 17.55 },
    { id: 6, name: 'Pepperoni Pizza', image: '6.PNG', price: 30.50 }
];

let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
        <img src="image/${value.image}"/>
        <div class="title">${value.name}</div>
        <div class="price">$${value.price.toFixed(2)}</div>
        <button onclick="addToCard(${key})">Add To Card</button>
        `;
        list.appendChild(newDiv);
    });
}

initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = { ...products[key], quantity: 1 };
    } else {
        listCards[key].quantity++;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;  // Calculando o total corretamente
            count += value.quantity;

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
            <div><img src="image/${value.image}"/></div>
            <div>${value.name}</div>
            <div>$${value.price.toFixed(2)}</div>
            <div>
            <button onclick="changeQuantity(${value.id - 1}, ${value.quantity - 1})">-</button>
            <div class="count">${value.quantity}</div>
            <button onclick="changeQuantity(${value.id - 1}, ${value.quantity + 1})">+</button>
            </div>
            `;
            listCard.appendChild(newDiv);
        }
    });

    total.innerText = `$${totalPrice.toFixed(2)}`;  // Atualizando total corretamente
    quantity.innerText = count;  // Atualizando a quantidade total
}

function changeQuantity(key, quantity) {
    if (quantity <= 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
    }
    reloadCard();
}
