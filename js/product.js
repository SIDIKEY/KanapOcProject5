const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const host = "http://localhost:3000/";
const objectURL = host + "api/products/" + id;
let button = document.getElementById("addToCart");
let kanapChosen = {};
let canapLocalStorage = {};
let productAdded;




const fetchProduct =async () => {
    await fetch(objectURL)
    .then ((res) => res.json())
    .then ((result) => {kanapChosen = result
    console.log(kanapChosen);
   })   
};

const productDisplay = async () =>{
    await fetchProduct();
    //image
  let itemImg = document.querySelector(".item__img");
  let productImg = document.createElement("img");
  itemImg.appendChild(productImg);
  productImg.src = kanapChosen.imageUrl;
  productImg.alt = kanapChosen.altText;
   
   //nom
  let productTitle = document.getElementById("title");
  productTitle.innerHTML = kanapChosen.name; 

  //prix
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = kanapChosen.price;

  //description
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = kanapChosen.description;

  //choix couleur
  let color = document.getElementById("colors");
  kanapChosen.colors.map(couleur =>color.innerHTML += `<option value="${couleur}">${couleur}</option>`);
};

productDisplay();

  button.addEventListener("click", () => {
    let formulaireError = 0;
    const errorColor = document.getElementById("error-couleur");
    const errorQuantity = document.getElementById("error-quantite");
    errorColor.textContent= '';
    errorQuantity.textContent = '';
    let color = document.getElementById("colors").value;
    let quantityCanap = document.getElementById("quantity").value;


    if (!color) {
      formulaireError = 1 ;
      errorColor.textContent = `Veuillez choisir une couleur !`;
    }
   
    if (!quantityCanap || quantityCanap <= "0" || quantityCanap >= 101) {
      formulaireError = 1 ;
      errorQuantity.textContent = `Veuillez choisir une une quantite entre 1 et 100 ! `;
    }

    if(formulaireError === 0 ){
      quantityCanap = parseInt(quantityCanap);
      productAdded = JSON.parse(localStorage.getItem("promise"));
       console.log('productAdded ', productAdded);
      if (!productAdded){ 
        productAdded = [];
        canapLocalStorage.idCanap = id;
        canapLocalStorage.quantity = quantityCanap;
        canapLocalStorage.color = color;
        

        productAdded.push(canapLocalStorage);
        alert("article added to cart")
       
      }
      else if(productAdded) {
        const listIdLocalStorage = productAdded.findIndex(canape => canape.idCanap == id && canape.color == color);

        if(listIdLocalStorage != -1){
          productAdded[listIdLocalStorage].quantity  = parseInt( productAdded[listIdLocalStorage].quantity) + quantityCanap;
          alert("this article's quantity in the cart has been updated")
        }else{
          canapLocalStorage.idCanap = id;
          canapLocalStorage.quantity = quantityCanap;
          canapLocalStorage.color = color;
          productAdded.push(canapLocalStorage);
          alert("article added to cart")
        }

      }
      localStorage.setItem("promise", JSON.stringify(productAdded));
     
    } 
  }
);






 