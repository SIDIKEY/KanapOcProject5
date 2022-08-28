

const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const host = "http://localhost:3000/";
const objectURL = host + "api/products/" + id;
let tabColors = [];

let productData = [];

const fetchProduct =async () => {
    await fetch(objectURL)
    .then ((res) => res.json())
    .then ((result) => {productData = result
    // console.log(productData);
   })   
};

const productDisplay = async () =>{
    await fetchProduct();
    document.querySelector(".item__img").innerHTML = `
    <img src="${productData.imageUrl}" alt="${productData.altTxt}">
    `;
    document.getElementById("title").innerHTML = `
    ${productData.name}
    `;
    document.getElementById("price").innerHTML = `
    ${productData.price}
    `;
    document.getElementById("description").innerHTML = `
    ${productData.description}
    `;
    
    let color = document.getElementById("colors");
    // console.log(color);
     console.log(productData.colors);

    for (i = 0; i < productData.colors.length; i++) {
        color.innerHTML += `<option value="${productData.colors[i]}">${productData.colors[i]}</option>`;
      };
    // console.log(productData.colors.length);
    add2Cart();
};
productDisplay();

const add2Cart = () => {
  
  let button = document.getElementById("addToCart");
  // console.log(button);
  button.addEventListener("click", () => {
    let color = document.getElementById("colors").value;
    let quantityCanap = document.getElementById("quantity").value;

    // console.log('la valeur de select', color.value);
    // console.log('la valeur de quantityCanap', quantityCanap.value);

    if (!quantityCanap || !color) {
      // console.log('quantityCanap value egal false');
      document.getElementById("error").innerHTML = `<span>veuillez choisir une une quantite entre 1 et 100 !<span> </br> 
      <span>veuillez choisir une couleur !<span>` ;
      return
    }else{
      let productAdded = JSON.parse(localStorage.getItem("promise"));
      console.log('valeur productadded  : ', productAdded);
      if (!productAdded) {
        
        productAdded = [];
        // console.log('id : ', id);
        // console.log('color : ', [color]);
        // console.log('quantitycanap : ', [quantityCanap]);
        
        // console.log('color : ',  typeof color);
        console.log(productData);
        productAdded.push({
          idCanap : id,
          listColor:[ color],
          quantity: [quantityCanap],
          name: productData.name,
          description: productData.description,
          price: productData.price,
          imageUrl: productData.imageUrl
  
        });
        // console.log(productAdded);
        localStorage.setItem("promise", JSON.stringify(productAdded));
       console.log('local storage crée');

  
      }
      
      else if(productAdded) {
        console.log('local storage existe déjà');
        productAdded.push({
          idCanap : id,
          listColor:[color],
          quantity: [quantityCanap],
          name: productData.name,
          description: productData.description,
          price: productData.price,
          imageUrl: productData.imageUrl
        })
        localStorage.setItem('promise', JSON.stringify(productAdded));
        
        
    
        
        
        
          
        
      

       
        
          
      

      }
     
    }


    
  }
);
  return (productAdded = JSON.parse(localStorage.getItem("promise")));

}



  // var bonjour;
  // bonjour = 'sa';

  // bonjour = bonjour + 'lut';



  // // bonjour = 'lut';

  // console.log(bonjour);





 