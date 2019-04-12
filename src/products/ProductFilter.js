import React from 'react'
import { Network } from '../helpers/'
import { Form } from 'react-bootstrap'

class ProductFilter extends React.Component {

	state = {
		departments: [],      // list of departments
		categories: [],       // list of categories
		filCats: [],          // filtered categories
		filDepts: []          // filtered departments
	}

	componentDidMount() {
		Network().get('/api/categories', {})
		.then(res => {
			if (res.data.status) {
				const categories = res.data.categories
				this.setState({ categories })
			}
		})

		Network().get('/api/departments', {})
		.then(res => {
			if (res.data.status) {
				const departments = res.data.departments
				this.setState({ departments })
			}
		})

	}

	onCheckCategory(isChecked, id) {
		var filters = []

		// add to filter
		if (isChecked) {
			filters = this.state.filCats
			filters.push(id)

		// remove to filter
		} else {
			filters = this.state.filCats.filter(cat => cat !== id)
		}

		// update categories too
		const categories = this.state.categories
		const catindex = categories.findIndex(cat => cat.category_id === id)

		if (catindex !== -1) {
			categories[catindex].isChecked = isChecked
			this.setState({ categories })
		}

		this.setState({ filCats: filters }, this.onUpdateWithFilters)
	}

	onCheckDepartment(event, id) {
		// setup filters for department
		var filDepts = []

		// // add to filter
		if (event.target.checked) {
			filDepts = this.state.filDepts
			filDepts.push(id)

		// remote to filter
		} else {
			filDepts = this.state.filDepts.filter(dept => dept !== id)
		}


		// now start disabling all categories except by filtered department
		var filCats = this.state.filCats
		const categories = this.state.categories.map(cat => {

			// check if there are filtered departments
			// or category's department belongs to filtered
			let isDisabled = !(
				filDepts.length <= 0 || 
				filDepts.findIndex(f => f === cat.department_id) >= 0
			)

			cat.disabled = isDisabled

			if (isDisabled && cat.isChecked) {
				cat.isChecked = false
				filCats = filCats.filter(fc => fc != cat.category_id)
			}

			return cat
		})

		this.setState({ categories, filCats, filDepts}, this.onUpdateWithFilters)
	}

	// determine what to filter
	onUpdateWithFilters() {

		// fetch the current filtered departments and categories
		let filDepts = this.state.filDepts
		let filCats = this.state.filCats

		console.log('filters : ', filDepts, filCats)
		let filters = []

		// this only means that filter by departments from its categories
		if (filCats.length === 0 && filDepts.length > 0) {
				
				this.state.categories.forEach(cat => {
					let deptCatIndex = filDepts.findIndex(dept => dept === cat.Department.department_id)

					// if this category belongs to this department then it should be filtered
					if (deptCatIndex >= 0) {
						filters.push(cat.category_id)
					}
				})

				

		// otherwise use filter by categories saved
		} else {
			filters = filCats
		}


		// update the current products
		this.props.onUpdate(filters)
	}

	render() {
		return (
			<div>
				<div className="mt-3">
					<h5>Department </h5>
					<Form>
						{this.state.departments.map(dept => (
							<Form.Check 
				        custom
								type="checkbox"
								key={`d-${dept.department_id}`}
								id={`dept-${dept.department_id}`}
								label={dept.name}
								onChange={(e) => this.onCheckDepartment(e, dept.department_id)}
				      />
						))}
					</Form>
				</div>

				<div className="mt-3">
					<h5>Category</h5>
					<Form>
						{this.state.categories.map(cat => (
							<Form.Check 
				        custom
								type="checkbox"
								key={`c-${cat.category_id}`}
								id={`cat-${cat.category_id}`}
								onChange={ (e) => this.onCheckCategory(e.target.checked, cat.category_id) }
								label={cat.name}
								disabled={cat.disabled}
								checked={cat.isChecked ? 'checked' : ''}
				      />
						))}
						
					</Form>
				</div>
			</div>
		)
	}

}

export default ProductFilter