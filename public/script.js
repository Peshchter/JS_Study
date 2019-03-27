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
    
    fetchItems(callback){
        this.items = [];
        sendRequest('/products.json', (items) => {
            this.items = items.map(item => new CartItem(item.title, item.price, item.img));
            callback();
        });
    }
    
    render(){
        return  this.items.map(item => item.render()).join('');
    }
    
    calculate(){
        let cost = 0;
        for (let item of this.items){
            cost += item.price * item.count;
        }
        return cost;
    }
}

function sendRequest(url, callback) {
    let rqst = new XMLHttpRequest();
    rqst.open('GET', url);
    rqst.send();
    rqst.onreadystatechange = () => {
        if (rqst.readyState === XMLHttpRequest.DONE) {
            callback(JSON.parse(rqst.responseText));
        }
    };
}

const cart = new CartList();
cart.fetchItems(() => {
    document.querySelector('.items-container').innerHTML = cart.render();
});
document.querySelector('.grand-total-price').innerHTML = `Итого: <span class="pink" style=" margin-left: 30px; margin-right: 30px;">\$${cart.calculate()}</span> `;

