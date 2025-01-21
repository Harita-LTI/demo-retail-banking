import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LayoutWithSidebar from '../../components/common/LayoutWithSidebar';
import { FaMoneyBill } from 'react-icons/fa';
import { useTransferMutation } from '../../services/userServices';

const TransferForm = () => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const [transfer, {}] = useTransferMutation();
  
  const onSubmit = async (formData: any) => {
    try {
      const resp = await transfer({
        receiverAccount: "0600140000003", // #check -> account number needed
        senderAccount: "0600140000002",   // #check -> account number needed
        amount: JSON.parse(formData.amount)
      }).unwrap();

      // #check
      console.log("----------", resp)
    } catch (err) {
      console.log(err)
    }    
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
    // Handle the cancel logic here
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="ownAccount" className="py-2">
          <Form.Label>Own Account</Form.Label>
          <Form.Control
            type="text"
            autoComplete='off'
            {...register('ownAccount', { required: "You must provide your own account number." })}
            isInvalid={!!errors.ownAccount}
            className='transaction-input-field'
          />
          <Form.Control.Feedback type="invalid">
            {typeof errors.ownAccount?.message === 'string' && errors.ownAccount.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="otherBankAccount" className="py-2">
          <Form.Label>Other Bank Account Number</Form.Label>
          <Form.Control
            type="text"
            autoComplete='off'
            {...register('otherBankAccount', { required: "You must provide the other bank account number." })}
            isInvalid={!!errors.otherBankAccount}
            className='transaction-input-field'
          />
          <Form.Control.Feedback type="invalid">
            {typeof errors.otherBankAccount?.message === 'string' && errors.otherBankAccount.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="amount" className="py-2">
          <Form.Label>Amount</Form.Label>
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


function TransferPage() {
  return (
    <LayoutWithSidebar title="Transfer" icon={<FaMoneyBill />}>
      <TransferForm />
    </LayoutWithSidebar>
  );
}
export default TransferPage;