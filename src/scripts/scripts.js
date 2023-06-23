function changeNavColour(){var e=document.getElementById("full-nav"),i=e.offsetTop;window.pageYOffset>i+30?e.classList.add("sticky"):e.classList.remove("sticky")}window.addEventListener("scroll",()=>{changeNavColour()});const scrollElements=document.querySelectorAll(".js-scroll"),elementInView=(e,i)=>{return e.getBoundingClientRect().top<=(window.innerHeight||document.documentElement.clientHeight)/i},elementOutofView=e=>{return e.getBoundingClientRect().top>(window.innerHeight||document.documentElement.clientHeight)},displayScrollElement=e=>{e.classList.add("scrolled")},hideScrollElement=e=>{e.classList.remove("scrolled")},handleScrollAnimation=()=>{scrollElements.forEach(e=>{elementInView(e,1.5)?displayScrollElement(e):elementOutofView(e)&&hideScrollElement(e)})};function validateForm(){var e=document.getElementById("form-name").value;let n=[e,document.getElementById("form-email").value,document.getElementById("form-message").value],t=!1,d=0;for(i=0;i<n.length;i++){if(""==n[i]){document.getElementById(`${i}`).style.color="red",document.getElementById(`${i}`).innerHTML="This field is mandatory";break}""!=n[i]&&(d++,document.getElementById(`${i}`).innerHTML=""),d==n.length&&(t=!0),t&&(hideForm(),showResponse(e))}}function hideForm(){document.getElementById("form").style.display="none"}function showResponse(e){window.innerWidth>991?document.getElementById("placeholder-text").style=" text-align: center; padding: 30px; margin: 5vh;":document.getElementById("placeholder-text").style=" text-align: center; padding: 30px; margin: 0;",document.getElementById("placeholder-name").style.textAlign="center",document.getElementById("placeholder-name").innerHTML=`Hi ${e}!`,document.getElementById("placeholder-text").innerHTML="Thank you for your message! <br> We will get in touch with you as soon as possible."}window.addEventListener("scroll",()=>{scrollElements.forEach(e=>{elementInView(e,1.5)?displayScrollElement(e):elementOutofView(e)&&hideScrollElement(e)})}),$(document).ready(function(){$("#espresso, #espresso2").click(function(){$("#espressoguide").show(),$("#v60guide").hide(),$("#aeropressguide").hide(),$("#frenchpressguide").hide(),$("#chemexguide").hide(),$("#mokapotguide").hide()}),$("#v60, #v602").click(function(){$("#espressoguide").hide(),$("#v60guide").show(),$("#aeropressguide").hide(),$("#frenchpressguide").hide(),$("#chemexguide").hide(),$("#mokapotguide").hide()}),$("#aeropress, #aeropress2").click(function(){$("#espressoguide").hide(),$("#v60guide").hide(),$("#aeropressguide").show(),$("#frenchpressguide").hide(),$("#chemexguide").hide(),$("#mokapotguide").hide()}),$("#frenchpress, #frenchpress2").click(function(){$("#espressoguide").hide(),$("#v60guide").hide(),$("#aeropressguide").hide(),$("#frenchpressguide").show(),$("#chemexguide").hide(),$("#mokapotguide").hide()}),$("#chemex,#chemex2").click(function(){$("#espressoguide").hide(),$("#v60guide").hide(),$("#aeropressguide").hide(),$("#frenchpressguide").hide(),$("#chemexguide").show(),$("#mokapotguide").hide()}),$("#mokapot, #mokapot2").click(function(){$("#espressoguide").hide(),$("#v60guide").hide(),$("#aeropressguide").hide(),$("#frenchpressguide").hide(),$("#chemexguide").hide(),$("#mokapotguide").show()})});
// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
    
    // Constructor
    function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }
    
    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    
  
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
    
    // Add to cart
    obj.addItemToCart = function(name, price, count) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();
  
  
  // *****************************************
  // Triggers / Events
  // ***************************************** 
  // Add item
  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });
  
  // Clear items
  $('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });
  
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>" 
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = " 
        + "<td>" + cartArray[i].total + "</td>" 
        +  "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }
  
  // Delete item button
  
  $('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  
  // -1
  $('.show-cart').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  displayCart();

  