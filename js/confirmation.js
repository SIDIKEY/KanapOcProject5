const commandes = JSON.parse(localStorage.getItem("commandes"));

const orderDisplay = async () => {
    if (commandes){
        await commandes;
        document.getElementById("orderId").innerHTML = commandes.map((commande) =>`
        ${commande.order}
        `)
        console.log("COMMANDE SUCESS");
    }        

        
        
    

}

orderDisplay();
