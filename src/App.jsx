import React, { useState } from 'react'
import Confetti from "react-confetti"
import Card from './Card'
import img1 from "./assets/1.png"
import img2 from "./assets/2.png"
import img3 from "./assets/3.png"
import img4 from "./assets/4.png"
import img5 from "./assets/5.png"
import img6 from "./assets/6.png"
import img7 from "./assets/7.png"
import img8 from "./assets/8.png"
import img9 from "./assets/9.png"
import img10 from "./assets/10.png"
import img11 from "./assets/11.png"
import img12 from "./assets/12.png"

function App() {
  const iconArr = [img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12];
  const [cards, setCards] = useState(genCardIds())
  const [selectedCard, setSelectedCard] = useState(null)
  const [selectedCard2, setSelectedCard2] = useState(null)
  const [swapping,setSwapping]=useState(false)
  const [pairTries,setPairTries]= useState(0)
  const [wins,setWins]=useState(parseInt(localStorage.getItem("wins"))||0)
  const [won,setWon]=useState(false)


  React.useEffect(()=>{
    let anyVisible=false
    cards.forEach((card)=>{
      if(card.there){
        anyVisible=true
      }
    })
    if(!anyVisible){
      setWon(true)
      setWins(prevWins=>prevWins+1)
    }
  },[cards])
  React.useEffect(()=>{
    localStorage.setItem("wins",wins)
  },[wins])
  React.useEffect(()=>{
    console.log("swapping")
  },[swapping])

  function genStartArray(amount) {
    let res = []
    for (let i = 1; i <= amount/2; i++) {
      res.push(i)
      res.push(i)
    }
    return res
  }
  function genCardIds() {
    let startArray = genStartArray(24)
    // console.log(startArray)
    let res = []
    for (let i = 0; i < 24; i++) {
      let ranItemInArray = startArray[Math.floor(Math.random() * startArray.length)]
      res.push({
        id: i,
        iconNum: ranItemInArray,
        there: true
      })
      startArray = removeFirst(startArray, ranItemInArray)
    }
    // console.log(res)
    return res;
  }
  function removeFirst(src, element) {
    const index = src.indexOf(element);
    if (index === -1) return src;
    return [...src.slice(0, index), ...src.slice(index + 1)];
  }
  function handleTwoSelect(card1, card2) {
    if (card1.iconNum === card2.iconNum && swapping==false) {
      setSwapping(true)
      setTimeout(() => {
        //*This will set the cards to not display after 1 sec
        ()=>setSwapping(false)
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.iconNum === card1.iconNum) {
              setSelectedCard(null)
              return { ...card, there: false }
            } else {
              setSelectedCard(null)
              return { ...card }
            }
          })
        })
      }, 1000)
      //*This should display both the cards for 1 sec before the timeout kicks in
      setSelectedCard2(card1)
    } else {
      setTimeout(() => {
        setSelectedCard(null)
        setSelectedCard2(null)
      }, 1000)
      setSelectedCard2(card1)
    }
    setPairTries(prevPairTries=>prevPairTries+1)
  }
  function handleReset(){
    setCards(genCardIds())
    setSelectedCard(null)
    setSelectedCard2(null)
    setPairTries(null)
    setWon(false)
  }

  const cardElements = cards.map((card) => {
    // console.log(iconArr[card.iconNum - 1])
    return (<Card
      key={card.id}
      iconNum={card}
      iconShown={card.id == selectedCard?.id || card.id == selectedCard2?.id}
      iconUrl={iconArr[card.iconNum - 1]}
      selected={selectedCard}
      select={() => setSelectedCard(card)}
      isThere={card.there}
      handleTwoSelect={(card2) => handleTwoSelect(card, card2)}
      swapping={swapping}
    />)
  })

  return (
    <>
      <div className='tiptop'>
        <h1 className='app--title'>
          Cards Match
        </h1>
        <div className='app--tries scoreThingy'>
          Tries: 
          <br></br>
          {pairTries}
        </div>
        <div className='app--wins scoreThingy'>
          Wins: 
          <br></br>
          {wins}
        </div>
      </div>
      <div className='app--desc'>Click a card to reveal the symbol which it holds. After
        you have selected two both the cards will flip back over if their symbols are matching,
        if they are they will dissapear. Your goal is to make those cards dissapear in the short amount of tries.
        <br></br>
        Good luck!
      </div>
      
      <div className='cards'>
        {cardElements}
        {won && <Confetti/>}
      </div>
      {won && <button onClick={handleReset} className="resetButton">Play again</button>}
    </>
  )
}

export default App
