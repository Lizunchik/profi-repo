function initBasket() {
    let cart= document.getElementById('cart');
    cart.onclick=showBasket;
    const basket = {
        items: [],
        total: null,
        container: null, // basket-items
        cart:null,
        wrapper: null, //basket all
        sum: 0,
        totalContainer: null,
        url: 'https://raw.githubusercontent.com/Lizunchik/static/main/basket.json',
        init() {
            this.container = document.querySelector('#cart-card-products');
            
            this.wrapper = document.querySelector('#cart-card');
            this.totalContainer = document.querySelector('#basket-sum');
            this._get(this.url)
            .then(basket => {
                this.items = basket.content;
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
                htmlStr += renderBasketTemplate(item, i);
            });
            this.container.innerHTML = htmlStr;
            this._calcSum();
            
        },
        _calcSum() {
            this.sum = 0;
            this.items.forEach(item => {
                this.sum += item.amount * item.productPrice;
            });

            this.totalContainer.innerText = this.sum + '$';
        },
        add(item) {
            let find = this.items.find(el => item.productId == el.productId);

            if(find) {
                find.amount++;
            } else {
                this.items.push(Object.assign({}, item, { amount: 1 }));
            }
 
            this._render();
        },
        _remove(id) {
            let find = this.items.find(el => el.productId == id);

            if(find.amount > 1) {
                find.amount--;
            } else {
                this.items.splice(this.items.indexOf(find), 1);
            }

            this._render();
        },
        _handleEvents() {
      
            document.addEventListener('click', event => {
                if (event.target.offsetParent.id != 'cart-card' && event.target.name != 'cart') {
                    this.wrapper.style.display='none';
                }
                if (event.target.className =='remove'){

                    let id = event.target.dataset.id; 
                    this._remove(id);
                }
            });
        }
    
    }         
    return basket
}

function showBasket(eventObj){
    console.log(eventObj);
    let container = document.getElementById('cart-card');
    container.style.display='flex';
}


function getBasketItems(TITLES, PRICES, AMOUNTS) {
    let arr = [];

    for (let i = 0; i < TITLES.length; i++) {
        arr.push(createBasketItem(i, TITLES, PRICES, AMOUNTS));
    }

    return arr;
}


function createBasketItem(index, TITLES, PRICES, AMOUNTS) {
    return {
        productName: TITLES[index],
        productPrice: PRICES[index],
        productAmount: AMOUNTS[index],
        productId: `prod_${index + 1}` //'prod_1'
    }
}



function renderBasketTemplate(item, i) {
    return `
    <div class="product-card">
        <img src="${item.productImg}" alt="mini">
        <div class="cart-product-info">
            <span>${item.productName}</span>  <br>
            <img src="../src/assets/images/stars.png" alt="stars"> <br>
            <span>${item.amount} x $${item.productPrice}</span> 
        </div>
        <div class ='remove'
        data-id="${item.productId}"
        >X</div>
    </div>
`
}