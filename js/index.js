let cardData=[];
const fetchCards = async () => {
    await fetch("http://localhost:3000/api/products")
    .then ((res) => res.json())
    .then ((promise) => {cardData = promise
    console.log(cardData); })
    
    
}

const cardDisplay = async () =>{
    await fetchCards();
    document.getElementById("items").innerHTML = cardData.map((promise) =>`
    <a href="./product.html?id=${promise._id}">
      <article>
        <img
          src="${promise.imageUrl}"
          alt="image de kanap ${promise.altTxt}"
        />
        <h3 class="productName">${promise.name}</h3>
        <p class="productDescription">
          ${promise.description}
        </p>
      </article>
    </a>

    `).join("");
}
cardDisplay();