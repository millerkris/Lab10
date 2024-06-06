import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegistrationForm = () => {
    const validationSchema = Yup.object().shape({
        login: Yup.string()
            .required('Логин обязателен')
            .min(6, 'Логин должен содержать минимум 6 символов')
            .max(20, 'Логин должен содержать максимум 20 символов')
            .matches(/^[a-zA-Z0-9]+$/, 'Логин должен содержать только латинские буквы и цифры'),
        password: Yup.string()
            .required('Пароль обязателен'),
        confirmPassword: Yup.string()
            .required('Повторите пароль')
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
    });

    const handleSubmit = (values) => {
        alert(JSON.stringify(values, null, 2));
    };

    return (
        <div>
            <h1>Форма регистрации</h1>
            <Formik
                initialValues={{ login: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="login">Логин:</label>
                        <Field type="text" id="login" name="login" />
                        <ErrorMessage name="login" component="div" />
                    </div>

                    <div>
                        <label htmlFor="password">Пароль:</label>
                        <Field type="password" id="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Повтор пароля:</label>
                        <Field type="password" id="confirmPassword" name="confirmPassword" />
                        <ErrorMessage name="confirmPassword" component="div" />
                    </div>

                    <button type="submit">Зарегистрироваться</button>
                </Form>
            </Formik>
        </div>
    );
};


export default RegistrationForm;