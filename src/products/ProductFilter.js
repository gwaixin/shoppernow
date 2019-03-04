import React from 'react'
import { Form } from 'react-bootstrap'

class ProductFilter extends React.Component {
	render() {
		return (
			<div>
				<div className="mt-3">
					<h5>Department</h5>
					<Form>
						{['Regional', 'Nature', 'Seasonal'].map(type => (
							<Form.Check 
				        custom
				        type="checkbox"
								id={`custom-${type}`}
				        label={type}
				      />
						))}
					</Form>
				</div>

				<div className="mt-3">
					<h5>Category</h5>
					<Form>
						{['French', 'Italian', 'Irish', 'Animal'].map(type => (
							<Form.Check 
				        custom
				        type="checkbox"
								id={`custom-${type}`}
				        label={type}
				      />
						))}
						
					</Form>
				</div>
			</div>
		)
	}

}

export default ProductFilter