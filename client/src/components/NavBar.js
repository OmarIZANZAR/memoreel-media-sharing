import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import memoreel from '../images/memoreel.png'
import {motion} from 'framer-motion'

const NavBar = () => {
    const { pathname } = useLocation()
    const [state,setState] = useState(false)

    useEffect(()=>{
        setState( pathname === "/" ? true : false )
    }, [pathname])

    return (
        <>
            <nav className="navbar navbar-dark mb-3 px-5 pt-4 align-items-center">
                <Link 
                    className={`navbar-brand h1 m-0 p-0 d-flex align-items-center`}
                    to="/" 
                > 
                    <img
                        className="d-inline-block mr-2" 
                        width="90"
                        height="54"
                        src={memoreel}
                        alt="memoreel logo" 
                        loading="lazy" 
                    />
                    MEMOREEL
                </Link>

                <Link to={ state ? "/form" :"/" }>
                    <motion.button 
                        layout
                        transition={{ duration: 0.3 }}
                        type="button"
                        className={`btn nav-butn font-weight-bolder`}
                    >
                        { state ? "Share your best moment" : "Cancel" }
                    </motion.button>
                </Link>

            </nav>
        </>
    )
}

// ${state ? 'txt-white': 'txt-black'}

export default NavBar
