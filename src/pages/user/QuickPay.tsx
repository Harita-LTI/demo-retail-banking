import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';

import LayoutWithSidebar from '../../components/common/LayoutWithSidebar';
import { FaPiggyBank } from 'react-icons/fa';
import { useGetAllActiveAccountsQuery, useTransferMutation } from '../../services/userServices';
import { useNavigate } from 'react-router-dom';
import PlaneModalForNotification from '../../components/common/PlaneModalForNotification';
import { RootState } from '../../store/store';
import { useAccountViewByUserIdQuery } from '../../services/adminServices';

const BankTransferForm = () => {
  const { register, reset, handleSubmit, formState: { errors }, watch } = useForm();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: accountInfo, error, isLoading: accountInfoIsLoading } = useAccountViewByUserIdQuery(user?.userId, { skip: !user });
  const { data: allAccounts, error: allAccountsErr, isLoading: allAccountsIsLoading } = useGetAllActiveAccountsQuery({});
  const [transfer, { }] = useTransferMutation();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  if (allAccounts) {
    var accountNumbers = allAccounts.map((account: any) => account.accountNumber);
  }

  const onSubmit = async (formData:any) => {
    try {
      const resp = await transfer({
        receiverAccount: formData.btOtherBankAccount,
        senderAccount: formData.btOwnAccount,
        amount: JSON.parse(formData.btAmount)
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

  if (accountInfoIsLoading || allAccountsIsLoading) {
    return <div>Loading...</div>;
  }

  if (error || allAccountsErr) {
    return <div>Error loading account information or all accounts.</div>;
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex justify-content-between">
          <Form.Group controlId="btBank1IFSC" className="py-2 me-2 w-100">
            <Form.Label>IFSC Code</Form.Label>
            <Form.Control
              type="text"
              autoComplete='off'
              disabled={true}
              defaultValue={"UNBK0000007"}
              {...register('btBank1IFSC')}
            />
          </Form.Group>
          <Form.Group controlId="btOwnAccount" className="py-2 ms-2 w-100">
            <Form.Label>Transfer From</Form.Label>
            <Form.Control
              type="text"
              autoComplete='off'
              disabled={true}
              defaultValue={accountInfo?.accountNumber}
              {...register('btOwnAccount', { required: "You must provide your own account number." })}
            />
          </Form.Group>
        </div>
        <div className="d-flex">
          <Form.Group controlId="btBank2IFSC" className="py-2 me-2 w-100">
            <Form.Label>IFSC Code</Form.Label>
            <Form.Control
              type="text"
              autoComplete='off'
              {...register('btBank2IFSC')}
            />
          </Form.Group>
          <Form.Group controlId="btOtherBankAccount" className="py-2 ms-2 w-100">
            <Form.Label>Transfer To</Form.Label>
            <Form.Control
              as="select"
              autoComplete="off"
              {...register('btOtherBankAccount', { required: "You must provide the other bank account number." })}
              isInvalid={!!errors.btOtherBankAccount}
            >
              <option value="">Select from beneficiary account</option>
              {accountNumbers && accountNumbers.map((number: string, index: number) => (
                <option key={index} value={number}>{number}</option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {typeof errors.btOtherBankAccount?.message === 'string' && errors.btOtherBankAccount.message}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="d-flex">
          <Form.Group controlId="btAmount" className="py-2  me-2" style={{ flex: 1 }}>
            <Form.Label>Transfer Amount</Form.Label>
            <Form.Control
              type="number"
              autoComplete='off'
              {...register('btAmount', { required: "You must provide the amount." })}
              isInvalid={!!errors.btAmount}
            />
            <Form.Control.Feedback type="invalid">
              {typeof errors.btAmount?.message === 'string' && errors.btAmount.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="btRemarks" className="py-2  ms-2" style={{ flex: 1 }}>
            <Form.Label>Remark</Form.Label>
            <Form.Control
              type="text"
              autoComplete='off'
              {...register('btRemarks', { required: "You must provide a remark or comment." })}
              isInvalid={!!errors.btRemarks}
            />
            <Form.Control.Feedback type="invalid">
              {typeof errors.btRemarks?.message === 'string' && errors.btRemarks.message}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <Form.Group controlId="paymentMode" className="py-2 w-100">
          <Form.Label>Transfer Mode</Form.Label>
          <div className="d-flex">
            {['IMPS', 'NEFT', 'RTGS'].map((mode, index) => (
              <Form.Check
                key={index}
                type="radio"
                label={mode}
                value={mode}
                defaultChecked={mode === 'IMPS'}
                {...register('paymentMode', { required: "You must select a payment mode." })}
                className="me-3"
              />
            ))}
          </div>
        </Form.Group>
        <Form.Group controlId="terms" className="py-2 w-100">
          <Form.Check
            type="checkbox"
            label="I agree to the terms and conditions"
            {...register('btTerms', { required: "You must agree to the terms and conditions." })}
            isInvalid={!!errors.terms}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                (e.target as HTMLInputElement).click();
              }
            }}
          />
          <Form.Control.Feedback type="invalid">
            {typeof errors.terms?.message === 'string' && errors.terms.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-4">
          <Button type="submit" disabled={!watch('btRemarks') || !watch('btBank2IFSC') || !watch('btOtherBankAccount') || !watch('btAmount') || !watch('btTerms')}>Submit</Button>
          <Button
            type="button"
            className="ms-2"
            variant="danger"
            onClick={() => reset()}
          >
            Reset
          </Button>
        </Form.Group>
        <div className="mt-5" style={{ color: 'grey', fontSize: '12px' }}>
          <strong>NOTE:</strong>
          <ul>
            <li><strong>IMPS:</strong> Immediate Payment Service</li>
            <li><strong>NEFT:</strong> National Electronic Funds Transfer</li>
            <li><strong>RTGS:</strong> Real Time Gross Settlement</li>
          </ul>
        </div>
        <PlaneModalForNotification
          bodyMessage={modalMessage}
          title="Transaction Status"
          showModal={showModal}
          setShowModal={() => setShowModal}
        />
      </Form>
    </div>
  );
};

const OneTimePayForm = () => {
  const { register, reset, handleSubmit, formState: { errors }, watch } = useForm();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: accountInfo, error, isLoading: accountInfoIsLoading } = useAccountViewByUserIdQuery(user?.userId, { skip: !user });
  const [transfer, { }] = useTransferMutation();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (formData:any) => {
    try {
      const resp = await transfer({
        receiverAccount: formData.otOtherBankAccount,
        senderAccount: formData.otOwnAccount,
        amount: JSON.parse(formData.otAmount)
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

  if (accountInfoIsLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading account information.</div>;
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex justify-content-between">
          <Form.Group controlId="otBank1IFSC" className="py-2 me-2 w-100">
            <Form.Label>IFSC Code</Form.Label>
            <Form.Control
              type="text"
              autoComplete='off'
              disabled={true}
              defaultValue={"UNBK0000007"}
              {...register('otBank1IFSC')}
            />
          </Form.Group>
          <Form.Group controlId="otOwnAccount" className="py-2 ms-2 w-100">
            <Form.Label>Transfer From</Form.Label>
            <Form.Control
              type="text"
              autoComplete='off'
              disabled={true}
              defaultValue={accountInfo?.accountNumber}
              {...register('otOwnAccount', { required: "You must provide your own account number." })}
            />
          </Form.Group>
        </div>
        <div className="d-flex justify-content-between">
          <Form.Group controlId="otBank2IFSC" className="py-2 me-2 w-100">
            <Form.Label>IFSC Code</Form.Label>
            <Form.Control
              type="text"
              autoComplete='off'
              {...register('otBank2IFSC')}
            />
          </Form.Group>
          <Form.Group controlId="otOtherBankAccount" className="py-2 ms-2 w-100">
            <Form.Label>Transfer To</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              {...register('otOtherBankAccount', { required: "You must provide the other bank account number." })}
              isInvalid={!!errors.otOtherBankAccount}
            />
            <Form.Control.Feedback type="invalid">
              {typeof errors.otOtherBankAccount?.message === 'string' && errors.otOtherBankAccount.message}
            </Form.Control.Feedback>
            <Form.Group controlId="otAddBeneficiary" className="py-2 mt-2">
              <Form.Check
                type="checkbox"
                label="Add as beneficiary"
                {...register('otAddBeneficiary')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    (e.target as HTMLInputElement).click();
                  }
                }}
              />
            </Form.Group>
          </Form.Group>
        </div>
        <div className="d-flex">
          <Form.Group controlId="otAmount" className="py-2 me-2" style={{ flex: 1 }}>
            <Form.Label>Transfer Amount</Form.Label>
            <Form.Control
              type="number"
              autoComplete='off'
              {...register('otAmount', { required: "You must provide the amount." })}
              isInvalid={!!errors.otAmount}
            />
            <Form.Control.Feedback type="invalid">
              {typeof errors.otAmount?.message === 'string' && errors.otAmount.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="otRemarks" className="py-2 ms-2" style={{ flex: 1 }}>
            <Form.Label>Remark</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              {...register('otRemarks', { required: "You must provide a remark or comment." })}
              isInvalid={!!errors.otRemarks}
            />
            <Form.Control.Feedback type="invalid">
              {typeof errors.otRemarks?.message === 'string' && errors.otRemarks.message}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <Form.Group controlId="paymentMode" className="py-2 w-100">
          <Form.Label>Transfer Mode</Form.Label>
          <div className="d-flex">
            {['IMPS', 'NEFT', 'RTGS'].map((mode, index) => (
              <Form.Check
                key={index}
                type="radio"
                label={mode}
                value={mode}
                defaultChecked={mode === 'IMPS'}
                {...register('paymentMode', { required: "You must select a payment mode." })}
                className="me-3"
              />
            ))}
          </div>
        </Form.Group>
        <Form.Group controlId="terms" className="py-2 w-100">
          <Form.Check
            type="checkbox"
            label="I agree to the terms and conditions"
            {...register('terms', { required: "You must agree to the terms and conditions." })}
            isInvalid={!!errors.terms}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                (e.target as HTMLInputElement).click();
              }
            }}
          />
          <Form.Control.Feedback type="invalid">
            {typeof errors.terms?.message === 'string' && errors.terms.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-4">
          <Button type="submit" disabled={!watch('otRemarks') || !watch("otBank2IFSC") || !watch('otOtherBankAccount') || !watch('otAmount') || !watch('terms')}>Submit</Button>
          <Button
            type="button"
            className="ms-2"
            variant="danger"
            onClick={() => reset()}
          >
            Reset
          </Button>
        </Form.Group>
        <div className="mt-5" style={{ color: 'grey', fontSize: '12px' }}>
          <strong>NOTE:</strong>
          <ul>
            <li><strong>IMPS:</strong> Immediate Payment Service</li>
            <li><strong>NEFT:</strong> National Electronic Funds Transfer</li>
            <li><strong>RTGS:</strong> Real Time Gross Settlement</li>
          </ul>
        </div>
        <PlaneModalForNotification
          bodyMessage={modalMessage}
          title="Transaction Status"
          showModal={showModal}
          setShowModal={() => setShowModal}
        />
      </Form>
    </div>
  );
};

const QuickPayForm = () => {
  const [selectedOption, setSelectedOption] = useState('Scan & Pay');
  
  return (
    <div className="container">
      <div className="d-flex mb-3">
        {['Scan & Pay', 'One Time Pay', 'Bank Transfer'].map((option) => (
          <Button
            key={option}
            variant={selectedOption === option ? 'primary' : ''}
            style={{ background: "#0d9999", borderColor: "#0d9999", color: "#fff"}}
            onClick={() => setSelectedOption(option)}
            className="me-4"
          >
            {option}
          </Button>
        ))}
      </div>
      <hr style={{ borderColor: 'var(--bs-primary)' }} />

      {selectedOption === 'Scan & Pay' && (
        <div className="text-muted pt-5 pb-5 text-center"> * We are unable to take this request on website</div>
      )}

      {selectedOption === 'One Time Pay' && (
        <div>
          <OneTimePayForm />
        </div>
      )}

      {selectedOption === 'Bank Transfer' && (
        <div>
          <BankTransferForm />
        </div>
      )}
    </div>
  );
};

function QuickPayPage() {
  return (
    <LayoutWithSidebar title="Quick Pay" icon={<FaPiggyBank />}>
      <QuickPayForm />
    </LayoutWithSidebar>
  );
}

export default QuickPayPage;