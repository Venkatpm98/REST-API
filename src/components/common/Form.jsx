// import React, { Component } from 'react';
// import Button from "./Button";
// import Input from "./Input";
// import Joi from 'joi-browser';

// class Form extends Component {

//     state ={
//         data:{},
//         errors:{}
//     }
//     handleChange = ({target:input}) => {
        
//         const data = { ...this.state.data };
//         data[input.name] = input.value;
//         this.setState({ data });
//     };
//     validate = () => {

//         const {data} = this.state;
//         const results = Joi.validate(data, this.schema, { abortEarly : false })
        
//         if(!results.error) return null;

//         const errors = {} 

//         for(let item of results.error.details){
//             errors[item.path[0]] =   item.message
//         }

//         return errors;

//     // const errors = {};
//     // const { email, password } = this.state.data;
//     // if (email === "") errors.email = "EmailID required...";
//     // if (password === "") errors.password = "Password is required....";
//     // return Object.keys(errors) === 0 ? null : errors;
//   };
//   renderInput = (label, name, value, error, type='text') => {
//     return <Input  
//                label={label}
//                name={name}
//                type={type}
//                onChange={this.handleChange}
//                value={value}
//                error={error} />
//  }
//  handleSubmit = (event) => {
//     event.preventDefault(); //cancels the default submit event

//     const errors = this.validate();

//     this.setState({ errors: errors || {} });
//     if (errors) return;

//     this.doSubmit();
//     //write code to make http post requst to server
//   };

//  renderButton = (label) => {
//      return <Button label={label} />
//  }
//     render() {
//         return null;
//     }
// }

// export default Form;


import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
//import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

//   renderSelect(name, label, options) {
//     const { data, errors } = this.state;

//     return (
//       <Select
//         name={name}
//         value={data[name]}
//         label={label}
//         options={options}
//         onChange={this.handleChange}
//         error={errors[name]}
//       />
//     );
//   }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
