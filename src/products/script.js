document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsElement = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let cartTotal = 0;
  
    addToCartButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
        const productName = productElement.querySelector('h3').textContent;
        const productPrice = parseFloat(productElement.querySelector('.price').textContent.slice(2));
        const productImageSrc = productElement.querySelector('img').src;
  
        const cartItemElement = document.createElement('li');
        cartItemElement.innerHTML = `
          <img src="${productImageSrc}" alt="${productName}">
          <div>
            <p>${productName}</p>
            <p>R$ ${productPrice.toFixed(2)}</p>
          </div>
          <button class="remove-from-cart">Remover</button>
        `;
  
        const removeButton = cartItemElement.querySelector('.remove-from-cart');
        removeButton.addEventListener('click', () => {
          cartItemElement.remove();
          cartTotal -= productPrice;
          cartTotalElement.textContent = cartTotal.toFixed(2);
        });
  
        cartItemsElement.appendChild(cartItemElement);
        cartTotal += productPrice;
        cartTotalElement.textContent = cartTotal.toFixed(2);
      });
    });
  });
  