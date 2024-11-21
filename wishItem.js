let wishObjects;
//onLoad();
onloadWish();

function onloadWish(){
   
    let bagStr = localStorage.getItem('bagItems');
    bagItems = bagStr ? JSON.parse(bagStr) : [];

    let wishStr = localStorage.getItem('wishlistItems');
    wishItems = wishStr ? JSON.parse(wishStr) : [];
    
    // updateBagItemCount();
    // updateWishlistCount();
    loadWishObjects();
    displayWishItems();
    
}

function generateHtml(item){
    return `<div class="item-container">
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
                <button style="width:100%;" class="add-bag" onclick="addToBag(${item.id});">Add to Bag</button>
                </div>
            </div>`;
}

function loadWishObjects(){
    
    wishObjects = wishItems.map(itemId => {
        for(let i=0; i<items.length; i++){
          if(itemId == items[i].id){
            return items[i];
          }
        }
      })
      console.log(wishObjects);
  }

  function displayWishItems(){
    let wishItemsContainer = document.querySelector('.display-wishlist');
    let innerHtml = ``;
    wishObjects.forEach(item =>{
       innerHtml += generateHtml(item);
    })
    
    wishItemsContainer.innerHTML = innerHtml;  
    
}