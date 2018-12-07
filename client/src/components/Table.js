import React from 'react';
import Button from './Button';

const Table = ({ tenants, handleClick }) => {
	let rowNum = 0;
	
	return (
		<table className="table table-hover">
		  	<thead>
		    	<tr>
		      		<th scope="col">#</th>
		      		<th scope="col">Full Name</th>
		      		<th scope="col">Phone Number</th>
		      		<th scope="col">Address</th>
		      		<th scope="col">Financial Debt</th>
		      		<th scope="col"></th>
		      		<th scope="col"></th>
		    	</tr>
		  	</thead>
		  	<tbody>
		  		{
		  			tenants.map(tenant => {
		  				rowNum++;
		  				return tenant ?
		  				(
		  					<tr key={tenant._id}>
					      		<th scope="row">{rowNum}</th>
					      		<td>{tenant.fullname}</td>
					      		<td>{tenant.phoneNumber}</td>
					      		<td>{tenant.address}</td>
					      		<td>{tenant.financialDebt}</td>
					      		<td>
			                        <Button className={'btn btn-sm btn-dark w-75'} id={tenant._id} buttonName={'editTenant'} handleClick={handleClick} buttonText={'Update'}/>
					      		</td>
					      		<td>
			                        <Button className={'btn btn-sm btn-danger w-75'} id={tenant._id} buttonName={'deleteTenant'} handleClick={handleClick} buttonText={'Delete'}/>
					      		</td>
					    	</tr>
	  					) : 
	  					null;
		  			})
		  		}
		  	</tbody>
		</table>
	);
}

export default Table;