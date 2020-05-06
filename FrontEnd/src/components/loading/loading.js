import React from 'react'
import ReactLoading  from 'react-loading'
const Loading = () => (
    <div className= 'loading' >
        <p>Vos informations arrivent ... </p>
        <p>Veuillez patienter...</p>
            <ReactLoading
                type= 'spinningBubbles'
                color = '#FF7675'
            />
    </div>
)
export default Loading