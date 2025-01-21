import React, { useState } from "react";
import { useForm } from "react-hook-form";

import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaMoneyBill } from "react-icons/fa";
import { useDepositMutation } from "../../services/userServices";

const Credit = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();
  const [deposit, {}] = useDepositMutation();

  const onSubmit = async (formData: any) => {
    if (
      formData.amount % 100 !== 0 &&
      formData.amount % 200 !== 0 &&
      formData.amount % 500 !== 0
    ) {
      setError("amount", {
        type: "manual",
        message: "The amount should be a multiple of 100, 200, or 500.",
      });
      return;
    }
    try {
      const resp = await deposit({
        // #check
        userId: "1",
        amount: JSON.parse(formData.amount),
      }).unwrap();

      // #check
      console.log("----------", resp);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="amount" className="py-2">
          <Form.Label>
            Please enter the amount <span className="text-danger">*</span>
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip>
                  The amount should be a multiple of 100, 200, or 500.
                </Tooltip>
              }
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
