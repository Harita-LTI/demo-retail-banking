import React, { useState } from "react";
import { useForm } from "react-hook-form";

import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { Button, Form } from "react-bootstrap";

const Credit = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data:any) => {
    console.log(data);
    // Handle the transaction logic here
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="amount" className="py-2">
          <Form.Label>Please enter the amount</Form.Label>
          <Form.Control
            type="number"
            autoComplete='off'
            {...register('amount', { required: "You must provide the amount." })}
            isInvalid={!!errors.amount}
            className='transaction-input-field'
          />
          <Form.Control.Feedback type="invalid">
            {typeof errors.amount?.message === 'string' && errors.amount.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="mt-3" style={{ backgroundColor: '#e8474c', color: '#fff' }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

function CreditPage() {
  return (
    <LayoutWithSidebar
      title="Deposit"
    >
      <Credit />
    </LayoutWithSidebar>
  );
}
export default CreditPage;