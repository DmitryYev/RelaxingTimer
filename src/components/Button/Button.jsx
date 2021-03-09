import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const Button = ({ value, handler }) => (
    <button onClick={handler} className='button'>{value}</button>
)

Button.propTypes = {
    value: PropTypes.string,
    handler: PropTypes.func
}

export default Button