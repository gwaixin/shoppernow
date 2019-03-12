import React from 'react'
import CustomModal from '../component/CustomModal'
import { Form, Col, Button } from 'react-bootstrap'

const ItemEditModal = (props) => {

    const item = props.item

    if (!item) {
        return null
    }

    console.log('item edit : ', item)

    const product = item.product_id
    const colors = product.attributes.filter(attr => attr.type === 'color')
    const sizes = product.attributes.filter(attr => attr.type === 'size')
    const coIndex = item.attributes.findIndex(attr => attr.type === 'color')
    const siIndex = item.attributes.findIndex(attr => attr.type === 'size')

    const formEdit = (
        <Form onSubmit={props.onEditSubmit}>
            <Form.Row>
                <Form.Group as={Col} controlId="formSize">
                    <Form.Label><b>Size</b></Form.Label>
                    <br />
                    { 
                        sizes.map(size => 
                            (<Form.Check 
                                custom
                                inline
                                type="radio"
                                id={`size-${size.value}`}
                                key={`size-${size.value}`}
                                label={size.value}
                                name="size"
                                value={size._id}
                                defaultChecked={size._id === item.attributes[siIndex]._id}
                            />)
                        ) 
                    }

                    <br />
                    <Form.Label className="mt-3"><b>How Many?</b></Form.Label>
                    <Form.Control 
                        type="number" 
                        name="quantity" 
                        placeholder="Enter the quantity"
                        required 
                        defaultValue={item.quantity}/>
                    <Form.Text>
                        Enter the quantity you want to have in your cart?
                    </Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="formColor">
                    <Form.Label><b>Color</b></Form.Label>
                    <br/>
                    { 
                        colors.map(color => 
                            (<Form.Check 
                                className="mb-3"
                                custom
                                inline
                                type="radio"
                                id={`color-${color.value}`}
                                key={`color-${color.value}`}
                                label={color.value}
                                name="color"
                                value={color._id}
                                defaultChecked={color._id === item.attributes[coIndex]._id}
                            />)
                        ) 
                    }
                </Form.Group>
            </Form.Row>

            <Button variant="dark" onClick={props.onHide}>Cancel</Button>
            <Button className="ml-1" variant="primary" type="submit">Confirm</Button>
        </Form>
    )

    return(
        <CustomModal
            isShow={props.isShow}
            onHide={props.onHide}
            size="lg"
            title={`Edit Item Cart : ${product.name}`}
            body={formEdit} />
    )
}

export default ItemEditModal