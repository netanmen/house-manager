import React from 'react';
import Button from './Button';
import SearchBox from './SearchBox';

const NavBar = ({ handleClick, searchChange, searchfield, isDropDownOpen, isLoggedIn }) => {
    return (
        isLoggedIn
        ?   (
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark mb-4">
                 <Button className={'navbar-brand bg-dark border-0'} id={''} buttonName={'home'} 
                                    buttonText={'House Manager'} handleClick={handleClick}
                />
                <button className="navbar-toggler show" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Button className={'btn btn-info my-2 my-sm-0 mr-3 align'} id={''} buttonName={'createTenant'} 
                                    buttonText={'Add Tenant'} handleClick={handleClick}
                />
                <SearchBox className='form-control mr-sm-5' searchChange={searchChange} searchfield={searchfield}/>
                <div className="collapse navbar-collapse ml-3" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item dropdown">
                                    <div className="btn-group" name={'debtDropdown'}>
                                        <Button className={'btn btn-outline-light my-2 my-sm-0'} id={''} buttonName={'debtDropdown'} 
                                            buttonText={'Debt Filter'} handleClick={handleClick}
                                        />
                                        <div className={"dropdown-menu " + (isDropDownOpen ? 'show' : '')}>
                                            <Button className={'dropdown-item'} id={''} buttonName={'withDebt'} 
                                            buttonText={'Tenants with debts'} handleClick={handleClick}
                                            />
                                            <Button className={'dropdown-item'} id={''} buttonName={'withoutDebt'} 
                                                buttonText={'Tenants without debts'} handleClick={handleClick}
                                            />
                                            <div className="dropdown-divider"></div>
                                            <Button className={'dropdown-item'} id={''} buttonName={'clearDebtFilter'} 
                                                buttonText={'Clear debt filter'} handleClick={handleClick}
                                            />
                                        </div>
                                    </div>
                                </li>
                                <Button className={'btn btn-outline-light ml-3 border-0'} id={''} buttonName={'clearAllFilters'} 
                                    buttonText={'Clear filters'} handleClick={handleClick}
                                />
                            </ul>
                    <form className="form-inline my-2 my-lg-0" style={{ minWidth: '5.5rem' }}>
                        <Button className={'btn btn-outline-light my-2 my-sm-0 w-100'} id={''} buttonName={isLoggedIn ? 'logout' : 'login'} 
                                    buttonText={isLoggedIn ? 'Log out' : 'Log in'} handleClick={handleClick}
                        />
                    </form>
                 </div>
            </nav>
            )
        :   (
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark mb-4">
                 <Button className={'navbar-brand bg-dark border-0'} id={''} buttonName={'home'} 
                                    buttonText={'House Manager'} handleClick={handleClick}
                />
                <button className="navbar-toggler show" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ml-3" id="navbarSupportedContent">
             
                            <ul className="navbar-nav mr-auto">
                            </ul>
                    <form className="form-inline my-2 my-lg-0" style={{ minWidth: '5.5rem' }}>
                        <Button className={'btn btn-outline-light my-2 my-sm-0 w-100'} id={''} buttonName={isLoggedIn ? 'logout' : 'login'} 
                                    buttonText={isLoggedIn ? 'Log out' : 'Log in'} handleClick={handleClick}
                        />
                    </form>
                 </div>
            </nav>
            )     
    );
}

export default NavBar;


