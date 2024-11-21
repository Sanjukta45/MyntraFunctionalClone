let bagItems;
let wishItems;
onLoad();

function displayItemsOnHomePage() {
    const itemsContainer = document.querySelector('.items-container');
    let innerHTML = ``;

    if(!itemsContainer){
        return;
    }

    items.forEach(item => {
        innerHTML += `
            <div class="item-container">
                <img class="item-image" src="${item.item_image}" alt="image">
                <div class="rating">
                    ${item.ratings.stars}⭐ | ${item.ratings.review}k
                </div>
                <div class="company-name">${item.company_name}</div>
                <div class="item-name">${item.item_name}</div>
                <div class="price">
                    <span class="current-price">Rs.${item.price.current_price}</span>
                    <span class="original-price">Rs.${item.price.original_price}</span>
                    <span class="discount">(${item.price.discount}% off)</span>
                </div>
                <div>
                <button class="add-bag" onclick="addToBag(${item.id});">Add to Bag</button>
                <button class="wishlist" onclick="wishlist(${item.id});">❤️</button>
                </div>
            </div>`;
    });

    itemsContainer.innerHTML = innerHTML;
}

function addToBag(itemId) {
    bagItems.push(itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    updateBagItemCount();
}

function updateBagItemCount() {
    const count = document.querySelector('.item-count');
    if (bagItems.length > 0) {
        count.style.visibility = 'visible';
        count.innerText = bagItems.length;
    } else {
        count.style.visibility = 'hidden';
    }
}

function onLoad() {
    let bagItemStr = localStorage.getItem('bagItems');
    let wishItemStr = localStorage.getItem('wishlistItems');
    bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];
    wishItems = wishItemStr ? JSON.parse(wishItemStr) : [];
    displayItemsOnHomePage();
    updateBagItemCount();
    updateWishlistCount();
}


function wishlist(itemId){
   wishItems.push(itemId);
   localStorage.setItem('wishlistItems', JSON.stringify(wishItems));
   updateWishlistCount();
}

function updateWishlistCount(){
    const countWish = document.querySelector('.wish-count');
    if (wishItems.length > 0) {
        countWish.style.visibility = 'visible';
        countWish.innerText = wishItems.length;
    } else {
        countWish.style.visibility = 'hidden';
    }
}