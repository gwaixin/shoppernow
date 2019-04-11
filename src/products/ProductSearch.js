import React from 'react'
import { Form } from 'react-bootstrap'

const ProductSearch = (props) => {
	
	return(
		<Form>
			<Form.Group>

				<Form.Control 
					type="text"
					name="search"
					placeholder="Search Product"
					onChange={props.onSearch} />

				<Form.Text className="text-muted">
					Find the right item by searching it here.
				</Form.Text>

			</Form.Group>
		</Form>

	)
}

export default ProductSearch