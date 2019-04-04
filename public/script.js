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
