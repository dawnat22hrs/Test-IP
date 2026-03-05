'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch } from '@/store';
import { setAmount, setDestination, setConfirm, resetForm } from '@/store/withdrawSlice';
import { PageWrapper, FormContainer } from './styles';
import { Button, Input, Checkbox, Typography, Modal } from './components';
import { WithdrawStatus } from '@/store/types';
import { setToken } from '@/store/authSlice';
import { loadLastWithdrawal } from '@/utils/loadLastWithdrawal';
import { fetchWithdrawal, submitWithdraw } from '@/store/thunks';
import { selectWithdrawForm, selectWithdrawStatus } from '@/store/selectors';
import { WithdrawalDto } from '@/api/types';

type WithdrawalModalProps = {
  open: boolean;
  lastWithdrawal?: WithdrawalDto;
  loading: boolean;
  onClose: () => void;
};

const WithdrawalModal = React.memo(
  ({ open, lastWithdrawal, loading, onClose }: WithdrawalModalProps) => (
    <Modal
      data-testid="withdraw-success-modal"
      open={open}
      onClose={onClose}
      title="Withdrawal submitted"
    >
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Typography>Withdrawal ID: {lastWithdrawal?.id}</Typography>
          <Typography>Amount: {lastWithdrawal?.amount}</Typography>
          <Typography>Destination: {lastWithdrawal?.destination}</Typography>
          <Typography>Status: {lastWithdrawal?.status}</Typography>
        </>
      )}
    </Modal>
  ),
);

WithdrawalModal.displayName = 'WithdrawalModal';

export default function WithdrawPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { amount, destination, confirm } = useSelector(selectWithdrawForm);
  const { status, error, lastWithdrawal } = useSelector(selectWithdrawStatus);

  const [touched, setTouched] = useState({
    amount: false,
    destination: false,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [loadingWithdrawal, setLoadingWithdrawal] = useState(false);

  const isFormValid = useMemo(
    () => amount > 0 && destination.trim() !== '' && confirm,
    [amount, destination, confirm],
  );

  const isLoading = status === WithdrawStatus.Loading;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!isFormValid || isLoading) return;

      const resultAction = await dispatch(
        submitWithdraw({
          amount,
          destination,
        }),
      );

      if (submitWithdraw.fulfilled.match(resultAction)) {
        const id = resultAction.payload;

        setModalOpen(true);
        setLoadingWithdrawal(true);

        dispatch(fetchWithdrawal(id)).finally(() => {
          setLoadingWithdrawal(false);
        });
      }
    },
    [amount, destination, isFormValid, isLoading, dispatch],
  );

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setAmount(Number(e.target.value)));
    },
    [dispatch],
  );

  const handleDestinationChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setDestination(e.target.value));
    },
    [dispatch],
  );

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setLoadingWithdrawal(false);

    dispatch(resetForm());

    setTouched({ amount: false, destination: false });
  }, [dispatch]);

  useEffect(() => {
    const token = crypto.randomUUID();
    dispatch(setToken(token));
  }, [dispatch]);

  useEffect(() => {
    const last = loadLastWithdrawal();

    if (last) {
      dispatch(setAmount(last.amount));
      dispatch(setDestination(last.destination));
      setModalOpen(true);
    }
  }, [dispatch]);

  return (
    <PageWrapper>
      <FormContainer onSubmit={handleSubmit}>
        <Typography as="label" htmlFor="amount">
          Amount
        </Typography>

        <Input
          id="amount"
          data-testid="withdraw-amount"
          value={amount || ''}
          onChange={handleAmountChange}
          onBlur={() =>
            setTouched((t) => ({
              ...t,
              amount: true,
            }))
          }
          hasError={touched.amount && amount <= 0}
        />

        <Typography as="label" htmlFor="destination">
          Destination
        </Typography>

        <Input
          id="destination"
          data-testid="withdraw-destination"
          type="text"
          value={destination}
          onChange={handleDestinationChange}
          onBlur={() =>
            setTouched((t) => ({
              ...t,
              destination: true,
            }))
          }
          hasError={touched.destination && destination.trim() === ''}
        />

        <Checkbox
          data-testid="withdraw-confirm"
          checked={confirm}
          onChange={(e) => dispatch(setConfirm(e.target.checked))}
          label="I confirm the withdrawal"
        />

        <Button data-testid="withdraw-submit" type="submit" disabled={!isFormValid || isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>

        <WithdrawalModal
          open={modalOpen}
          lastWithdrawal={lastWithdrawal}
          loading={loadingWithdrawal}
          onClose={handleModalClose}
        />

        <Modal
          data-testid="withdraw-error-modal"
          open={status === WithdrawStatus.Error}
          onClose={() => dispatch(resetForm())}
          title="Error"
        >
          <Typography>{error}</Typography>
        </Modal>
      </FormContainer>
    </PageWrapper>
  );
}
