let articles = document.getElementById("cart__items");
let addedToCart = JSON.parse(localStorage.getItem("promise"));
console.log(addedToCart);

const cartDisplay = async () => {
    console.log("test");
    if(addedToCart) {
        await addedToCart;
        console.log(addedToCart);

        articles.innerHTML = addedToCart.map((promise) => `
        <article class="cart__item" data-id="${promise.id}" data-color="${promise.colors}">
           <div class="cart__item__img">
                <img src="${promise.imageUrl}" alt="${promise.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${promise.name}</h2>
                    <p>${promise.color}</p>
                    <p>${promise.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${promise.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
        `);
      
       
    };
    

}
cartDisplay();


  // console.log(button);


    const buttons = document.getElementsByClassName('deleteItem'); //recup tous les btn
    console.log(buttons);

   





      let order = document.getElementById('order');
      console.log(order);
      let form = document.querySelectorAll('.cart__order__form')
      console.log(form)

      order.addEventListener('click', (e) => {
        e.preventDefault();
           //va renvoyer true - false
            console.log("matrice");

      
      
          let FirstName = document.getElementById("firstName").value;
        
          let LastName = document.getElementById("lastName").value;
          
          let Address = document.getElementById("address").value;
        
          let City = document.getElementById("city").value;
         
          let Email = document.getElementById("email").value;
      
          let contact = {firstName: FirstName, lastName: LastName, address: Address, city: City, email: Email}
      
          let products = []
          let articles = JSON.parse(localStorage.getItem("promise"));
          
          
          for (let id in articles) {
            products.push(id)
            console.log(products);
          }
      
          fetch("http://localhost:3000/api/products/order", {
            method:"POST", 
            body:JSON.stringify({
              contact, products
            }),
            headers:{
              "Content-Type": "application/JSON"
            }
      
          }).then(response => response.json())
          .then(order => { 
            let orderId = order.orderId;
            window.location.href = 'confirmation.html?id=' + orderId;
      
          });
        
      });
       
      

       

       
      
    
    



  