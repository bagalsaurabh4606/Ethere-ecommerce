import { Link } from "react-router-dom";

const WishlistMessage=()=>{
  return <div className="empty-cart">
  <div className="card-content">
    <h2>Add you're favourite item here</h2>
  <img
          className="empty-whislist-image"
          src="images/forWhislist"
          alt="Myntra Home"
        />
    <Link to="/" className="empty-button-container" style={{ color: 'inherit', textDecoration: 'none' }}>
      <button type="button" className="btn btn-outline-info">
       Add items to favourite
      </button>
    </Link>
  </div>
  </div>
}
export default WishlistMessage;