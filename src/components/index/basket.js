var basket = new Vue({
    // Селектор для вмонтирования приложения Vue
    el: "#headerCart",
    // Общие переменные (доступны в методах ниже и в шаблоне)
    data: {
        isVisibleCart:false,
        totalContainer:'',
        sum: 0,
        wrapper : document.querySelector('#cart-card'),
      // Общий список товаров
     //goodsList: [],
      // Отфильтрованый список товаров (отображается пользователям)
      goodsBasketList: [],
      url: 'https://raw.githubusercontent.com/Lizunchik/static/main/basket.json'
    },
    // Хук (метод) жизненного цикла - вызывается однажды при старте (монтировании) приложения
    mounted() {
      // получить список товаров
      this._get(this.url)
      .then(basket => {
          //this.goodsList = basket.content;
          this.goodsBasketList = basket.content;
      });
      
      this._handleEvents();
    },
    updated() {
        this._calcSum();
        
    },
    // Общие методы
    methods: {
      // Метод для обновления отображаемого списка
      // при каждом изменении инпута

      _get(url) {
        return fetch(url).then(d => d.json()); //сделает запрос за джейсоном, дождется ответа и преобразует джейсон в объект, который вернется из данного метода
    },
    _calcSum() {
        this.sum = 0;
        this.goodsBasketList.forEach(item => {
            this.sum += item.amount * item.productPrice;
        });

        this.totalContainer= this.sum + '$';
    },
    _handleEvents(){
      
        document.addEventListener('click', event => {
            if (event.target.offsetParent.id != 'cart-card' && event.target.name != 'cart') {
                this.wrapper.style.display='none';
            }
            if (event.target.className =='remove'){
                let id = event.target.dataset.id; 
                this._remove(id);
            }
        });
    
    },
    _remove(id) {
        let find = this.goodsBasketList.find(el => el.productId == id);

        if(find.amount > 1) {
            find.amount--;
        } else {
            this.goodsBasketList.splice(this.goodsBasketList.indexOf(find), 1);
        }
    },
  },
});
  let cart= document.getElementById('cart');
  cart.onclick=showBasket;
  function showBasket(eventObj){
    console.log(eventObj);
    let container = document.getElementById('cart-card');
    container.style.display='flex';
}
  