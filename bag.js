let bagItemObjects = [];
onload();


function onload(){
    loadBagItemsObjects();
    displayBagItems();
    loadTotalPrice();
}

function displayBagItems(){
    let bagItemsContainer = document.querySelector('.bag-items-container');
    let innerHtml = ``;
    bagItemObjects.forEach(item =>{
       innerHtml += generateItemHtml(item);
    })
    
    bagItemsContainer.innerHTML = innerHtml;  
    
}

    


function loadBagItemsObjects(){
    
  bagItemObjects = bagItems.map(itemId => {
      for(let i=0; i<items.length; i++){
        if(itemId == items[i].id){
          return items[i];
        }
      }
    })

    console.log(bagItemObjects);
}

function generateItemHtml(item){
   return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="${item.item_image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company_name}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">${item.price.current_price}</span>
                <span class="original-price">${item.price.original_price}</span>
                <span class="discount-percentage">(${item.price.discount}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">14 days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">10 Oct 2023</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeItem(${item.id});">X</div>
          </div>`;
}

function loadTotalPrice(){
   let total = 0;
   let totalDiscount = 0;
   let discount = 0;
   let totalAmount = 99;

   bagItemObjects.forEach(item => {
     total += item.price.original_price;
     discount = item.price.original_price - item.price.current_price;
     totalDiscount += discount;
     totalAmount += item.price.current_price;
   })

   

   let bagSummary = document.querySelector('.bag-summary');
   if(bagItems.length > 0){
       bagSummary.innerHTML = `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${bagItems.length} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs${total}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${totalAmount}</span>
            </div>
          </div>
          <button class="btn-place-order"">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
}
else{
  bagSummary.innerHTML = ``;
}

}

function removeItem(itemId){
   bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
   localStorage.setItem('bagItems', JSON.stringify(bagItems));
   loadBagItemsObjects();
   displayBagItems();
   if(bagItems.length > 0){
    loadTotalPrice();
   }
   updateBagItemCount();
}