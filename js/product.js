const str = window.location;
const url = new URL(str);
const id = url.searchParams.get("id");
const host = "http://localhost:3000/api/products";
const objectURL = host + "api/products/" + id;

const fetchProduct =async () => {
    await fetch(`http://localhost:3000/api/products/${id}`)
    .then ((res) => res.json())
    .then ((promise) => {console.log(promise);})
}
fetchProduct();