import React, { useRef, useState } from 'react'

const Mines = ({mine, bombShow, lose, setFlag, flag}) => {

    const [square, setSquare] = useState(mine)

    const btnRef = useRef()

    const Emoji = props => (
        <span
          className="emoji"
          role="img"
          aria-label={props.label ? props.label : ""}
          aria-hidden={props.label ? "false" : "true"}
        >
          {props.symbol}
        </span>
      )

    const handlePressBtn = (e) => {

        e.preventDefault()

        if(lose){
            return
        }

        if(e.button === 2 && square.swap){

            setFlag(flag + 1)

            setSquare({
                ...square,
                swap:false,
                press:true
            }) 
            return
        } else if(e.button === 2 ){

            
            if(flag === 0){
                return
            }

            setFlag(flag - 1)

            setSquare({
                ...square,
                swap:true,
                press:false
            }) 
            return
        }

        if(square.press === false){
            return
        }



       setSquare({
           ...square,
           open:true
       })   
       const mine = btnRef.current
       mine.className = "mines__deactivate"

       

       if(square.value !== null){
           switch(square.value){
               case 0: 
               mine.className = "mines__deactivate span__white"
               break;
               case 1: 
               mine.className = "mines__deactivate span__blue"
               break;
               case 2: 
               mine.className = "mines__deactivate span__green"
               break;
               case 3: 
               mine.className = "mines__deactivate span__red"
               break
               default: 
               break;
           }

       }

       if(square.bomb){
          mine.className = "mines__deactivate mines__bomb"  
          bombShow()
       }
        
    }


    return (
        <div>
            <button ref={btnRef} className="mines mines__active " onContextMenu={(e) => handlePressBtn(e)} onClick={(e) => handlePressBtn(e)}  >  { (square.bomb && square.open ) ? <Emoji symbol="💣" /> : (square.open && square.value !== null) ?  square.value : ((square.swap && !square.press) &&  <Emoji symbol="🚩" /> )}  </button>
        </div>
    )
}

export default Mines
