function initBasket() {
    let TITLES = [
        'MANGO PEOPLE T-SHIRT',
        'BANANA PEOPLE T-SHIRT',
    ];
    let cart= document.getElementById('cart');
    cart.onclick=showBasket;

    let PRICES = [52, 68];

    let AMOUNTS = [4, 2];

    const basket = {
        items: [],
        total: null,
        container: null, // basket-items
        cart:null,
        wrapper: null, //basket all
        sum: 0,
        totalContainer: null,
        init() {
            this.container = document.querySelector('#cart-card-products');
            
            this.wrapper = document.querySelector('#cart-card');
            this.totalContainer = document.querySelector('#basket-sum');
            this.items = getBasketItems(TITLES, PRICES, AMOUNTS);
            this._render();
            this._handleEvents();
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
                this.sum += item.productAmount * item.productPrice;
            });

            this.totalContainer.innerText = this.sum + '$';
        },
        add(item) {
            let basketItem =this.items.find(el=>el.productName==item.productName);
            if (basketItem){
                basketItem.productAmount++;
            }
            else{
                this.items.push(item);
            }
            this._render();
        },
        _remove(item) {
            this.items.splice(this.items.indexOf(item), 1);
            this._render();
        },
        _handleEvents() {
      
            document.addEventListener('click', event => {
                if (event.target.offsetParent.id != 'cart-card' && event.target.name != 'cart') {
                    this.wrapper.style.display='none';
                }
                if (event.target.id =='remove'){

                    let id = event.target.dataset.id; //from data-id
                    let item = this.items.find(el => el.productId == id);
                    this._remove(item);
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
        <img src="../src/assets/images/mini${i + 1}.png" alt="mini">
        <div class="cart-product-info">
            <span>${item.productName}</span>  <br>
            <img src="../src/assets/images/stars.png" alt="stars"> <br>
            <span>${item.productAmount} x $${item.productPrice}</span> 
        </div>
        <div id ='remove'
        data-id="${item.productId}"
        >X</div>
    </div>
`
}