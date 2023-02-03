import React from 'react';

function Card({iconNum,iconShown,isThere,iconUrl,selected,select,handleTwoSelect,swapping}) {
    console.log(swapping)
    function handleClick(){
        if(!swapping){
            if(selected){
                handleTwoSelect(selected)
            }else{
                select(iconNum)
            }
        }
        
    }
    return (
        <>
            {isThere ? (<div className='card' onClick={handleClick}>
                {iconShown && <img className="iconShown" draggable={false} src={iconUrl}/>}
                {!iconShown && <img className="iconHidden" draggable={false} src={"https://www.pngkey.com/png/full/349-3492792_card-back.png"}/>}
            </div>):<div className='card'></div>
            }
        </>
        
    );
}

export default Card