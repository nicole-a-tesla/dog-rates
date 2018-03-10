import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { decrementScore, incrementScore } from '../modules/dog-rate-reducer'
import DogRate from './dog-rate'

class DogRateContainer extends React.Component {
  render() {
    return(
      <div>
        <DogRate 
          onPlus={ this.props.incrementScore }
          onMinus={ this.props.decrementScore }
          currentScore={ this.props.currentScore } 
          imgSrc={ this.props.imgSrc } />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentScore: state.dogRate.currentScore,
  imgSrc: state.dogRate.imgSrc,
  message: state.dogRate.message
})

const mapDispatchToProps = dispatch => bindActionCreators({
  incrementScore,
  decrementScore
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (DogRateContainer)
