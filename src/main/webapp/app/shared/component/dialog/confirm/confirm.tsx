
import React from 'react';
import { Translate } from 'react-jhipster';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export interface IConfirmDialogProps {
  handleClose: () => {},
  handleConfirm: () => void,
  title: string,
  message: string,
  confirmButtonText: string
  confirmButtonColor: "danger",
  isOpen: boolean
}

export const ConfirmDialog = (props: IConfirmDialogProps) => {

  const { handleClose, handleConfirm, title, message, confirmButtonText, confirmButtonColor, isOpen } = props;

  return (
    <Modal isOpen={isOpen} toggle={ handleClose }>
      <ModalHeader toggle={ handleClose }>
        { title }
      </ModalHeader>
      <ModalBody id="openfitnesstrackerApp.delete.question">
        { message }
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={ handleClose }>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="confirm" color={ confirmButtonColor } onClick={handleConfirm}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          { confirmButtonText }
        </Button>
      </ModalFooter>
    </Modal>
  );

}

export default ConfirmDialog;
