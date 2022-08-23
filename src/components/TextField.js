import React from 'react';
import { ErrorMessage, useField } from 'formik';
import { BiErrorCircle } from "react-icons/bi";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      {/* <label htmlFor={field.name}>{label}</label> */}
      <input
        className={` form_input ${meta.touched && meta.error && 'is-invalid'} ${props.email && "input_email"} `}
        {...field} {...props}
        autoComplete="off"

      />
      {meta.touched && meta.error && <BiErrorCircle className="opps"/>}

      <ErrorMessage component="div" name={props.name} className="error" />
    </div>
  )
}