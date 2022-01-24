import React from 'react'
import { motion } from 'framer-motion'

const Loader = () => {
    return (
        <motion.div 
            drag
            layout
            dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
            dragMomentum={true}
            dragElastic={1}
            className="loader"
            animate={{ rotateZ: 360, transition: {
                repeat: Infinity,
                duration: 4
            } }}
        >
        </motion.div>
    )
}

export default Loader
