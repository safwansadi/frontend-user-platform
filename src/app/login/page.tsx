"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts'; 
import './login.css'; 
import { postLogin } from '../api/api';

const LoginForm: React.FC = () => {
  const router = useRouter()
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
    password: Yup.string().required('Password is required'),
  });

  const handleClick = () => {
    router.push("/sign-up");
  };

  const onSubmit = async (values: { email: string; password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      const response  = await postLogin('api/auth',values);
      const data = await response?.json();
      if(response?.ok){
        login(data.token)
        router.push('/manage-dashboard')
        console.log("data",data)
      } else{
        setErrorMessage(data.message)
      }
    } catch (error) {
      setErrorMessage('Failed to login. Please try again.'); // Display error message
    }
    setSubmitting(false);
  };

  return (
    <div className="card-container">
      <div className="card">
        <h2 className="form-title">Login</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email" className="label">email</label>
                <Field type="text" name="email" className="input-field" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="label">Password</label>
                <Field type="password" name="password" className="input-field" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              <button type="submit" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
             
              {errorMessage && <div className="error-message">{errorMessage}</div>}
            </Form>
          )}
        </Formik>
        <button className="signup-button" onClick={handleClick}>
                Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
