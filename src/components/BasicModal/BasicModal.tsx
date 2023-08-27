import { FC } from 'react';
import { Modal } from '@mui/material';
import { BasicModalProps } from './types';
import {useAppDispatch, useAppSelector} from '../../redux/hooks/hooks'
import { createChangeModal } from '../../redux/actions/modalActions';


export const BasicModal: FC<BasicModalProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const {isOpen} = useAppSelector(state => state.modal);
  const handleClose = () => dispatch(createChangeModal({isOpen: false, modalType: ''}));
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
      >
        <>
          {children}
        </>
      </Modal>
    </div>
  );
};
