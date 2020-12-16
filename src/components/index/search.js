Vue.component("app-goods-items", {
    props: ["items"],
    template: `
  <div>
      <div
          v-for="item in items" 
          :key="item.product_id">
              <h3>{{item.productName}}</h3>
              <p>{{item.productPrice}}</p>
          </div>
  </div>
      `,
  });
Vue.component("searchwrap", {
    template: `
<div>
        <form class="searchWrap">
        <div class="searchBrowse">
            Browse <img src="../src/assets/images/bottom-arrow.png" alt="arrow">
        </div>
        <input v-model="filterSearch" placeholder="Search for Item..." type="text">
    <button v-on:click="updateGoodsList">
            <img src="../src/assets/images/lupa.png" alt="lupa" name="cart">
        </button>
        
    </form>
    <app-goods-items
    :items="filteredGoods"
    >
    </app-goods-items>
</div>
      `,
      data() {
        return{
            goodsList: [],
            message: '',
            filteredGoods: [],
            filterSearch: "",
            url:'https://raw.githubusercontent.com/Lizunchik/static/main/catalog.json',
        }

      },
      mounted() {
        // получить список товаров
        this._get(this.url)
            .then(catalog => {
                this.goodsList = catalog;
            });
          
      },
      // Общие методы
      methods: {
        _get(url) {
            return fetch(url).then(d => d.json());
        },
        updateGoodsList() {
          // обновим отображаемый список, отфильтруем общий
          this.filteredGoods = this.goodsList.filter((i) =>
            i.productName.toLowerCase().includes(this.filterSearch.toLowerCase())
          );
          if (this.filteredGoods.length == 0){
            this.message='Ничего не найдено';
          }
          else{
            this.message='';
          }
        },
      },
});
const search = new Vue({
    el: "#headerInsideSearch",
    data: {
      name: "Username",
    },
  });