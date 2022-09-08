"use strict";


const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');
const basketEl = document.querySelector('.basket');

document.querySelector('.cartIconWrap').addEventListener('click', 
    () => {document.querySelector('.basket').classList.toggle('hidden');});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', 
    (event) => {
        if (!event.target.closest('.addToCart')) {
            return;
        }
        const featuredItem = event.target.closest('.featuredItem');

        const id = +featuredItem.dataset.id;
        const name = featuredItem.dataset.name;
        const price = +featuredItem.dataset.price;

        addToCart(id, name, price);
        basketCounterEl.textContent = getTotalBasketCount();
        basketTotalValueEl.textContent = getTotalPrice().toFixed(2);
        renderProducts(id);
    })


function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = {id, name, price, count: 0};
    }
    basket[id].count++;
}

function getTotalBasketCount() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count, 0);
}

function getTotalPrice() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count * product.price, 0);
}

function renderProducts(id) {
    const basketRowEl = basketEl.querySelector(`.basketRow[data-productId="${id}"]`)
    if (!basketRowEl ){
        basketTotalEl.insertAdjacentHTML('beforebegin', renderNewProduct(id));
        return;
    }

    basketRowEl.querySelector('.productCount').textContent = `${basket[id].count} шт.`;
    basketRowEl.querySelector('.productTotalPrice')
        .textContent = `$${basket[id].price * basket[id].count}`;

}

function renderNewProduct(productId) {
    return `
    <div class="basketRow basketItem" data-productId="${productId}">
        <div class="productName">${basket[productId].name}</div>
        <div class="productCount">${basket[productId].count} шт.</div>
        <div class="productPrice">$${basket[productId].price}</div>
        <div class="productTotalPrice">$${basket[productId].price * basket[productId].count}</div>
    </div>
    `;
}