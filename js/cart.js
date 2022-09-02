let articles = document.getElementById("cart__items");
let filterCart = []
let cartPrice = document.getElementById("totalQuantity");
let listCanapeAjouterAuPanier = JSON.parse(localStorage.getItem("promise"));
console.log(listCanapeAjouterAuPanier);
listCanapeAjouterAuPanier.map(x => console.log(x))

const cartDisplay = async () => {
    // console.log("test");
    if(listCanapeAjouterAuPanier) {
        await listCanapeAjouterAuPanier;
        // console.log('listCanapeAjouterAuPanier : ',listCanapeAjouterAuPanier);

        articles.innerHTML = listCanapeAjouterAuPanier.map((canape) => `
        <article class="cart__item" data-id="${canape.id}" data-color="${canape.info.listColor}">
           <div class="cart__item__img">
                <img src="${canape.imageUrl}" alt="${canape.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${canape.name}</h2>
                    <p>${canape.description}</p>
                    <p>${canape.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canape.info.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem"'${canape.id}','${canape.color}'>Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
        <p>Total (<span id="totalQuantity">${canape.quantity }</span> articles) : <span id="totalPrice">${canape.quantity * canape.price}</span> €</p>
        `)
        .join("");
        deleteArticle();
        
      }
      
       
    };
    
  
cartDisplay();


  // console.log(button);

  const deleteArticle = async (cartDisplay) => {
    await cartDisplay;
    // console.log("DELETE");
    let trashBins = document.querySelectorAll('.cart__item__content__settings__delete');
    console.log(trashBins);

    trashBins.forEach((trashBin) => {
      trashBin.addEventListener('click', (e) => {
        e.preventDefault();
        // console.log(trashBin)
        let totalArticlesRemove = listCanapeAjouterAuPanier.length;
        // console.log(totalArticlesRemove)
        
        if (totalArticlesRemove == 1) {
          return localStorage.removeItem("promise");
          // console.log("REMOVED");
        }else {
          filterCart = listCanapeAjouterAuPanier.filter(el => {
            if(trashBin.id != el.id || trashBin.color != el.listColor){
              return localStorage.removeItem("promise")
          } 

          });
          // console.log(filterCart);
          localStorage.setItem("promise", JSON.stringify(filterCart));
          // console.log("REMOVED THIS PRODUCT");
        }


      })
    })
  }
   
   





      let order = document.getElementById('order');
      // console.log(order);
      let form = document.querySelectorAll('.cart__order__form')
      // console.log(form)

      order.addEventListener('click', (e) => {
        e.preventDefault();
          
            // console.log("click");

      
      
          let FirstName = document.getElementById("firstName").value;
          //  console.log(FirstName)
        
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
       
      

       

       
      
    

  