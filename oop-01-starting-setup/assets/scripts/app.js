class Component {

    constructor(renderHookId, shouldRender = true) {
        this.hookId = renderHookId;
        if (shouldRender) {
            this.render();
        }
    }

    render(){

    }

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);

        if (cssClasses) {
            rootElement.className = cssClasses;
        }

        if (attributes && attributes.length > 0) {
            for (const attr of attributes) {
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);

        return rootElement;
    }
}

class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}

class ShoppingCart extends Component {
    items = [];

    constructor(hookId) {
        super(hookId);
    }

    get totalAmount(){
        return this.items.reduce((previousValue, currentValue) =>
        previousValue + currentValue.price, 0)
    }

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    render() {
        const cartEl = this.createRootElement('section', 'cart')
        cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
        `;

        const orderButton = cartEl.querySelector('button');
        // orderButton.addEventListener('click', this.orderProducts.bind(this));
        // orderButton.addEventListener('click', this.orderProductsField);
        orderButton.addEventListener('click', () => this.orderProducts());
        this.totalOutput = cartEl.querySelector('h2');

        return cartEl
    }

    orderProducts() {
        console.log('Ordering...');
        console.log(this.items);
    }

    orderProductsField = () => {
        console.log('Ordering...');
        console.log(this.items);
    }
}

class Shop extends Component{
    constructor(hookId) {
        super(hookId);
    }
    render() {
        this.cart = new ShoppingCart(this.hookId);

        const productList = new ProductList(this.hookId);
        productList.add(new Product('A Pillow', '', 'A soft pillow', 99));
        productList.add(new Product('A Carpet', '', 'A nice carpet', 199));

        productList.render();
    }
}


class Product {
    title = 'DEFAULT';
    imageUrl = '';
    description = '';
    price;

    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
}

class ProductList extends Component{
    #products = [];

    constructor(hookId) {
        super(hookId, false);
        this.render();
    }

    add(product) {
        this.#products.push(product)
    }

    render() {
        if (!this.#products || this.#products.length <= 0) {
            return;
        }

        const idValue = 'productList';
        const attributes = [{
            name: "id",
            value: idValue
        }];
        const prodList = this.createRootElement('ul', 'product-list', attributes);

        for (const prod of this.#products) {
            const productItem = new ProductItem(prod, idValue);
            const prodEl = productItem.render();

            prodList.append(prodEl);
        }

        return prodList;
    }

}

class ProductItem extends Component{
    constructor(product, hookId) {
        super(hookId);
        this.product = product;
    }

    render() {
        if (!this.product || this.product.length <= 0) {
            return;
        }

        const prodEl = this.createRootElement('li', 'product-item');
        prodEl.innerHTML = `
        <div>
            <img src="${this.product.imageUrl}" alt="${this.product.title}" />
            <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <button id="this.product.title">Add to Card</button>
        </div>
        </div>
        `;

        const addCardButton = prodEl.querySelector('button');
        addCardButton.addEventListener('click', this.addToCard.bind(this))

        return prodEl;
    }

    addToCard() {
        App.addProductToCart(this.product);
    }
}

class App {
    static cart;
    static hookId = 'app';

    static constructor(hookId) {
        this.hookId = hookId;
    }
    
    static init() {
        const shop = new Shop(App.hookId);
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init('app');

