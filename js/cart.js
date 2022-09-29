

// Déclaration de variable objet ajouté
let commandeProducts = JSON.parse(localStorage.getItem("commandes"));
let shoppingCartLocalStorage = JSON.parse(localStorage.getItem("promise"));
console.log(shoppingCartLocalStorage);

// Fonction pour récupérer les produits du LocalStorage
async function getProduct() {
    // on créé un tableau pour constituer le panier complet
    let panierComplet = [];
    let shoppingCartLocalStorage = JSON.parse(localStorage.getItem("promise"));
    // la boucle attend que le fetch soit fini pour chaque tour de boucle
    for (i = 0; i < shoppingCartLocalStorage.length; i++) {
        await fetch(
                "http://localhost:3000/api/products/" + shoppingCartLocalStorage[i].idCanap
            )
            .then(function(res) {
                return res.json();
            })
            .then((products) => {

                // on créé un objet comporant les propriétés et les valeurs nécessaires pour consituer le panier
                const obj = {
                    _id: products._id,
                    name: products.name,
                    price: products.price,
                    color: shoppingCartLocalStorage[i].color,
                    quantity: shoppingCartLocalStorage[i].quantity,
                    alt: products.altTxt,
                    img: products.imageUrl,
                };
                // on pousse l'objet dans le tableau créé
                panierComplet.push(obj);
                 console.log(panierComplet); //
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    return panierComplet;
}

async function init() {
    let panierComplet = await getProduct();
    createHTMLBasket(panierComplet);
    

    AddEventRemoveProduct();

    AddEventChangeQuantity();

    calculTotalQuantity();
    calculTotalPrice();
}

// Fonction pour créer le HTML du panier dans lequel sont insérés les propriétés du tableau "Panier Complet"
function createHTMLBasket(panierComplet) {
    const shoppingItem = document.getElementById(`cart__items`);

    console.log("complet", panierComplet);

    panierComplet.map((product) => {

      let productArticle = document.createElement("article");
      document.getElementById(`cart__items`).appendChild(productArticle);
      productArticle.className = "cart__item";
      productArticle.setAttribute('data-id', product._id);
      productArticle.setAttribute('data-color', product.color);
    
      // Création div
      let productDivImg = document.createElement("div");
      productArticle.appendChild(productDivImg);
      productDivImg.className = "cart__item__img";
    
      // Insertion image
      let productImg = document.createElement("img");
      productDivImg.appendChild(productImg);
      productImg.src = product.img;
      productImg.alt = product.altTxt;
      console.log(product.altTxt);
      // Création div 
      let productItemContent = document.createElement("div");
      productArticle.appendChild(productItemContent);
      productItemContent.className = "cart__item__content";
    
      // Création d'un élément enfant "div" pour nom/couleur/prix
      let productItemContentTitlePrice = document.createElement("div");
      productItemContent.appendChild(productItemContentTitlePrice);
      productItemContentTitlePrice.className = "cart__item__content__titlePrice";
    // Affichage du nom du produit
      let productTitle = document.createElement("h2");
      productItemContentTitlePrice.appendChild(productTitle);
      productTitle.innerHTML = product.name;
    
      // Affichage du choix de la couleur du produit
      let productColor = document.createElement("p");
      productTitle.appendChild(productColor);
      productColor.innerHTML = product.color;
      productColor.style.fontSize = "18px";
    
      // Affichage du prix du produit
      let productPrice = document.createElement("p");
      productItemContentTitlePrice.appendChild(productPrice);
      let price = product.price * product.quantity;
      productPrice.innerHTML = price + " €";
      console.log("ici", price);

      // Création élément enfant pour quantité/suppression
      let productItemContentSettings = document.createElement("div");
      productItemContent.appendChild(productItemContentSettings);
      productItemContentSettings.className = "cart__item__content__settings";
  
      // Création élément enfant pour la quantité
      let productItemContentSettingsQuantity = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsQuantity);
      productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
  
      // Affichage de la quantité choisie
      let productQte = document.createElement("p");
      productItemContentSettingsQuantity.appendChild(productQte);
      productQte.innerHTML = "Qté : ";
  
      // Création des options pour le choix de la quantité affichée
      let productQuantity = document.createElement("input");
      productItemContentSettingsQuantity.appendChild(productQuantity);
      productQuantity.value = product.quantity;
      productQuantity.className = "itemQuantity";
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");
  
      // Création d'une "div" pour la possibilité de suppression
      let productItemContentSettingsDelete = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsDelete);
      productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
  
      // Céation de l'élément de suppression d'un produit
      let productSupprimer = document.createElement("p");
      productItemContentSettingsDelete.appendChild(productSupprimer);
      productSupprimer.className = "deleteItem";
      productSupprimer.innerHTML = "Supprimer";
  
      /*
      //declaration tableau pour prix total
      //totalOrder = [];
  
      //Calcul prix total
      totalOrder.push(price);
      let sumOrder = 0;
      for (let i = 0; i < totalOrder.length; i++) {
        sumOrder += totalOrder[i];
      }
      totalPrice.innerHTML = sumOrder.toString(); 
      */
  
  
      shoppingItem.appendChild(productArticle);
      return price;

      

     
    });
};





// Fonction pour supprimer un produit dans le panier
function AddEventRemoveProduct() {
    let deleteItemContainer = [...document.getElementsByClassName("deleteItem")];

    deleteItemContainer.forEach((item, index) => {
        item.addEventListener("click", () => {
            // Dans le DOM
            let pickArticle = deleteItemContainer[index].closest(".cart__item");
            pickArticle.remove();
            // Dans le local storage
            shoppingCartLocalStorage.splice(index, 1);
            localStorage.setItem(
                "promise",
                JSON.stringify(shoppingCartLocalStorage)
            );
            calculTotalQuantity();
            calculTotalPrice();
        });
    });
}

// Fonction pour modifier la quantité d'un produit dans le panier
function AddEventChangeQuantity() {
    const quantityInput = document.querySelectorAll(".itemQuantity");
    quantityInput.forEach((quantityProduct) => {
        quantityProduct.addEventListener("change", (e) => {
            changeQuantity(e);
        });
    });
}

function changeQuantity(e) {
    // On récupère l'input le plus proche de l'élément cliqué
    const quantityElement = e.target.closest("input.itemQuantity").value; //cibler l'input pour le changement de quantité
    console.log("quantitée de input", quantityElement);

    if (quantityElement != null) {
        // On récupère les id et color du produit pour aller le chercher dans le LS
        const productId = e.target
            .closest("article.cart__item")
            .getAttribute("data-id");
        const productColor = e.target
            .closest("article.cart__item")
            .getAttribute("data-color");

        //on vas chercher le contenu du LS
        let cart = JSON.parse(localStorage.getItem("promise"));

        // On recherche le produit correspondant
        let foundProduct = cart.findIndex(
            (p) => p.idCanap == productId && p.color == productColor
        );
        console.log("Recherche du produit, index :", foundProduct);
        console.log(cart);
        console.log(productId);

        // Si on le trouve et que la quantité est inférieur ou égale à 100 et suppérieur ou égale à 1, on modifie le panier LS
        if (
            foundProduct != -1 &&
            quantityElement <= 100 &&
            quantityElement >= 1
        ) {
            //ajouter la nouvelle quantité au LS
            cart[foundProduct].quantity = quantityElement;

            console.log("Futur LS ajusté", cart);
            // On repush le LS tout neuf
            localStorage.setItem("promise", JSON.stringify(cart));

            calculTotalQuantity();
            calculTotalPrice();
        }
    }
}


// Fonction pour calculer le nombre de produit total dans le panier
function calculTotalQuantity() {
  let shoppingCartLocalStorage = JSON.parse(localStorage.getItem("promise"));
  let number = 0;
  for (let j = 0; j < shoppingCartLocalStorage.length; j++) {
      let quantityLoop = parseInt(shoppingCartLocalStorage[j].quantity);
      number += quantityLoop;
  }
  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerText = number;
}

// Fonction pour calculer le prix total du panier
async function calculTotalPrice() {
  const shoppingItem = await getProduct();
  let totalPrice = 0;
  for (let product of shoppingItem) {
      totalPrice += product.quantity * product.price;
  }

  console.log("total", totalPrice);
  let totalPriceCart = document.getElementById("totalPrice");
  totalPriceCart.innerText = totalPrice;
}


// Initialisation des fonctions
init();

const FirstName = document.getElementById("firstName");
// console.log(FirstName)

const LastName = document.getElementById("lastName");

const Address = document.getElementById("address");

const City = document.getElementById("city");

const Email = document.getElementById("email");

let FirstNameValue, LastNameValue, AdressValue, CityValue, EmailValue;
let regexFirstName = /^[a-zA-Z]*$/i;
let regexName = /^[a-zA-Z]*$/i;
let errorFirstName = document.getElementById("firstNameErrorMsg");
let errorLastName = document.getElementById("lastNameErrorMsg");
let regexAddress = /^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/;
let errorAddress = document.getElementById("addressErrorMsg");
let regexCity =
  /^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/;
let errorCity = document.getElementById("cityErrorMsg");
let regexEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let errorEmail = document.getElementById("emailErrorMsg");

FirstName.addEventListener("input", function (e) {
  FirstNameValue;
  FirstNameValue = FirstName.value;
  console.log(FirstNameValue);

  if (
    regexFirstName.test(FirstName.value) == false &&
    FirstName.value.length > 0
  ) {
    errorFirstName.innerHTML = "First name is not valid";
    FirstNameValue = FirstName.value;
  } else if (FirstName.value.length == 0) {
    console.log("champ de saisie vide");
    errorFirstName.innerHTML = "please enter your first name";
  } else {
    errorFirstName.innerHTML = "";
  }
});

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
  } else {
    errorLastName.innerHTML = "";
  }
});

Address.addEventListener("input", function (e) {
  AdressValue;
  AdressValue = Address.value;
  console.log(AdressValue);

  if (regexAddress.test(Address.value) == false && Address.value.length > 0) {
    errorAddress.innerHTML = "adress is not valid";
    AdressValue = Address.value;
  } else if (Address.value.length == 0 || Address.value == null) {
    console.log("champ de saisie vide");
    errorAddress.innerHTML = "please enter your adress";
  } else {
    errorAddress.innerHTML = "";
  }
});

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
  } else {
    errorCity.innerHTML = "";
  }
});

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
  } else {
    errorEmail.innerHTML = "";
  }
});




let order = document.getElementById('order');


order.addEventListener('click', (e) => {
  e.preventDefault();
 
if (CityValue && AdressValue && LastNameValue && FirstNameValue && EmailValue) {
  console.log("send the order");

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
      firstName : FirstNameValue,
      lastName : LastNameValue,
      address : AdressValue,
      city : CityValue,
      email : EmailValue,
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
  

  const dataCommande = {
    contact : responseFetch.contact,
    order : responseFetch.orderId,
  };
  if (commandeProducts == null){
    console.log("commande NULL");
    commandeProducts = [];
    commandeProducts.push(dataCommande);
    localStorage.setItem("commandes",JSON.stringify(commandeProducts));
    console.log("SUCESS");

  }
  
});
location.href = "confirmation.html";
  
}else {
  alert("Veuillez remplir le formulaire correctement")
}

});    
console.log(commandeProducts);      
          
          
          
       
      

       

       
      
    

  