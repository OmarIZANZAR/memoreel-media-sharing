import React from 'react';
import { Link } from 'react-router-dom';

const FormControls = ({clear}) => {
    return (
        <div className="form-controls p-3 w-100 my-2 d-flex align-items-center justify-content-between" >

            <Link to="/">
                <button
                    type="button"
                    className="btn btn-warning font-weight-bolder"
                    onClick={clear}
                >
                    Cancel
                </button>
            </Link>

            <div>
                <button 
                    type="button" 
                    className="btn btn-outline-danger font-weight-bolder"
                    onClick={clear}
                    >
                    Clear
                </button>
                <button 
                    type="submit" 
                    className="btn btn-outline-success ml-1 font-weight-bolder">
                    Submit
                </button>
            </div>

        </div>
    )
}

export default FormControls
