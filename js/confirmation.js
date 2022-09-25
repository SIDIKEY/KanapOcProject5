response = JSON.parse(localStorage.getItem("commandes"));

const orderDisplay = async () => {
    if (response){
        await response;
        console.log("almost done");

        document.getElementById("orderId").innerHTML = response.map((commande) =>`
        ${commande.order}
        `)
        console.log("COMMANDE SUCESS");
    }        
}

orderDisplay();
localStorage.clear();