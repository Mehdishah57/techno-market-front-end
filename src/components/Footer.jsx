import React from 'react'

const Footer = () => {
  return (
    <div style={styles.main}>
        Techno Market Place ©All rights reserved
    </div>
  )
}

const styles = {
    main: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'black',
        color: 'gray',
        padding: 10,
        fontWeight: 'bold',
        fontSize: 12
    }
}

export default Footer