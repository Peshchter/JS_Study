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
    
    fetchItems(){
        this.items = [
            {title: 'Shirt', price: 150, count: 2, img: 'f1.jpg'},
            {title: 'Socks', price: 50 , count: 2, img: 'f2.jpg'},
            {title: 'Jacket',price: 350, count: 2, img: 'f3.jpg'},
            {title: 'Shoes', price: 250, count: 2, img: 'f4.jpg'},
        ];
        this.items = this.items.map(item => new CartItem(item.title, item.price, item.img));   
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

const cart = new CartList();
cart.fetchItems();
document.querySelector('.items-container').innerHTML = cart.render();
document.querySelector('.grand-total-price').innerHTML = `Итого: <span class="pink" style=" margin-left: 30px; margin-right: 30px;">\$${cart.calculate()}</span> `;

