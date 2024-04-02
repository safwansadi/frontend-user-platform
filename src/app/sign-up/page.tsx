"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts'; 
import { postSignUp } from '../api/api';
import './login.css'; 

const LoginForm: React.FC = () => {
  const router = useRouter()
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const initialValues = {
    name: '',
    email:'',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Username is required')
      .min(4, 'Username must be at least 4 characters long'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        'Password must be at least 6 characters long and contain at least one letter and one number'
      ),
  });


  const onSubmit = async (values: { name: string; email:string; password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      const response  = await postSignUp('api/users',values);
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
        <h2 className="form-title">Sign Up</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="name" className="label">Username</label>
                <Field type="text" name="name" className="input-field" />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="label">Email</label>
                <Field type="email" name="email" className="input-field" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="label">Password</label>
                <Field type="password" name="password" className="input-field" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              <button type="submit" disabled={isSubmitting} className="signup-button">
                {isSubmitting ? 'Submitting...' : 'Sign Up'}
              </button>
             
              {errorMessage && <div className="error-message">{errorMessage}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
