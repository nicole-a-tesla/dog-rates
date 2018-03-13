import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { decrementScore, incrementScore, addDog, deleteDog } from '../modules/dog-rate-reducer'
import DogRate from './dog-rate'

const style = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr)',
    width: '100%',
    height: '100%'
  }
}

class DogRateContainer extends React.Component {
  renderDog(dog) {
    const currentImage = dog.imgSrc ? dog.imgSrc : 'https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'
    return(
      <DogRate 
        onPlus={ () =>  this.props.incrementScore(dog.id) }
        onMinus={ () => this.props.decrementScore(dog.id) }
        onDelete={ () => this.props.deleteDog(dog.id) }
        currentScore={ dog.currentScore } 
        imgSrc={ currentImage } />
    )
  }
    
  render() {
    return(
      <div style={ style.container }>
        { this.props.dogs.map(dog => this.renderDog(dog)) }
        <button onClick={ this.props.addDog }> ➕  🐕  </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  dogs: state.dogRate,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  incrementScore,
  decrementScore,
  addDog,
  deleteDog
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (DogRateContainer)
