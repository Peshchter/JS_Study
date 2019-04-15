const URL = 'http://localhost:3000';

Vue.component('search', {
    data(){
        return {
            searchLine : ''
        }
    },
    template: `
        <form action="#" class="header-form">
             <input type="text" class="search-form" v-model="searchLine" placeholder="Search for Item...">
             <button class="search-button" @click.prevent="handleSearchClick"><i class="fas fa-search"></i></button>
        </form>`,
    methods: {
        handleSearchClick(){
            this.$emit('search', this.searchLine)
        }
    },

});

Vue.component('product', {
    props: ['item'],
    template: `
        <div class="product-flex">
            <a href="#" class="product-item">
                <div class="product-image" :style="{ backgroundImage: bImage }" ></div>
                <p class="product-name">{{item.title}}</p>
                <p class="product-price">{{item.count}} шт. х \${{item.price}} </p>
            </a>
            <a href="#addtocart" class="add-to-cart" @click.prevent="buy(item)"><img src="img/cart-white.svg" alt="cart">Add to Cart</a>
        </div>`,
    computed: {
        bImage() {
            return `url(img/${this.item.img})`;
        }
    },
    methods:{
        buy(item) {
            this.$emit('onBuy', item)
        }
    }

});

Vue.component('cart', {
    props: ['cart'],
    data(){
        return {
            items: [],
        }
    },
    template: `
        <div class="items-container">
              <product v-for="entry in filteredItems" :item="entry" @onBuy="handleBuyClick"></product>
        </div>
    `,

    mounted(){
        fetch(`${URL}/cart`)
            .then(response => response.json())
            .then((items) => {
                this.items = items;
            });
    },
    methods:{
        handleDeleteClick(item){
            this.$emit('delete', item)
        }
    }
});

const app = new Vue({
    el: '#app',
    data: {
        popupCart: {
            visible: false,
            cartItems: []
        },
        cart: {
            items: []
        },
        filterLine: '',
    },
    methods: {
        handleBuyClick(){

        },
        handleSearchClick(Line) {
            this.filterLine = Line;
        },

        handleCartClick() {
            this.popupCart.visible = !this.popupCart.visible;
        },

        calculate() {
            let cost = 0;
            for (let item of this.cart.items) {
                cost += item.price * item.count;
            }
            return cost;
        },

    },

    mounted() {

        fetch('http://localhost:3000/cart')
            .then(response => response.json())
            .then((items) => {
                this.cart.items = items;
            });
    }
});
