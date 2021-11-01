let productsInCart = JSON.parse(localStorage.getItem('ShoppingCart'));
//checks if the products in a cart is null
if (!productsInCart){
    productsInCart = [];
}
const parentElement = document.querySelector("#buyItems");
const cartSumPrice = document.querySelector("#sum-prices");
const products = document.querySelectorAll('.product-under');

// count sum price of all products in the cart
const countTheSumPrice = function(){
    let sumPrice = 0;
    productsInCart.forEach(product => {
        sumPrice += product.price;
    })
    return sumPrice;
}

// generate html code for each product and add code to parent element
const updateShoppingCartHTML = function(){
    localStorage.setItem('ShoppingCart', JSON.stringify(productsInCart));                                    //item remains in the cart when page is reloaded
    if (productsInCart.length > 0 ){
      let result = productsInCart.map(product => {
            return `
            <li class="buyItem">
            <img src="${product.image}">
            <div>
                <h5>${product.name}</h5>
                <h6>${product.price}</h6>
                <div>
                    <button class="button-minus" data-id='${product.id}'>-</button>
                    <span class="countOfProduct">${product.count}</span>
                    <button class="button-plus" data-id='${product.id}'>+</button>
                </div>
            </div>
        </li>
            `
        })
        parentElement.innerHTML = result.join('');
        document.querySelector('.checkout').classList.remove('hidden');
        cartSumPrice.innerHTML = "$" + countTheSumPrice();

    }
    else{ //remove checkout button if cart is empty
        document.querySelector('.checkout').classList.add('hidden')
        parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>'
        cartSumPrice.innerHTML = "";

    }
}

//loop through products to check if product exist and update price
function updateProductsInCart (product) {
    for( let i = 0; i < productsInCart.length; i++) {
        if( productsInCart[i].id == product.id ){
            productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
            return;

        }
    }
    productsInCart.push(product);
}

// add event listener to all products
products.forEach(products => {
    products.addEventListener('click', (e) => {
        if(e.target.classList.contains('addToCart')){
            const productID = e.target.dataset.productId;
            const productName = products.querySelector('.productName').innerHTML;
            const productPrice = products.querySelector('.priceValue').innerHTML;
            const productImage = products.querySelector('img').src;
            let productToCart = {
                name: productName,
                image: productImage,
                id: productID,
                count: 1,
                price: +productPrice,
                basePrice: +productPrice //will be changed each time count is changed
            }
            updateProductsInCart(productToCart);
            updateShoppingCartHTML();
 
        }
    })
})

//add event listener functionality
parentElement.addEventListener('click', (e) => {
    //return true if element has class name
    const isPlusButton = e.target.classList.contains('button-plus');
    const isMinusButton = e.target.classList.contains('button-minus');
    //update count & price of product in cart
    if (isPlusButton || isMinusButton){
        for (let i = 0; i < productsInCart.length; i++){
            if(productsInCart[i].id === e.target.dataset.id){
                if(isPlusButton){
                    productsInCart[i].count += 1;
                }
                else if(isMinusButton){
                    productsInCart[i].count -=1;
                }
                productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
                }
                //check if count is 0 & remove from cart
                if (productsInCart[i].count <= 0){
                    productsInCart.splice(i,1);
                }
                }
                updateShoppingCartHTML();

            }
        })

        updateShoppingCartHTML();