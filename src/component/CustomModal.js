import React from 'react'
import { Modal } from 'react-bootstrap'

const CustomModal = (props) => {

    const mfooter = props.footer ? <Modal.Footer>{ props.footer }</Modal.Footer> : null

    return (
        <Modal 
            show={ props.isShow }
            onHide={ props.onHide }
            size={ props.size || 'lg' }
            aria-labelledby="contained-modal-title-vcenter"
            centered 
            >
            <Modal.Header closeButton>
                <h4>{ props.title }</h4>
            </Modal.Header>
            <Modal.Body>
                { props.body }
            </Modal.Body>

            { mfooter }
        </Modal>
    )
}

export default CustomModal