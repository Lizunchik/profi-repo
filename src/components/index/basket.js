var basket = new Vue({
    el: "#headerCart",
    children:['#cart-card'],
    vnode: '#cart-card',
    data: {
        isVisibleCart: false,
        totalContainer: '',
        sum: 0,
        goodsBasketList: [],
        url: 'https://raw.githubusercontent.com/Lizunchik/static/main/basket.json'
    },
    mounted() {
        this._get(this.url)
            .then(basket => {
                this.goodsBasketList = basket.content;
            });

        this._handleEvents();
    },
    updated() {
        this._calcSum();

    },
    methods: {
        _get(url) {
            return fetch(url).then(d => d.json());
        },
        _calcSum() {
            this.sum = 0;
            this.goodsBasketList.forEach(item => {
                this.sum += item.amount * item.productPrice;
            });

            this.totalContainer = this.sum + '$';
        },
        _handleEvents() {

            document.addEventListener('click', event => {
                if (event.target.offsetParent.id != 'cart-card' && event.target.name != 'cart') {
                   
                    [...this.$el.childNodes].find(item => item.id == 'cart-card').style.display = 'none';
                    this.isVisibleCart=false;
                }
                if (event.target.className == 'remove') {
                    let id = event.target.dataset.id;
                    this._remove(id);
                }
            });

        },
        _remove(id) {
            let find = this.goodsBasketList.find(el => el.productId == id);

            if (find.amount > 1) {
                find.amount--;
            } else {
                this.goodsBasketList.splice(this.goodsBasketList.indexOf(find), 1);
            }
        },
    },
});
let cart = document.getElementById('cart');
cart.onclick = showBasket;

function showBasket(eventObj) {
    console.log(eventObj);
    let container = document.getElementById('cart-card');
    container.style.display = 'flex';
    basket.isVisibleCart=true;
}