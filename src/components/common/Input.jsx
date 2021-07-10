import React from 'react';

function Input({ label, name, value, error, type, onChange }) {
    return (
        <div className="form-group" className="container-fluid">
            <label htmlFor={name}>{label}</label>
            <input type={type}
                id={name}
                className="form-control"
                name={name}
                onChange={onChange}
                value={value} />

            {error && <div className="alert alert-danger">
                {error}
            </div>}
        </div>
    );
}

export default Input;