let addedToCart = JSON.parse(localStorage.getItem("promise"));
console.log(addedToCart);

const cartDisplay = async () => {
    console.log("test");
    if(addedToCart) {
        await addedToCart;
        console.log(addedToCart);

        cart__items.innerHTML = addedToCart.map((promise) => `
        <article class="cart__item" data-id="${promise._id}" data-color="${promise.colors}">
           <div class="cart__item__img">
                <img src="${promise.imageUrl}" alt="Photographie d'un canapé ${promise.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${promise.name}</h2>
                    <p>${promise.colors}</p>
                    <p>${promise.price.toString().replace(/00/,"")} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
        `);
    }
}
cartDisplay();