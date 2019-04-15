const URL = 'http://localhost:3000';

const app = new Vue({
    el: '#v-app',
    data: {
    },
    methods: {
        sendForm(){

        },
    },

    mounted() {
        fetch(`${URL}/cart`)
            .then(response => response.json())
            .then((items) => {
                this.cart.items = items;
            });
    }
});
