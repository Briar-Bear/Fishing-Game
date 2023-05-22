// event listener for cast button
castBtn.addEventListener('click', () => {
    
  const cast = poorRod.cast()
    
    if (cast > 1) {
     biteTimer.start()
     console.log('You cast your line out ' + cast + 'm') 
     } else {
       console.log('Try again')
     }
  })
  
  // event listeners to reel in the fish
  reelBtn.addEventListener('mousedown', () => {
   
    console.log('reeling in!')
  })
  
  reelBtn.addEventListener('mouseup', () => {})
  