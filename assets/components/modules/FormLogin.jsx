import React from 'react';
import { renderForm, Form, FormRow } from 'react-symfony-form';

const FormLogin = (props)=>{
    return(
        <div><h1>TOTO</h1>
    <Form formView={registrationForm}>
        <FormErrors formView={form} />

        <FormRow formView={form.child()} />
        <FormRow formView={form.child(dueDate)} />

        <FormRow formView={form.child(submit)} vars={{label: 'Submit me'}} />
    </Form></div>
    )
}
export default FormLogin;