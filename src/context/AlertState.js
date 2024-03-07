import alertContext from "./alertContext.js";
import {useState} from "react";

const AlertState = (props) =>{
    const [Alert, setAlert] = useState(null);
  const showAlert = (status=true, message, typeBg, typeText) => {
    setAlert({
      status: status,
      msg: message,
      typeBg : typeBg,
      typeText: typeText
    })
    setTimeout(() => {
        setAlert(null);
    }, 4500);
  }
    return (
        <alertContext.Provider value={{Alert, showAlert}}>
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState