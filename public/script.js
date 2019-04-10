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

})
;

const app = new Vue({
    el: '#app',
    data: {
        items: [],
        filteredItems: [],
        popupCart: {
            visible: false,
            cartItems: []
        },
        cart: {
            items: []
        }
    },
    methods: {
        handleSearchClick(Line) {
            const regexp = new RegExp(Line, 'i');
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
