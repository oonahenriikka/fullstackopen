import React from 'react';

const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }

    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    const style = type === 'error' ? errorStyle : successStyle;

    return (
      <div style={style}>
        {message}
      </div>
    )
  }


  export default Notification;