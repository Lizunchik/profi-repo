let TITLES = [
    'MANGO PEOPLE T-SHIRT',
    'BANANA PEOPLE T-SHIRT',
    'POTATO PEOPLE T-SHIRT',
    'CUCUMBER PEOPLE T-SHIRT',
    'PEPPER PEOPLE T-SHIRT',
    'GOROKCH PEOPLE T-SHIRT',
    'ORANGE PEOPLE T-SHIRT',
    'KIWI PEOPLE T-SHIRT'
];
let PRICES = [52, 68, 36.1, 700, 87, 50, 67.5, 120.03];

const catalog = {
    items: [],
    container: null,
    init() {
        this.container = document.querySelector('#catalog');
        this.items = getItems(TITLES, PRICES);
        this._render();
    },
    _render() {
        let htmlStr = '';

        this.items.forEach((item, i) => {
            htmlStr += `
            <div class="product" id="p1">
            <img src="img/p${1 + i}.jpg" alt="p1">
            <div class="shadow">
                <button class="shadowBtn">
                    <img src="img/w_cart.png" alt="cart"> <span>Add to Cart</span>
                </button>
            </div>
            <div class="product-desc"> ${item.productName}
                <div class="price">$${item.productPrice}</div>
            </div>
        </div>
            `
        });
        this.container.innerHTML = htmlStr;
    }
}



function getItems(titles, prices) {
    let arr = [];

    for (let i = 0; i < titles.length; i++) {
        arr.push(createItem(i, titles, prices));
    }

    return arr;
}


function createItem(index, titles, prices) {
    return {
        productName: titles[index],
        productPrice: prices[index],
        productId: `prod_${index + 1}` //'prod_1'
    }
}
catalog.init();

let TITLES_CART = [
    'PEPPER PEOPLE T-SHIRT',
    'GOROKCH PEOPLE T-SHIRT'
]
let PRICES_CART=[
    20,30
]
const cart = {
    items: [],
    container: null,
    init() {
        this.container = document.querySelector('#cart-card-products');
        this.items = getItems(TITLES_CART, PRICES_CART);
        this._render();
    },
    _render() {
        let htmlStr = '';

        this.items.forEach((item, i) => {
            htmlStr += `
            <div class="product-card">
            <img src="img/mini${1 + i}.png" alt="mini">
            <div class="cart-product-info">
                <span>${item.productName}</span>  <br>
                <img src="img/stars.png" alt="stars"> <br>
                <span>1 x $${item.productPrice}</span> 
            </div>
        </div>
            `
        });
        this.container.innerHTML = htmlStr;
    }
}
cart.init();
