import React from "react";

export default function Signup(props) {

  const { values, update, submit, disabled, errors } = props;

  const onChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value
    update(name, valueToUse);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };


  return (
    <form className="form container" onSubmit={onSubmit}>

      <div className="errors">
        <div>{errors.userName}</div>
        <div>{errors.email}</div>
        <div>{errors.password}</div>
        <div>{errors.terms}</div>
      </div>

      <div className="form-group inputs">
        <label>
          Username
              <input
            name="userName"
            type="text"
            placeholder="type a username..."
            maxLength="30"
            value={values.userName}
            onChange={onChange}
          />
        </label>

        <label>
          Email
              <input
            name="email"
            type="email"
            placeholder="type an email..."
            maxLength="30"
            value={values.email}
            onChange={onChange}
          />
        </label>

        <label>
          Password
              <input
            name="password"
            type="password"
            placeholder="type a password ..."
            maxLength="30"
            value={values.password}
            onChange={onChange}
          />
        </label>

        <label>
          Terms and Conditions
              <input
            checked={values.terms}
            name="terms"
            type="checkbox"
            onChange={onChange}
          />
        </label>

        <div className="submit">
          <button disabled={disabled} >submit</button>
        </div>
      </div>
    </form>
  );
}