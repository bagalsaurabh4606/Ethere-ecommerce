const CONVENIENCE_FEES=99;
const BagSummary=({FinalItems})=>{


console.log("finla item in bag summury",FinalItems)
  let totalItem = FinalItems.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let curruntprice=0;
  FinalItems.forEach(bagItem => {
    totalMRP += bagItem.originalPrice;
    curruntprice+=(bagItem.originalPrice)-(bagItem.originalPrice/100)*(bagItem.discountPercentage)
    console.log("cuuurnt price",curruntprice)
    totalDiscount += totalMRP - curruntprice;
    console.log("total discount",totalDiscount)
    
  });


  let finalPayment = curruntprice + CONVENIENCE_FEES;
  

return (
<>

<div className="bag-details-container">
    <div className="price-header">PRICE DETAILS ({totalItem} Items) </div>
    <div className="price-item">
      <span className="price-item-tag">Total MRP</span>
      <span className="price-item-value">₹{Math.round(totalMRP)}</span>
    </div>
    <div className="price-item">
      <span className="price-item-tag">Discount on MRP</span>
      <span className="price-item-value priceDetail-base-discount">-₹{Math.round(totalDiscount)}</span>
    </div>
    <div className="price-item">
      <span className="price-item-tag">Convenience Fee</span>
      <span className="price-item-value">₹99</span>
    </div>
    <hr/>
    <div className="price-footer">
      <span className="price-item-tag">Total Amount</span>
      <span className="price-item-value">{Math.round(finalPayment)}</span>
    </div>
  </div>
  <button className="btn-place-order">
    <div className="css-xjhrni">PLACE ORDER</div>
  </button>
 
</>
  
);
}

export default BagSummary;