import React from "react"
import PropTypes from "prop-types"

const CheckboxInput = ({ name, label, values, onChange, error }) => {
    let wrapperClass = "form-group";
    if (error && error.length > 0) {
        wrapperClass += " " + "has-error";
    }
    const possibleOptions = ["Ya", "Yeet", "Mardi", "Gras", "Dat", "Boi"]

    return (
        <div className={wrapperClass}>
            {possibleOptions.map(option => buildInput(option, values, onChange))}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

const buildInput = (name, values, onChange) => {
    return <div key={name}>
        <input type="checkbox" name={name} onChange={onChange}></input>
        <label htmlFor={name}>{name}</label>
    </div>
}

CheckboxInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    values: PropTypes.array,
    error: PropTypes.string
};


export default CheckboxInput;