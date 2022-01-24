import React from 'react'
import { motion } from 'framer-motion'

import Welcome from './Welcome'
import Posts from './Posts'

const homeVariants = {
    hidden: {
        opacity: 0,
        x: '-100vw',
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            duration: 1,
        }
    },
    exit: {
        x: '-100vw',
        transition: { 
            duration: 0.5,
        }
    }
}

const Home = () => {
    return (
        <motion.div
            className="home"
            variants={homeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Welcome />
            <Posts />
        </motion.div>
    )
}

export default Home
