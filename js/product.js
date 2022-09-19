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
    // console.log(kanapChosen);
   })   
};

const productDisplay = async () =>{
    await fetchProduct();
    document.querySelector(".item__img").innerHTML = `
    <img src="${kanapChosen.imageUrl}" alt="${kanapChosen.altTxt}">
    `;
    document.getElementById("title").innerHTML = `
    ${kanapChosen.name}
    `;
    document.getElementById("price").innerHTML = `
    ${kanapChosen.price}
    `;
    document.getElementById("description").innerHTML = `
    ${kanapChosen.description}
    `;
    
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
   
    if (!quantityCanap || quantityCanap === "0") {
      formulaireError = 1 ;
      errorQuantity.textContent = `Veuillez choisir une une quantite entre 1 et 100 ! `;
    }

  if(formulaireError === 0 ){
     productAdded = JSON.parse(localStorage.getItem("promise"));
      // console.log('productAdded ', productAdded);
      if (!productAdded){ 
        productAdded = [];
        canapLocalStorage.idCanap = id,
        canapLocalStorage.name = kanapChosen.name,
        canapLocalStorage.imageUrl = kanapChosen.imageUrl,
        canapLocalStorage.description = kanapChosen.description,
        canapLocalStorage.price = kanapChosen.price,
        canapLocalStorage.info = [
          {
            colorCanape: color,
            quantity: quantityCanap,
          }
        ]

        productAdded.push(canapLocalStorage);
        localStorage.setItem("promise", JSON.stringify(productAdded));
      }
      else if(productAdded) {
        const listIdLocalStorage = productAdded.map(canape => canape.idCanap);


        // ici je regarde dans le d

        if(listIdLocalStorage.includes(id)){
          const CanapeWithGoodId = productAdded.map(canape => {
            let tabColors =  canape.info.map(info => info.colorCanape);
            // console.log('tabColors ',tabColors);
            if(id === canape.idCanap){

              // console.log('color ',color);

              if(!tabColors.includes(color)){
                // console.log('couleur absent dans le tableau');

                canape.info.push({
                  colorCanape: color,
                  quantity:  quantityCanap,
                })
                return canape;
              }
              else{
                // console.log('couleur present dans le tableau');

                canape.info.map(article =>{ 
                  let quantityFinale;
                  // tabColors.push(article.colorCanape)
                  if(color === article.colorCanape){
                    quantityFinale =  Number(article.quantity) + Number(quantityCanap)
                    article.quantity = quantityFinale;
                    
                    return article;
                  }
                  
                })
              }
                // console.log('tab couleur ', tabColors);


            }
            return canape;
          })
          localStorage.setItem("promise", JSON.stringify(CanapeWithGoodId));
        }else{
          canapLocalStorage.idCanap = id,
          canapLocalStorage.name = kanapChosen.name,
          canapLocalStorage.imageUrl = kanapChosen.imageUrl,
          canapLocalStorage.description = kanapChosen.description,
          canapLocalStorage.price = kanapChosen.price,
          canapLocalStorage.info = [
            {
              colorCanape: color,
              quantity: quantityCanap,
            }
          ]
  
          productAdded.push(canapLocalStorage);
          localStorage.setItem("promise", JSON.stringify(productAdded));

        }
      }
     
    } 
  }
);






 