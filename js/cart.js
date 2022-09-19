let articles = document.getElementById("cart__items");
let commandeProducts = JSON.parse(localStorage.getItem("commandes"));
let filterCart = []
let cartPrice = document.getElementById("totalQuantity");
let listCanapeAjouterAuPanier = JSON.parse(localStorage.getItem("promise"));
let total = 0;
// console.log(listCanapeAjouterAuPanier);
// listCanapeAjouterAuPanier.map(canape => console.log(canape))

const cartDisplay = async () => {
    // console.log("test");
    if(listCanapeAjouterAuPanier) {
        await listCanapeAjouterAuPanier;
        // console.log('listCanapeAjouterAuPanier : ',listCanapeAjouterAuPanier);

        listCanapeAjouterAuPanier.map((canape) =>{
          // console.log(canape);
          // console.log(canape.info.length);
          let numberColor = canape.info.length;
          articles.innerHTML += canape.info.map(x => {
            // console.log(canape);
            
            let article = 
             `
              <article class="cart__item" data-id="${canape.idCanap}" data-color="${x.colorCanape}">
                <div class="cart__item__img">
                      <img src="${canape.imageUrl}" alt="${canape.altTxt}">
                  </div>
                  <div class="cart__item__content">
                      <div class="cart__item__content__description">
                          <h2>${canape.name}</h2>
                          <p>${x.colorCanape}</p>
                          <p>${canape.price} €</p>
                      </div>
                      <div class="cart__item__content__settings">
                          <div class="cart__item__content__settings__quantity">
                              <p>Qté : </p>
                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${x.quantity
                              }">
                          </div>
                          <div class="cart__item__content__settings__delete">
                              <p class="deleteItem"'${canape.idCanap}','${x.colorCanape}'>Supprimer</p>
                          </div>
                      </div>
                  </div>
              </article>
              
            `; 

            total = total + 1;
            
            return article;

          })
          .join("");

        })
          //  let total = document.querySelectorAll(".cart__item")
           console.log(total);
        deleteArticle();
        
      }
      
       
    };
    
  
cartDisplay();


  // console.log(button);

  const deleteArticle = async (cartDisplay) => {
    await cartDisplay;
    // console.log("DELETE");
    let trashBins = document.querySelectorAll('.cart__item__content__settings__delete');
    //  console.log(trashBins);

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
          
          filterCart = listCanapeAjouterAuPanier.filter(kanap => trashBin.id == kanap.id);
          console.log("else")

          
          localStorage.setItem("promise", JSON.stringify(filterCart));
          // console.log("REMOVED THIS PRODUCT");
        }


      })
    })
  }
   
   





     

      
      
          const FirstName = document.getElementById("firstName");
        // console.log(FirstName)
        
          const LastName = document.getElementById("lastName");
          
          const Address = document.getElementById("address");
        
          const City = document.getElementById("city");
         
          const Email = document.getElementById("email");

          let FirstNameValue, LastNameValue, AdressValue, CityValue, EmailValue;
          let regexFirstName = /^[a-z ,.'-]+$/i;
          let regexName = /^[a-z ,.'-]+$/i;
          let errorFirstName = document.getElementById("firstNameErrorMsg");
          let errorLastName = document.getElementById("lastNameErrorMsg");
          let regexAddress = /^[a-zA-Z0-9\s,'-]*$/;
          let errorAddress = document.getElementById("addressErrorMsg");
          let regexCity = /^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/;
          let errorCity = document.getElementById("cityErrorMsg");
          let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          let errorEmail = document.getElementById("emailErrorMsg");





          FirstName.addEventListener("input", function (e) {
            FirstNameValue;
            FirstNameValue = FirstName.value;
            console.log(FirstNameValue);
            
           
            if (regexFirstName.test(FirstName.value) == false && FirstName.value.length > 0) {
              errorFirstName.innerHTML = "First name is not valid";
              FirstNameValue = FirstName.value;
              
            } else if (FirstName.value.length == 0) {
              console.log("champ de saisie vide");
              errorFirstName.innerHTML = "please enter your first name";
              
            }
            
            else {
              errorFirstName.innerHTML = "";
            } 
          })

          LastName.addEventListener("input", function (e) {
            LastNameValue;
            LastNameValue = LastName.value;
            console.log(FirstNameValue);
            
           
            if (regexName.test(LastName.value) == false && LastName.value.length > 0) {
              errorLastName.innerHTML = "last name is not valid";
              LastNameValue = LastName.value;
              
            } else if (LastName.value.length == 0) {
              console.log("champ de saisie vide");
              errorLastName.innerHTML = "please enter your last name";
              
            }
            
            else {
              errorLastName.innerHTML = "";
            } 
          })

          Address.addEventListener("input", function (e) {
            AdressValue;
            AdressValue = Address.value;
            console.log(AdressValue);
            
           
            if (regexAddress.test(Address.value) == false && Address.value.length > 0) {
              errorAddress.innerHTML = "adress is not valid";
              AdressValue = Address.value;
              
            } else if (Address.value.length == 0) {
              console.log("champ de saisie vide");
              errorAddress.innerHTML = "please enter your adress";
              
            }
            
            else {
              errorAddress.innerHTML = "";
            } 
          })

          City.addEventListener("input", function (e) {
            CityValue;
            cityValue = City.value;
            console.log(CityValue);
            
           
            if (regexCity.test(City.value) == false && City.value.length > 0) {
              errorCity.innerHTML = "city is not valid";
              CityValue = City.value;
              
            } else if (City.value.length == 0) {
              console.log("champ de saisie vide");
              errorCity.innerHTML = "please enter your city";
              
            }
            
            else {
              errorCity.innerHTML = "";
            } 
          })

          Email.addEventListener("input", function (e) {
            EmailValue;
            EmailValue = Email.value;
            console.log(EmailValue);
            
           
            if (regexEmail.test(Email.value) == false && Email.value.length > 0) {
              errorEmail.innerHTML = "email is not valid";
              EmailValue = Email.value;
              
            } else if (Email.value.length == 0) {
              console.log("champ de saisie vide");
              errorEmail.innerHTML = "please enter your email";
              
            }
            
            else {
              errorEmail.innerHTML = "";
            } 
          })
               
let order = document.getElementById('order');


order.addEventListener('click', (e) => {
  e.preventDefault();
 
if (CityValue && AdressValue && LastNameValue && FirstNameValue && EmailValue) {
  console.log("send the the order");

  const commandes = JSON.parse(localStorage.getItem("promise"));
  let commandeId = [];
  console.log(commandes);
  console.log(commandeId);

  commandes.forEach((commande) => {
    commandeId.push(commande.idCanap);
  });
  console.log(commandeId);

  const data = {
    contact:{
      FirstName : FirstNameValue,
      LastName : LastNameValue,
      Address : AdressValue,
      City : CityValue,
      Email : EmailValue,
    },
    products : commandeId
  }
  console.log(data);


  //////////////////////////////// fetch post ////////////////////////


fetch("http://localhost:3000/api/products/order", {
  method: "POST",
  headers: {"content-Type":"application/json"},
  body:JSON.stringify(data),

}).then((res) => res.json())
  .then((promise) =>{
    let responseFetch = promise
    console.log(responseFetch);
  });

  const dataCommande = {
    contact : data.contact,
    order : data.products,
  };
  if (commandeProducts == null){
    console.log("commande NULL");
    commandeProducts = [];
    commandeProducts.push(dataCommande);
    localStorage.setItem("commandes",JSON.stringify(commandeProducts));
    console.log("SUCESS");

  }
  location.href = "confirmation.html";
  
}else {
  alert("Veuillez remplir le formulaire correctement")
}

});    
console.log(commandeProducts);      
          
          
          
       
      

       

       
      
    

  