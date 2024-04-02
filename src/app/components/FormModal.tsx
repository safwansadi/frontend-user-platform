import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from './Modal'; 
import styles from './FormModal.module.css';

interface EditFormModalProps {
    initialValue: { _id:string, title: string; status:string; description: string, joinLink:string } | null;
    onSubmit: (formData: { _id:string, title: string; status:string; description: string, joinLink:string }) => void;
    onClose: () => void;
}

const FormModal: React.FC<EditFormModalProps> = ({ initialValue, onSubmit, onClose }) => {
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required').min(5, 'Title must be at least 5 characters long'),
        status: Yup.string().required('Status is required'),
        description: Yup.string().required('Description is required').min(5, 'description must be at least 5 characters long'),
        joinLink: Yup.string().url('Invalid URL format').required('Join link is required'),
    });

    return (
        <Modal onClose={onClose}>
            <div className={styles.container}>
                <Formik
                    initialValues={initialValue || { _id:'', title: '', status:'active' , description: '', joinLink:'' }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form>
                        <p>id: <Field type="text" name="_id" readOnly /></p>
                        <h2>Edit Event</h2>
                        <div>
                            <label>Title:</label>
                            <Field type="text" name="title" />
                            <ErrorMessage name="title" component="div" className={styles.error} />
                        </div>
                        <div>
                            <label>Status:</label>
                            <Field as="select" name="status">
                                <option value="active">active</option>
                                <option value="inactive">inactive</option>
                            </Field>
                            <ErrorMessage name="status" component="div" className={styles.error} />
                        </div>
                        <div>
                            <label>Description:</label>
                            <Field as="textarea" name="description" />
                            <ErrorMessage name="description" component="div" className={styles.error} />
                        </div>
                        <div>
                            <label>Join Link:</label>
                            <Field type="text" name="joinLink" />
                            <ErrorMessage name="joinLink" component="div" className={styles.error} />
                        </div>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </Form>
                </Formik>
            </div>
        </Modal>
    );
};

export default FormModal;
