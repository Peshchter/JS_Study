const URL = 'http://localhost:3000';

Vue.component('search', {
    data() {
        return {
            searchLine: ''
        }
    },
    template: `
        <form action="#" class="header-form">
             <ul>
                        <li class="browse-button-point">
                            <a href="product.html" class="unlined">
                                <div class="browse-button">Browse&nbsp;<i class="fas fa-caret-down fa-my-style"></i>
                                </div>
                            </a>
                            <div class="drop-menu" style="top: 35px;">
                                <div class="drop-flex">
                                    <h3 class="drop-h3">WOman</h3>
                                    <ul>
                                        <li class="drop-menu-link"><a href="product.html" class="drop-link">Dresses</a>
                                        </li>
                                        <li class="drop-menu-link"><a href="product.html" class="drop-link">Tops</a>
                                        </li>
                                        <li class="drop-menu-link"><a href="product.html" class="drop-link">Sweaters/Knits</a>
                                        </li>
                                        <li class="drop-menu-link"><a href="product.html" class="drop-link">Jackets/Coats</a>
                                        </li>
                                        <li class="drop-menu-link"><a href="product.html" class="drop-link">Blazers</a>
                                        </li>
                                        <li class="drop-menu-link"><a href="product.html" class="drop-link">Denim</a>
                                        </li>
                                        <li class="drop-menu-link"><a href="product.html" class="drop-link">Leggings/Pants</a>
                                        </li>
                                        <li class="drop-menu-link"><a href="product.html" class="drop-link">Skirts/Shorts</a>
                                        </li>
                                        <li class="drop-menu-link"><a href="product.html"
                                                                      class="drop-link">Accessories</a></li>
                                    </ul>
                                    <h3 class="drop-h3">man</h3>
                                    <ul>
                                        <li class="drop-menu-link"><a href="product.html" class="drop-link">Tees/Tank
                                            tops</a></li>
                                        <li class="drop-menu-link"><a href="product.html"
                                                                      class="drop-link">Shirts/Polos</a></li>
                                        <li class="drop-menu-link"><a href="product.html" class="drop-link">Sweaters</a>
                                        </li>
                                        <li class="drop-menu-link"><a href="product.html" class="drop-link">Sweatshirts/Hoodies</a>
                                        </li>
                                        <li class="drop-menu-link"><a href="product.html" class="drop-link">Blazers</a>
                                        </li>
                                        <li class="drop-menu-link"><a href="product.html" class="drop-link">Jackets/vests</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
             <input type="text" class="search-form" v-model="searchLine" placeholder="Search for Item...">
             <button class="search-button" @click.prevent="handleSearchClick"><i class="fas fa-search"></i></button>
        </form>`,
    methods: {
        handleSearchClick() {
            this.$emit('search', this.searchLine)
        }
    },

});

Vue.component('product', {
    props: ['item'],
    template: `
        <div class="product-flex">
            <a href="singlepage.html" class="product-item">
                <div class="product-image" :style="{ backgroundImage: bImage }" ></div>
                <p class="product-name">{{item.title}}</p>
                <p class="product-price">\${{item.price}} </p>
            </a>
            <a href="#addtocart" class="add-to-cart" @click.prevent="buy(item)"><img src="img/cart-white.svg" alt="cart">Add to Cart</a>
        </div>`,
    computed: {
        bImage() {
            return `url(img/${this.item.img})`;
        }
    },
    methods: {
        buy(item) {
            this.$emit('onBuy', item)
        }
    }

});

Vue.component('products', {
    props: ['query'],
    data() {
        return {
            items: [],
        }
    },
    template: `
        <div class="items-container" style=" justify-content: space-between;">
              <product v-for="entry in filteredItems" :item="entry" @onBuy="handleBuyClick"></product>
        </div>
    `,

    mounted() {
        fetch(`${URL}/products`)
            .then(response => response.json())
            .then((items) => {
                this.items = items;
            });
    },
    computed: {
        filteredItems() {
            if (this.query) {
                const regexp = new RegExp(this.query, 'i');
                return this.items.filter((item) => regexp.test(item.title));
            } else {
                return this.items;
            }

        }
    },
    methods: {
        handleBuyClick(item) {
            this.$emit('onbuy', item)
        }
    }
});

Vue.component('cart', {
    props: {
        items: Array,
        cost: Number,
    },

    template: `
          <div class="drop-menu" style="left: -100px; flex-direction: column; min-width: 260px; ">
              <div v-if="items.length > 0">
              <div v-for="item in this.items" class="cart-menu-item">
                  <a :href="link(item)" class="drop-link elastic">
                      <div class="cart-menu-img" :style="{ backgroundImage: bImage(item) }"></div>
                                    <div class="cart-menu-product-info">
                                        <h3 class="drop-cart-menu-h3">{{item.title}}</h3>
                                        <div class="cart-menu-rating"><i class="fas fa-star"></i><i
                                                class="fas fa-star"></i><i class="fas fa-star"></i><i
                                                class="fas fa-star"></i><i class="fas fa-star"></i></div>
                                        <h4 class="cart-drop-menu-price">{{item.count}} x \${{item.price}}</h4>
                                    </div>
                                </a>
                                <div class="cart-menu-product-remove">
                                    <button class="action-delete" @click.prevent="ondelete(item)"><i class="fas fa-times-circle"></i></button>
                                </div>
                            </div>
              </div>            
              <div class="cart-menu-price">
                  <h2 class="cart-menu-h2">Итог</h2>
                  <h2 class="cart-menu-h2">\${{cost}}</h2>
              </div>
                            <a href="checkout.html" class="white-pink-button form-button"
                               style="text-decoration: none; width: 100%; margin-bottom: 10px;">checkout</a>

                            <a href="cart.html" class="form-button "
                               style="text-decoration: none; width: 100%;     display: flex;    align-items: center;    justify-content: center;">
                               В корзину</a>
                        </div>
    `,
    methods: {
        ondelete(item) {
            this.$emit('ondelete', item)
        },
        link(item){
            return `singlepage.html?id=${item.id}`;
        },
        bImage(item) {
            return `url(img/${item.img})`;
        }
    },
});


const app = new Vue({
    el: '#app',
    data: {
        filterLine: '',
        cart: [],
        product: Object,
    },
    methods: {
        handleBuyClick() {
            const cartItem = this.cart.find((ci) => ci.id === this.product.id);
            if (cartItem) {
                fetch(`${URL}/cart/${cartItem.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({count: cartItem.count + this.product.count})
                }).then(
                    (response) => response.json()
                ).then((item) => {
                    const idx = this.cart.findIndex((pr) => pr.id === item.id);
                    Vue.set(this.cart, idx, item);
                })
            } else {
                fetch(`${URL}/cart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({...this.product, count: this.product.count})
                }).then(
                    (response) => response.json()
                ).then((item) => {
                        this.cart.push(item)
                    }
                )
            }
        },
        handleSearchClick(Line) {
            this.filterLine = Line;
        },
        handleClearCart() {
            for (item of this.cart) {
                this.ondelete(item)
            }
        },
        bImage() {
            if (this.product.img) {
                return `background-image: url(img/${this.product.img})`;
            }
        },
        ondelete(item) {
            fetch(`${URL}/cart/${item.id}`, {
                method: 'DELETE',
            }).then(() =>
                this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id)
            )
        },
        calculate() {
            if (this.cart.length > 0) {
                let cost = 0;
                for (item of this.cart) {
                    cost += item.count * item.price;
                }
                return cost;
                // return +this.items.reduce((acc, item) => acc + item.count * item.price);
            } else {
                return 0;
            }
        },
        countchange(item) {
            fetch(`${URL}/cart/${item.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({count: item.count})
            }).then(
                (response) => response.json()
            ).then((item) => {
                const idx = this.cart.findIndex((pr) => pr.id === item.id);
                Vue.set(this.cart, idx, item);
            })
        },
        link(item){
            return `singlepage.html?id=${item.id}`;
        },
    },
    mounted() {
        fetch(`${URL}/cart`)
            .then(response => response.json())
            .then((items) => {
                this.cart = items;
            });
        let params = new URLSearchParams(document.location.search.substring(1));
        let idx = +params.get('id');
        fetch(`${URL}/products`)
            .then(response => response.json())
            .then((items) => {
                this.product = items.find((ci) => ci.id === idx);
            });

    },
});
