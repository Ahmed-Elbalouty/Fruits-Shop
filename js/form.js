// Start Form
let productImageUrl = document.querySelector("#url");
let productName = document.querySelector("#name");
let productDescription = document.querySelector("#desc");
let productPrice = document.querySelector("#price");

let addProduct = document.querySelector(".add-product");



if(addProduct !== null){
    addProduct.addEventListener("click", (e)=>{
        e.preventDefault();
        if(productImageUrl.value != "" && productName.value != "" && productDescription.value != "" && productPrice.value != ""){
            let arr = JSON.parse(localStorage.getItem("products")) || [];
            
            let checkIfProductExist = arr.some(el => el.name === productName.value);
            if(checkIfProductExist) {
                alert ("This Product Is Exsit");
            }else{
                let obj = {
                    url : productImageUrl.value,
                    name : productName.value,
                    desc : productDescription.value,
                    price : productPrice.value,
                }
                arr.push(obj);
        
                localStorage.setItem("products",JSON.stringify(arr));
            }
            productImageUrl.value = "";
            productName.value = "";
            productDescription.value = "";
            productPrice.value = "";
            window.location.href = "index.html";
            }else{
                alert("Please Enter Product Info");
            }
        });
}
// End Form



// Edit Product

let addEdit = document.querySelector(".edit-product");


(function (){
    if(localStorage.getItem("editProduct")){
        let editData = JSON.parse(localStorage.getItem("editProduct"));
        productImageUrl.value = editData.url;
        productName.value = editData.name;
        productDescription.value = editData.desc;
        productPrice.value = editData.price;
    }
})();


addEdit.addEventListener("click", function(e){
    e.preventDefault();
    let arr = JSON.parse(localStorage.getItem("products"));
    let indexOfEditProduct = arr.map((el,index)=>{
        if(el.name === productName.value){
            return index;
        }
    }).join("");

    let indexAsNumber = Number(indexOfEditProduct);
    let newProduct = {
        url : productImageUrl.value,
        name : productName.value,
        desc : productDescription.value,
        price : productPrice.value
    }
    
    arr[indexAsNumber] = newProduct;
    localStorage.setItem("products",JSON.stringify(arr));

    productImageUrl.value = "";
    productName.value = "";
    productDescription.value = "";
    productPrice.value = "";
    window.location.href = "index.html";
});