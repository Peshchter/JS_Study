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
        handleSearchClick(){

        },
        handleCartClick(){
          this.popupCart.visible = !this.popupCart.visible;
        },
        calculate(){
            let cost = 0;
            for (let item of this.items) {
                cost += item.price * item.count;
            }
            return cost;
        },
    },
    mounted(){
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then((items) => {
                this.items = items;
                this.filteredItems = items;
            })
    }
});

