import React, {useContext} from 'react';
import alertContext from '../context/alertContext';


const Alert = () => {
    const context = useContext(alertContext);
    const { Alert } = context;
    // console.log(Alert)
    return (
    Alert && <div className={`py-2 bg-${Alert.typeBg} w-full mx-auto`}>
            <div className={`text-${Alert.typeText} ml-5`}>
                <strong>{Alert.status?"✔ Success":"⚠ Warning" }</strong> : {Alert.msg}
            </div>
            <div className='bg-green-300 text-green-600 hidden'>
                <div className='bg-red-300 text-red-600 hidden'></div>
            </div>
        </div>
    )
}

export default Alert