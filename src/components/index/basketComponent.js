Vue.component("cartcard", {
    props: ["items", 'total'],
    template: `

        <div id="cart-card">
            <div id="cart-card-products">
                <div v-for="good in items" class="goods-item">
                    <div class="product-card">
                        <img :src='good.productImg' alt="mini">
                        <div class="cart-product-info">
                            <span>{{good.productName}}</span>  <br>
                            <img src="../src/assets/images/stars.png" alt="stars"> <br>
                            <span>{{good.amount}} x $ {{good.productPrice}}</span> 
                        </div>
                        <div class ='remove'
                        :data-id="good.productId"
                        >X</div>
                </div>
                    </div>
                    </div>
            <div id="total-cart">
                <div>Total</div>
                <div id="basket-sum" >
                <p>{{total}}</p>
                </div>
            </div>
            <div class="bottom-cart">
                <a href="">Checkout</a>
                <a href="">Go to cart</a>
        </div>
</div>
      `,
});

let basket = Vue.component("headercarttag", {
    template: `
<div id="headerCart">
        <button v-on:click='cartClick' id="cartButton"><img src="../src/assets/images/cart.svg" alt="" id="cart"
            name="cart"></button>
        <cartcard :items="goodsBasketList" :total='totalContainer'>

    </cartcard>
</div>
      `,
      data() {
        return{
            isVisibleCart: false,
            totalContainer: '',
            sum: 0,
            goodsBasketList: [],
            url: 'http://localhost:3000/basket'
        }

    },
    mounted() {

        this.render();
        this._handleEvents();
    },

    updated() {
        this._calcSum();

    },
    methods: {
        render(){
            this._get(this.url)
                .then(basket => {
                    this.goodsBasketList = basket.data.content;
                });
        },
        _get(url) {
            return fetch('http://localhost:3000/basket',
                ).then(d => d.json());
        },
        _calcSum() {
            this.sum = 0;
            this.goodsBasketList.forEach(item => {
                this.sum += item.amount * item.productPrice;
            });

            this.totalContainer = this.sum + '$';
        },
        cartClick(){
            let container = document.getElementById('cart-card');
            container.style.display = 'flex';
            this.render();
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

        fetch(`http://localhost:3000/basket/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                .then(() => this._get(this.url).then(basket => {
                    this.goodsBasketList = basket.data.content;
                }));
        },
    },
});
const app = new Vue({
    el: "#headerInsideRight",
    data: {
      name: "Username",
    },
  });