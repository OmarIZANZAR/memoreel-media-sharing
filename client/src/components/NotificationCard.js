import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { removeNote } from '../actions/notes'

const cardVariant = {
    hidden: { 
        x: -1000, 
        opacity: 0 
    },
    visible: { 
        x: 0, 
        opacity: 1, 
        transition: {
             duration: 0.5
            } 
    },
    exit: { 
        x: -1000, 
        opacity: 0 
    }
}

const NotificationCard = ({notification}) => {
    const dispatch = useDispatch()
    
    useEffect(()=>{
        setTimeout(()=>{
            dispatch(removeNote(notification))
        },3000)
    }, [])

    const styler = (er) => ({
        backgroundColor: er ? "red" : "green",
    })

    return (
        <motion.div
            layout
            className="notification position-relative"
            style={styler(notification.isError)}
            variants={cardVariant}
            initial="hidden"
            animate="visible"
        >
            <button 
                className="notification-close-btn btn text-secondary m-0 p-0"
                onClick={() => dispatch(removeNote(notification))}
            >
                <i className="far fa-times-circle text-light"></i>
            </button>

            <div className="notification-icon">
                { notification.isError ? (
                    <i className="fas fa-exclamation-triangle"></i>
                ) : (
                    <i className="far fa-check-circle"></i>
                )}
            </div>

            <div className="notification-message">
                <p className="notification-message-text">
                    {notification.message}
                </p>
            </div>
        </motion.div>
    )
}

export default NotificationCard
