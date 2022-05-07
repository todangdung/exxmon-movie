import React from "react";

import { useField, ErrorMessage } from "formik";

export const TextField = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <div className="sign-in__content__form__input">
        <div className="icon">
          <i className={props.icon}></i>
          <input
            className={`form-control shadow-none ${
              meta.touched && meta.error && "is-invalid"
            }`}
            type={props.type}
            placeholder={props.placeholder}
            {...field}
            {...props}
          />
        </div>
        <ErrorMessage component="div" name={field.name} className="error" />
      </div>
    </div>
  );
};

export default TextField;
