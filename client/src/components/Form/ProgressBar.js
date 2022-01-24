import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_PROGRESS } from '../../actions/actions'
import { motion } from 'framer-motion'

const ProgressBar = () => {
    const dispatch = useDispatch()
    const progress = useSelector( state => state.progress )

    useEffect(() => {
        if(progress == 100) {
            setTimeout(()=>{
                dispatch({type: SET_PROGRESS, payload: 0})
            },1000)
        }
    }, [progress])

    return (
        progress ? (
            <div className="progress w-100 mt-3">
                <motion.div 
                    className="progress-bar" 
                    role="progressbar" 
                    aria-valuenow={progress} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                    initial={{ width: 0 }}
                    animate={{ width: progress+'%' }}
                >
                </motion.div>
            </div>
        ) : null
    )
}

export default ProgressBar