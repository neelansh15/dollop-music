import Link from 'next/link'

function Navbar(){
    return(
        <div className="py-5 px-15 w-full flex justify-between items-center bg-dark-500">
            <h1>Dollop Music</h1>
            <ul className="list-none flex space-x-4 items-center text-sm">
                <Link href="/"><li className="cursor-pointer">Dashboard</li></Link>
                <Link href="/search"><li className="cursor-pointer">Search</li></Link>
                <Link href="/profile"><li className="cursor-pointer">Profile</li></Link>
            </ul>
        </div>
    )
}


export default Navbar
