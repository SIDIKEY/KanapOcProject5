const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const host = "http://localhost:3000/";
const objectURL = host + "api/products/" + id;
let tabColors = [];
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
    const errorColor = document.getElementById("error-couleur").textContent = ``;
    const errorQuantity = document.getElementById("error-quantite").textContent = ``;
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
      console.log('productAdded ', productAdded);
      console.log('valeur productadded  : ', productAdded);
      if (!productAdded) {
        
        
        productAdded = [];
    
        // console.log(kanapChosen);
        canapLocalStorage.idCanap = id,
        canapLocalStorage.name = kanapChosen.name,
        canapLocalStorage.imageUrl = kanapChosen.imageUrl,
        canapLocalStorage.description = kanapChosen.description,
        canapLocalStorage.price = kanapChosen.price,
        canapLocalStorage.info = {
          listColor:[ color],
          quantity: [quantityCanap],
        }

        productAdded.push(canapLocalStorage);
        localStorage.setItem("promise", JSON.stringify(productAdded));
       console.log('local storage crée');

  
      }
      
      else if(productAdded) {


        console.log('result : ', productAdded.filter(x => x.idCanap).includes(id));


        productAdded.map(canap => {
          console.log(canap.idCanap);
          if(id === canap.idCanap ){
           console.log('meme id ');
           // push seul ment info qui contient list color et quantity
          }
          else{
           console.log('id different');
            canapLocalStorage.idCanap = id,
            canapLocalStorage.name = kanapChosen.name,
            canapLocalStorage.imageUrl = kanapChosen.imageUrl,
            canapLocalStorage.description = kanapChosen.description,
            canapLocalStorage.price = kanapChosen.price,
            canapLocalStorage.info = {
            listColor:[ color],
            quantity: [quantityCanap],
        }
        productAdded.push(canapLocalStorage);
        localStorage.setItem("promise", JSON.stringify(productAdded));
          }
         
        })
        
        // productAdded.map(canape => console.log('idCanap ', canape.idCanap));

        // console.log('local storage existe déjà');
        // productAdded.push({
        //   idCanap : id,
        //   listColor:[color],
        //   quantity: [quantityCanap],
        //   name: kanapChosen.name,
        //   description: kanapChosen.description,
        //   price: kanapChosen.price,
        //   imageUrl: kanapChosen.imageUrl
        // })
        // localStorage.setItem('promise', JSON.stringify(productAdded));
        
        
    
        
        
        
          
        
      

       
        
          
      

      }
     
    }


    
  }
);





  // var bonjour;
  // bonjour = 'sa';

  // bonjour = bonjour + 'lut';



  // // bonjour = 'lut';

  // console.log(bonjour);





 