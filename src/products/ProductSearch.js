import React from 'react'
import { Form } from 'react-bootstrap'

class ProductSearch extends React.Component {
	render() {
		return(
			<Form>
			  <Form.Group>
			    <Form.Control type="text" placeholder="Search Product" />
			    <Form.Text className="text-muted">
			      Find the right item by searching it here.
			    </Form.Text>
			  </Form.Group>
			</Form>

		)
	}
}

export default ProductSearch