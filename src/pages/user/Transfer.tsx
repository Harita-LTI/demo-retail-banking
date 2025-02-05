import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';

import LayoutWithSidebar from '../../components/common/LayoutWithSidebar';
import { FaMoneyBill } from 'react-icons/fa';
import { useTransferMutation } from '../../services/userServices';
import { useNavigate } from 'react-router-dom';
import PlaneModalForNotification from '../../components/common/PlaneModalForNotification';
import { RootState } from '../../store/store';
import { useAccountViewByUserIdQuery } from '../../services/adminServices';

const TransferForm = () => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const [transfer, {}] = useTransferMutation();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: accountInfo, error, isLoading: accountInfoIsLoading } = useAccountViewByUserIdQuery(user?.userId, {skip: !user});
  
  const onSubmit = async (formData: any) => {
    try {
      const resp = await transfer({
        receiverAccount: formData.otherBankAccount,
        senderAccount: formData.ownAccount,
        amount: JSON.parse(formData.amount)
      }).unwrap();

      //@ts-ignore
      setModalMessage(resp.message || 'Transaction successful!');
      setShowModal(true);
      reset();

      setTimeout(() => {
        setShowModal(false);
        navigate('/user/dashboard');
      }, 3000);
    } catch (err) {
      console.log(err)
    }    
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="ownAccount" className="py-2">
          <Form.Label>Own Account</Form.Label>
          <Form.Control
            type="text"
            autoComplete='off'
            disabled={true}
            defaultValue={accountInfo?.accountNumber}
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
            Reset
          </Button>
        </Form.Group>
      </Form>

      <PlaneModalForNotification
        bodyMessage={modalMessage}
        title="Transaction Status"
        showModal={showModal}
        setShowModal={() => setShowModal}
      />
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