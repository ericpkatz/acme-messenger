import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Messages = props => {
  const {messages, users} = props

  return (
    <div>
      <form className='messageForm'>
        <select>
          {
            users.map( user => {
              return (
                <option>{ user.username }</option>
              );
            })
          }
        </select>
        <textarea></textarea>
        <button>Send Message</button>
      </form>
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
    messages: state.messages,
    users: state.users
  }
}

export default connect(mapState)(Messages)
