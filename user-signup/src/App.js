
import React, { useState, useEffect } from 'react'
import * as yup from "yup";
import axios from 'axios'
import schema from './formSchema';
import './App.css';
import Signup from './Signup';
import User from './User'


const initialFormValues = {
  userName: '',
  email: '',
  password: '',
  terms: false,
}

const initialFormErrors = {
  userName: '',
  email: '',
  password: '',
  terms: '',
}
const intiialUsers = []
const initialDisabled = true;

function App() {
  const [users, setUsers] = useState(intiialUsers)
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);


  const setError = (inputName, inputValue) => {
    yup.reach(schema, inputName).validate(inputValue)
      .then(() => setFormErrors({ ...formErrors, [inputName]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [inputName]: err.errors[0] }))
  }

  const updateForm = (inputName, inputValue) => {
    setError(inputName, inputValue)
    setFormValues({ ...formValues, [inputName]: inputValue });
  }

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  const submitForm = () => {
    const newUser = {
      userName: formValues.userName.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    }

    axios.post('https://reqres.in/api/users', newUser)
      .then((res) => {
        setUsers([res.data, ...users])
        setFormValues(initialFormValues)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <div className='container'>
      <h1>User SignUp Form </h1>
      <Signup
        values={formValues}
        update={updateForm}
        submit={submitForm}
        disabled={disabled}
        errors={formErrors}
      />

      {users.map((user) => {
        return <User key={user.id} details={user} />;
      })}
    </div>
  );
}

export default App;
