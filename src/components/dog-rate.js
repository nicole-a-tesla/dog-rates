import React from 'react'

const style = {
  container:{
    width: '200px',
    height: '250px',
    border: '1px solid black',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '3fr 1fr',
    gridRowGap:'10px',
    boxSizing: 'border-box',
    padding : '10px',
    margin: '20px'

  },
  image:{
    gridColumn: ' 1 / span 3',
    gridRow: '1',
    width: '100%',
    height: '100%'
  },
  span:{
    alignSelf: 'center'
  },
  deleteButton: {
    gridColumn: '1 / span 3'
  }
}

export default (props) => {
  return(
    <div style={style.container} className='dog-rate'>
      <img style={style.image} src={ props.imageSource } />
        <button onClick={ props.onMinus }>-</button>
        <span style={style.span} className='score'>
          { props.currentScore }
        </span>
        <button onClick={ props.onPlus }>+</button>
        <button style={style.deleteButton} onClick={ props.onDelete }> 🚫 </button>
    </div>
  )
}
