function initCatalog() {
const catalog = {
    items: [],
    container: null,
    basket: null,
    url: 'https://raw.githubusercontent.com/Lizunchik/static/main/catalog.json',
    init(basket) {
        this.container = document.querySelector('#catalog');
        this.basket = basket;
        
        this._get(this.url)
        .then(catalog => {
            this.items = catalog;
            this._render();
            this._handleEvents();
        });
    },
    _get(url) {
        return fetch(url).then(d => d.json()); //сделает запрос за джейсоном, дождется ответа и преобразует джейсон в объект, который вернется из данного метода
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
                let item = this.items.find(el => el.id== id);

                fetch('http://localhost:3000/basket/content', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                //body: JSON.stringify({productName: item.productName, productPrice: item.productPrice, productImg: item.productImg, productId: item.productId, amount: 1} )
                body: JSON.stringify({productName: item.productName, productPrice: item.productPrice, productImg: item.productImg, amount: 1, id: item.id} )
            }
        ).then(this.basket.extendOptions.methods.render());
        
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
            <div class="shadow">
                <button class="shadowBtn"
                name="add"
                data-id="${item.id}"
                >
                    <img src="../../src/assets/images/w_cart.png" alt="cart"> <span>Add to Cart</span>
                </button>
            </div>
            <img class="featuredProduct" src="${item.productImg}" alt="">
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
