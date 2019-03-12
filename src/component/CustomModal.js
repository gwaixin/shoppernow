import React from 'react'
import { Modal } from 'react-bootstrap'

const CustomModal = (props) => {


    return (
        <Modal 
            show={ props.isShow }
            onHide={ props.onHide }
            size={ props.size || 'lg' }
            aria-labelledby="contained-modal-title-vcenter"
            centered 
            >
            <Modal.Header closeButton>
                { props.title }
            </Modal.Header>
            <Modal.Body>
                { props.body }
            </Modal.Body>
            <Modal.Footer>
                { props.footer }
            </Modal.Footer>
        </Modal>
    )
}

export default CustomModal