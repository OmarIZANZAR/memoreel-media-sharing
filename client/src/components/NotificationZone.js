import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import NotificationCard from './NotificationCard'

const NotificationZone = () => {
    const notes = useSelector( state => state.notes )

    return (
        notes.length > 0 ? (
            <motion.div layout className="notificationsZone">
                {notes.map( (note, index) => (
                        <NotificationCard notification={note} key={index} />
                ))}
            </motion.div>  
        ): null
    )
}

export default NotificationZone
