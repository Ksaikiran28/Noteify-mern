import React from 'react'
import { Link } from 'react-router'
import { PlusIcon, UserIcon, LogOut } from 'lucide-react'
const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
        <div className='mx-auto max-w-6xl p-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>Noteify</h1>
                <div className='flex items-center gap-4'>
                    <Link to={"/create"} className='btn btn-primary'>
                        <PlusIcon className="size-5" />
                        <span>New Note</span>
                    </Link>
                    <Link to={"/login"} className='btn btn-primary'>
                        <UserIcon className='size-5'/>
                        <span>
                            Login
                        </span>
                    </Link>
                    <Link to={"/logout"} className='btn btn-primary'>
                        <LogOut className='size-5'/>
                        <span>
                            Logout
                        </span>
                    </Link>
                </div>
            </div>
        </div>

    </header>
  )
}

export default Navbar