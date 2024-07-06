// Start Navbar
let barsIcon = document.querySelector(".bars-icon");
let icon = document.querySelector(".bars-icon i");
let dropDown = document.querySelector(".dropdown-menu");


function barsIconClick (){
        dropDown.classList.toggle("animation");
    
        if(dropDown.classList.contains("animation")){
            icon.classList.replace("fa-bars", "fa-x");
        }else{
            icon.classList.replace("fa-x", "fa-bars")
        }
}
// End Navbar



// Get Data From Local Storage And Render It In HTML
let cards = document.querySelector(".cards");
let products = JSON.parse(localStorage.getItem("products"));


function createAllCards (){
    cards.innerHTML = "";
    products.map((product, index)=>{
        createCard(product.url, product.name, product.desc, product.price, index);
    });
}

function createCard (url, name, desc, price, index){
    cards.innerHTML += `
    <div class="card bg-[#18181A] rounded-lg overflow-hidden"> 
        <img src="${url}" class="max-h-[280px] w-full" alt="Banana Image">
        <div class="data p-4">
            <div class="flex justify-between items-center">
                <h3 class="text-2xl">${name}</h3>
                <span class="fav-icon text-2xl cursor-pointer" onclick ="addToFavorite(${index})"> <i class="fa-regular fa-heart text-[#DEC700]"></i> </span>
            </div>
            <p class="text-gray-400 pt-2 pb-4 text-sm">${desc}</p>
            <span class="font-bold text-lg">$ ${price}</span>
            <div class="flex justify-between pt-3 gap-5">
                <button class="bg-indigo-600 px-1 py-2 w-full text-lg rounded-md" onclick = "editProduct(${index})">Edit</button>
                <button class="bg-[#ff0000] px-1 py-2 w-full text-lg rounded-md" onclick = "removeProduct(${index})">Remove</button>
            </div>
        </div>
    </div>`
};
createAllCards();


// Add To Favorite 
let favIconSpan = document.querySelector(".fav-icon");
let favIcon = document.querySelector(".fav-icon i");
let favCards = document.querySelector(".fav-cards");

let favProducts;

if(localStorage.getItem("favProducts") == null){
    favProducts = [];
}
else{
    favProducts = JSON.parse(localStorage.getItem("favProducts"));
}


function addToFavorite (i){
    let checkIfProductExistInFavorite = favProducts.some(el => el.name === products[i].name);
    
    if(checkIfProductExistInFavorite) {
        alert("This Product Is In Favorite");
    }else{
        let favObj = {
            url : products[i].url,
            name : products[i].name,
            desc : products[i].desc,
            price : products[i].price,
        }
    
        favProducts.push(favObj);
        localStorage.setItem("favProducts", JSON.stringify(favProducts));

        createAllFavoriteCards ();
    }
}

function createAllFavoriteCards (){
    favCards.innerHTML = "";
    favProducts.forEach((el, index)=>{
        createFavoriteCard (el.url, el.name, el.desc, el.price, index);
    })
}


function createFavoriteCard (url, name, desc, price,index){
    let favCard = `
        <div class="fav-card bg-[#18181A] rounded-lg overflow-hidden"> 
        <img src="${url}" class="max-h-[280px] w-full" alt="Banana Image">
        <div class="data p-4">
            <div class="flex justify-between items-center">
                <h3 class="text-2xl">${name}</h3>
                <span class="fav-icon text-2xl cursor-pointer"> <i class="fa-solid fa-heart text-[red]"></i> </span>
            </div>
            <p class="text-gray-400 pt-2 pb-4 text-sm">${desc}</p>
            <span class="font-bold text-lg">$ ${price}</span>
            <div class="remove flex justify-center pt-5">
                <button class="bg-[#ff0000] px-3 py-2 text-lg rounded-md" onclick = "removeFromFavorite(${index})">Remove</button>
            </div>     
        </div>
    </div>`;

    favCards.innerHTML += favCard;
}
createAllFavoriteCards();


// Remove Product From Shoop And Favorite
function removeProduct (i){
    let checkIfProductExistInFavorite = favProducts.some(el => el.name === products[i].name);
    if(checkIfProductExistInFavorite){
        let indexOfCard = favProducts.map((el, index)=>{
            if(el.name === products[i].name){
                return index;
            }else{
                return;
            }
        }).join("");
        favProducts.splice(Number(indexOfCard), 1);
        localStorage.setItem("favProducts", JSON.stringify(favProducts));
        createAllFavoriteCards();
    }
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    createAllCards();
}


// Remove Products From Favorite
function removeFromFavorite (i){
    favProducts.splice(i, 1);
    localStorage.setItem("favProducts", JSON.stringify(favProducts));
    createAllFavoriteCards();
}



// Edit Product 
function editProduct (i){
    localStorage.setItem("editProduct", JSON.stringify(products[i]));
    window.location.href = "form.html";
}