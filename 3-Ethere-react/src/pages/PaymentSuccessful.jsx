import { Link } from "react-router-dom";

const PaymentSuccessful =()=>
{
  return<>
  <p>Payment successful</p>
  <Link to={"/profile"}><button type="button" class="btn btn-info">Info</button></Link>
  </> 

}

export default PaymentSuccessful;