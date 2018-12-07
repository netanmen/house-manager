import React from 'react';
import Button from './Button';

const Form = ({ handleChange, handleSubmit, handleClick, form, isLoggedIn, route, errorMessage}) => {
	const { username, password, fullname, phoneNumber, address, financialDebt} = form;
	
	return (
		<div className=''>
			<div className='custom-font d-flex flex-column mb-5'>
				<h1 className=''>{isLoggedIn ? 'Please fill the tenant form' : 'Welcome to House Manager'}</h1>
				<h1 className=''>{route}</h1>
				<h4 className='align-self-center'>{route === '/auth/login' ? 'Please Login...' : 'Register a new user...' }</h4>
				{errorMessage ? <h5 className='align-self-center text-danger'>{errorMessage}</h5> : null}
			</div>
			<form method='POST' onSubmit={handleSubmit} className='border rounded bg-light p-4' name='submit-form'>
			{
				!isLoggedIn
				?	(<div>
						<div className='d-flex mt-3 mb-4 justify-content-around'>
							<Button className={'btn btn-' + (route === '/auth/login' ? '' : 'outline-') + 'info my-2 my-sm-0 w-50 mr-2'} 
								buttonName={'login'} buttonText={'Log in'} handleClick={handleClick}
		                    />
							<Button className={'btn btn-' + (route === '/auth/register' ? '' : 'outline-') + 'info my-2 my-sm-0 w-50 mr-2'}  
								buttonName={'register'} buttonText={'Register'} handleClick={handleClick}
		                    />
						</div>
						<div className="form-group bg-transparent">
							<label htmlFor="username">Username</label>
							<input type="text" className="form-control custom-bg" required='required' name='username' autoComplete='username' 
								value={username} onChange={handleChange} placeholder="Enter username"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input type="password" className="form-control" required='required' autoComplete='current-password' 
								name='password' value={password} onChange={handleChange} placeholder="Password"
							/>
						</div>
					</div>) 
				: 	(<div>
						<div className="form-group">
							<label htmlFor="fullname">Full Name</label>
							<input type="text" className="form-control" required name='fullname' value={fullname} onChange={handleChange} placeholder="Enter full name"/>
						</div>
						<div className="form-group">
							<label htmlFor="phoneNumber">Phone Number</label>
							<input type="tel" className="form-control" required name='phoneNumber' value={phoneNumber} onChange={handleChange} placeholder="Phone number"/>
						</div>
						<div className="form-group">
							<label htmlFor="address">Address</label>
							<input type="text" className="form-control" required name='address' value={address} onChange={handleChange} placeholder="Address"/>
						</div>
						<div className="form-group">
							<label htmlFor="financialDebt">Financial Debt</label>
							<input type="number" className="form-control" required name='financialDebt' value={financialDebt} onChange={handleChange} placeholder="Financial debt"/>
						</div>
					</div>)
			}

				<div>
				<div className='d-flex mb-3 mt-5 justify-content-center'>
					<Button className={'btn btn-lg btn-dark my-2 my-sm-0 w-50'}  buttonName={'submit'} 
                        buttonText={'Submit'} handleClick={handleSubmit}
                    />
				</div>
				</div>
			</form>
		</div>
	);
}

export default Form;