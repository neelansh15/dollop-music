function Navbar(){
    return(
        <div className="py-5 px-15 w-full flex justify-between items-center bg-dark-500">
            <h1>Dollop Music</h1>
            <ul className="list-none flex space-x-4 items-center text-sm">
                <li>Dashboard</li>
                <li>Search</li>
                <li>Profile</li>
            </ul>
        </div>
    )
}


export default Navbar
