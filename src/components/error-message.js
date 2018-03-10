import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { dismissError } from '../modules/error-message-reducer'

class ErrorMessage extends React.Component {
  render() {
    if (this.props.showError) {
      return(
        <div>
          <p>{ this.props.message }</p>
          <button onClick={ this.props.dismissError }>X</button>
        </div>
      )
    }
    return(<div></div>)
  }
}

const mapStateToProps = state => ({
  message: state.errorMessage.message,
  showError: state.errorMessage.showError
})

const mapDispatchToProps = dispatch => bindActionCreators({
  dismissError
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (ErrorMessage)
