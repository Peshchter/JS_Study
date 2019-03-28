class CartItem {
    constructor(title, price, img, count = 1) {
        this.title = title;
        this.price = price;
        this.img = 'img/' + img;
        this.count = count;
    }

    render() {
        return `<div class="product-flex">
                <a href="#" class="product-item">
                    <div class="product-image" style="background-image: url(${this.img});"></div>
                    <p class="product-name">${this.title}</p>
                    <p class="product-price">${this.count} шт. х  \$${this.price}  </p>
                </a>
                <a href="#addtocart" class="add-to-cart"><img src="img/cart-white.svg" alt="cart">Add to Cart</a></div>`;
    }
}

class CartList {
    constructor() {
        this.items = [];
    }

    fetchItems() {
        return new Promise((resolve, reject) => {
            sendRequest('/products.json')
                .then(
                    (items) => {
                        this.items = items.map(item => new CartItem(item.title, item.price, item.img));
                        resolve();
                    },
                    (txt) => {
                        reject(txt);
                    }
                );
        });
    }

    clearCart() {
        this.items = [];
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    render() {
        if (this.items.length > 0) {
            return this.items.map(item => item.render()).join('');
        } else {
            return `Список пуст =(`;
        }
    }

    calculate() {
        return new Promise((resolve, reject) => {
            let cost = 0;
            for (let item of this.items) {
                cost += item.price * item.count;
            }
            resolve(cost);
        });
    }

    removeItem(item) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].title === item.title && this.items[i].price === item.price) {
                    this.items.splice(i,1);
                    resolve();
                }
            }
        });
    }

    addItem(item) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].title === item.title && this.items[i].price === item.price) {
                    this.items[i].count++;
                    resolve();
                }
            }
            this.items.push(new CartItem(item.title, item.price, item.img));
            resolve();
        })
    };
}

function sendRequest(url) {
    return new Promise((resolve, reject) => {
        let rqst = new XMLHttpRequest();
        rqst.open('GET', url);
        rqst.send();
        rqst.onreadystatechange = () => {
            if (rqst.readyState === XMLHttpRequest.DONE) {
                resolve(JSON.parse(rqst.responseText));
            }
        };
        rqst.onerror = () => {
            reject('Ошибка сети');
        };
    });
}

const cart = new CartList();
cart.fetchItems()
    .then(
        () => {
            document
                .querySelector(
                    '.items-container'
                ).innerHTML = cart.render();
        }

        ,
        (txt) => {
            document.querySelector('.items-container').innerHTML = `${txt}`;
        }
    ).then(
    () => {
        cart.calculate().then(
            (cost) => {
                document.querySelector('.grand-total-price').innerHTML = `Итого: 
            <span class="pink" style="margin-left:30px;margin-right: 30px;">
            \$${cost}</span>`;
            }
        )
    }
);



