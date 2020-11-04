function initCatalog() {
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
    basket: null,
    init(basket) {
        this.container = document.querySelector('#catalog');
        this.items = getCatalogItems(TITLES, PRICES);
        this.basket = basket;
        this._render();
        this._handleEvents();
    },
    _render() {
        let htmlStr = '';

        this.items.forEach((item, i) => {
            htmlStr += renderCatalogTemplate(item, i)
        });
        this.container.innerHTML = htmlStr;
    },
    _handleEvents() {
        this.container.addEventListener('click', event => {
            if (event.target.name == 'add') {
                // console.log('КУПЛЕНО!')
                let id = event.target.dataset.id; //from data-id
                let item = this.items.find(el => el.productId == id);

                item = Object.assign({}, item, {
                    productAmount: 1
                });
                this.basket.add(item);
            }
        });
    }
};
return catalog;
}
function getCatalogItems(TITLES, PRICES) {
    let arr = [];

    for (let i = 0; i < TITLES.length; i++) {
        arr.push(createCatalogItem(i, TITLES, PRICES));
    }

    return arr;
}
function createCatalogItem(index, TITLES, PRICES) {
    return {
        productName: TITLES[index],
        productPrice: PRICES[index],
        productId: `prod_${index + 1}` //'prod_1'
    }
}
function renderCatalogTemplate(item, i) {
    return `
    <div class="product" id="p1">
            <img src="../src/assets/images/p${1 + i}.jpg" alt="p1">
            <div class="shadow">
                <button class="shadowBtn"
                name="add"
                data-id="${item.productId}"
                >
                    <img src="../src/assets/images/w_cart.png" alt="cart"> <span>Add to Cart</span>
                </button>
            </div>
            <div class="product-desc"> ${item.productName}
                <div class="price">$${item.productPrice}</div>
            </div>
        </div>
    `
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
