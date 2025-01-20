import React, { useState } from "react";
import { useForm } from "react-hook-form";

import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { Button, Form } from "react-bootstrap";
import { FaMoneyBillAlt } from "react-icons/fa";

const Debit = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle the transaction logic here
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="amount" className="py-2">
          <Form.Label>
            Please enter the amount <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="number"
            autoComplete="off"
            {...register("amount", {
              required: "You must provide the amount.",
            })}
            isInvalid={!!errors.amount}
            className="transaction-input-field"
          />
          <Form.Control.Feedback type="invalid">
            {typeof errors.amount?.message === "string" &&
              errors.amount.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-4">
          <Button type="submit">Submit</Button>
          <Button
            type="button"
            className="ms-2"
            variant="danger"
            onClick={() => reset()}
          >
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

function DebitPage() {
  return (
    <LayoutWithSidebar title="Withdrawal" icon={<FaMoneyBillAlt />}>
      <Debit />
    </LayoutWithSidebar>
  );
}
export default DebitPage;
