Vue.component("lol", {
    props: ["items"],
    template: `
    <div>
    <div v-for="good in items" class="cartItem container">
    <div class="cartItemBlock">
        <img :src='good.productImg' alt="">
        <div class="cartItemInfo">
            <div class="cartItemHeader">{{good.productName}}</div>
            <div class="cartItemInfoDetail">Color:  Red<br>
                Size:  Xll</div>
        </div>
    </div>
    <div class="cartItemBlock">
        <div class="unitPrice">{{good.productPrice}}</div>
        
    </div>
    <div class="cartItemBlock">
        <div class="quantity"> <div>{{good.amount}}</div></div> 
    </div>
    <div class="cartItemBlock">
        <div class="shipping">
            FREE
        </div>
    </div>
    <div class="cartItemBlock">
        <div class="subtotal">
        {{good.productPrice * good.amount}} 
        </div>
    </div>
    <div class="cartItemBlock">
        <div class="action">
            <a href="">X</a>
        </div>
    </div>
</div>
</div>
      `,
});
let basketItem = Vue.component("kek", {
    template: `

    <lol :items="items">

    </lol>
      `,
      data() {
        return{
            //isVisibleCart: false,
            //totalContainer: '',
            sum: 0,
            items: [],
            url: 'http://localhost:3000/basket'
        }

    },
    mounted() {

        this.render();
        //this._handleEvents();
    },

    methods: {
        render(){
            this._get(this.url)
                .then(basket => {
                    this.items = basket.data.content;
                });
        },
        _get(url) {
            return fetch('http://localhost:3000/basket',
                ).then(d => d.json());
        },
        _calcSum() {
            this.sum = 0;
            this.items.forEach(item => {
                this.sum += item.amount * item.productPrice;
            });

            //this.totalContainer = this.sum + '$';
        },

        _remove(id) {

        fetch(`http://localhost:3000/basket/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                .then(() => this._get(this.url).then(basket => {
                    this.items = basket.data.content;
                }));
        },
    },
});
const cart = new Vue({
    el: "#cartItems",
    data: {
      name: "Username",
    },
  });