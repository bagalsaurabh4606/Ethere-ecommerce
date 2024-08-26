const AdminLogOutConfirm=({handleLogout , setlogOutForm})=>{
  return( <div className="modal123">
  <div className="modal-content123">
    
    <h2>Are you sure you want to log out?</h2>
    <div className="buttonsss">
      <button
        id="confirmLogout"
        className="btnn"
        onClick={handleLogout}
      >
        Logout
      </button>
      <button
        id="cancelLogout"
        className="btnn"
        onClick={() => setlogOutForm(false)}
      >
        Cancel
      </button>
    </div>
  </div>
</div>)
}

export default AdminLogOutConfirm;