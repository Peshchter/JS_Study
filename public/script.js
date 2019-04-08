Vue.component('search', {
    template: `<div>
        <input type="text" class="search-form" v-model="searchLine" placeholder="Search for Item...">
        <button class="search-button" @click="handleSearchClick"><i class="fas fa-search"></i></button></div>
`
});

Vue.component('product', {
    props: ['item'],
    template: ` <div>
        <a href="#" class="product-item">
            <div style="background - image: url('img/f1.jpg');" class="product-image"></div>
            <p class="product-name">{{ item.title }}</p>
            <p class="product-price">{{ item.count }} шт.х \${{ item.price }} </p>
        </a>
        <a href="#addtocart" class="add-to-cart">
            <img src="img/cart-white.svg" alt="cart">Add to Cart</a></div>`
});

Vue.component('products', {
    props: ['filtereditems'],
    template: `
                <div class="items-container"><product v-for="item in filtereditems" :item="item" class="product-flex"></product></div>`
});


const app = new Vue({
    el: '#app',
    data: {
        items: [],
        filteredItems: [],
        searchLine: '',
        popupCart: {
            visible: false,
            cartItems: []
        },
        cart: {
            items: []
        }
    },
    methods: {
        handleSearchClick() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredItems = this.items.filter((item) => regexp.test(item.title));

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

        filterItems(query) {

        }
    },

    mounted() {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then((items) => {
                this.items = items;
                this.filteredItems = items;
            });
        fetch('http://localhost:3000/cart')
            .then(response => response.json())
            .then((items) => {
                this.cart.items = items;
            });
    }
});
