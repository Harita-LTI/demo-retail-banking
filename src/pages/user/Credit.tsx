import React, { useState } from "react";
import { useForm } from "react-hook-form";

import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaMoneyBill } from "react-icons/fa";

const Credit = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    if (data.amount % 100 !== 0 && data.amount % 200 !== 0 && data.amount % 500 !== 0) {
      setError('amount', {
        type: 'manual',
        message: 'The amount should be a multiple of 100, 200, or 500.',
      });
      return;
    }
    // Handle the transaction logic here
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="amount" className="py-2">
          <Form.Label>
            Please enter the amount <span className="text-danger">*</span>
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>The amount should be a multiple of 100, 200, or 500.</Tooltip>}
            >
              <span className="ml-2 text-info">ℹ️</span>
            </OverlayTrigger>
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

function CreditPage() {
  return (
    <LayoutWithSidebar title="Deposit" icon={<FaMoneyBill />}>
      <Credit />
    </LayoutWithSidebar>
  );
}
export default CreditPage;
