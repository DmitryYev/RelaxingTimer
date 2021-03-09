import React from 'react'
import PropTypes from 'prop-types'
import './ThemeSelect.css'

const ThemeSelect = ({ handler, options, disabled }) => {

    return (
        <>
            <label className='label' htmlFor="themes-select">Themes:</label>
            <select
                id='themes-select'
                className='select'
                name="themes"
                onChange={handler}
                disabled={disabled}
            >
                {options.map((el, index) => (
                    <option key={index} value={el}>{el[0].toUpperCase() + el.slice(1)}</option>
                ))}
            </select>
        </>
    )
}

ThemeSelect.propTypes = {
    handler: PropTypes.func,
    themes: PropTypes.array,
    disabled: PropTypes.bool
}

export default ThemeSelect