import { Link } from "react-router-dom";


const Message=()=>{

  return   <div className="empty-cart">
  <div className="card-content">
  <h2>Your Bag is empty !</h2>
  <img
          className="empty-cart-image"
          src="images/emptycartimage.png"
          alt="Myntra Home"
        />
    <Link to="/" className="empty-button-container" style={{ color: 'inherit', textDecoration: 'none' }}>
      <button type="button" class="btn btn-outline-info">
       Shop Now
      </button>
    </Link>
  </div>
  </div>
// </div>
 
}

export default Message;
{/* <div className="Message">
<p>Bag is Empty</p>
<button type="button" class="btn btn-outline-info">Info</button>
</div> */}

// card-body