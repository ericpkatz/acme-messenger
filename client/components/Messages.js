import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Messages = props => {
  const {messages} = props

  return (
    <div>
      <ul>
        {
          messages.map( message => {
            console.log(message);
            return (
              <li key={ message.id } className='message'>
                <div>
                  <label>from:</label>
                  <div>
                    { message.from.username }
                  </div>
                </div>
                <div>
                  <label>to:</label>
                  <div>
                    { message.to.username }
                  </div>
                </div>
                <div className='text'>
                { message.text }
                </div>
              </li>
            );
          })
        }
      </ul>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    messages: state.messages
  }
}

export default connect(mapState)(Messages)
