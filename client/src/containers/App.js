import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from '../components/NavBar';
import Form from '../components/Form';
import Table from '../components/Table';
import Scroll from '../components/Scroll';

class App extends Component {
    constructor(props) {
        super();
        this.state = {
            route: '/auth/login',
            errorMessage: '',
            token: '',
            isLoggedIn: false,
            tenants: [
                {
                    _id: '',
                    fullname: '',
                    phoneNumber: '',
                    address: '',
                    financialDebt: 0
                }
            ],
            searchfield: '',
            isDropDownOpen: false,
            dropDownFilter: '',
            userForm: {
                _id: '',
                username: '',
                password: ''
            },
            tenantForm: {
                _id: '',
                fullname: '',
                phoneNumber: '',
                address: '',
                financialDebt: 0
            }
        };
    }

    fetchTenants = () => {
        if (this.state.isLoggedIn) {
            fetch('/tenants/list', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': 'JWT ' + this.state.token
                }            
            })
            .then(res => {
                return res.json();
            })
            .then(fetchedTenants => {
                // this.setState({ tenants: fetchedTenants, route: '/tenants/list' });
                this.setState({ tenants: fetchedTenants });
            })
            .catch(err => console.log('componentDidMount-error:', err));
        }
    }

    handleClick = (e) => {
        this.setState({ isDropDownOpen: false });
        switch(e.target.name) {
            case 'register':
                this.setState({ route: '/auth/register' });
                break;
            case 'login':
                this.setState({ route: '/auth/login' });
                break;
            case 'logout':
                this.setState({ isLoggedIn: false });
                this.fetchPostRequest('/auth/logout', this.state.userForm, '/auth/login');
                this.setState({ searchfield: '', dropDownFilter: '' });
                break;
            case 'home':
                if (this.state.isLoggedIn) {
                    this.setState({ route: '/tenants/list' , searchfield: '', dropDownFilter: '' });
                } else {
                    this.setState({ route: '/auth/login' });
                }
                break;
            case 'createTenant':
                this.setState({ route: '/tenants/create', searchfield: '', dropDownFilter: '' });
                break;
            case 'editTenant':
                const tenantToEditId = e.target.id;
                const tenantToEdit = this.state.tenants.filter(tenant => tenant._id === tenantToEditId)[0];
                this.setState({ route: '/tenants/edit', tenantForm: tenantToEdit, searchfield: '', dropDownFilter: '' });
                break;
            case 'deleteTenant':
                const tenantToDeleteId = e.target.id;
                const tenantToDelete = this.state.tenants.filter(tenant => tenant._id === tenantToDeleteId)[0];
                this.fetchPostRequest('/tenants/delete', tenantToDelete, '/tenants/list');
                break;
            case 'debtDropdown':
                this.setState({ isDropDownOpen: !this.state.isDropDownOpen });
                break;
            case 'withDebt':
                this.setState({ dropDownFilter: 'withDebt' });
                break;
            case 'withoutDebt':
                this.setState({ dropDownFilter: 'withoutDebt' });
                break;
            case 'clearDebtFilter':
                this.setState({ dropDownFilter: '' });
                break;
            case 'clearAllFilters':
                this.setState({ searchfield: '', dropDownFilter: '' });
                break;
            default:
                console.log('handleClick-default', 'in handleClick-default.. something went wrong?');
        }
    }

    handleChange = (e) => {
        const { isLoggedIn } = this.state;
        const formToUpdate = isLoggedIn ? this.state.tenantForm : this.state.userForm;
        formToUpdate[e.target.name] = e.target.value;
        if (isLoggedIn) {
            this.setState({ tenantForm: formToUpdate });
        } else {
            this.setState({ userForm: formToUpdate });
        }
    }

    onTextChanged = (e) => {
        this.setState({ searchfield: e.target.value.toLowerCase()});
        
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { isLoggedIn, route, userForm, tenantForm } = this.state;
        const formToSubmit = isLoggedIn ? tenantForm : userForm;
        let routeAfterPostRequest;
        switch(route) {
            case '/tenants/create':
            case '/tenants/edit':
            case '/tenants/delete':
            case '/auth/login':
                routeAfterPostRequest = '/tenants/list';
                break;
            case '/auth/register':
            case '/auth/logout':
                routeAfterPostRequest = '/auth/login';
                break;
            default:
        }
        this.fetchPostRequest(route, formToSubmit, routeAfterPostRequest);
    }

     fetchPostRequest = (route, data, routeAfterPostRequest) => {
        fetch(`${route}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
              'authorization': 'JWT ' + this.state.token
            }            
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.errorMessage) {
                this.setState({ errorMessage: data.errorMessage });
            } else {
                let userId = this.state.userForm._id;
                let username = this.state.userForm.username;

                if (data.user) {
                    userId = data.user._id;
                    username = data.user.username;
                }
                if (route === '/auth/logout') {
                    userId = '';
                    username = '';
                }
                const token = this.state.token;
                this.setState({ 
                    isLoggedIn: (route.includes('/tenants') || (route === '/auth/login' && data.token)) ? true : false,
                    errorMessage: '',
                    token: data.token ? data.token : token,
                    route: !data.errorMessage ? routeAfterPostRequest : route,
                    tenantForm: {
                        _id: '',
                        fullname: '',
                        phoneNumber: '',
                        address: '',
                        financialDebt: ''
                    },
                    userForm: {
                        _id: userId,
                        username: username,
                        password: ''
                    }
                }
                , () => this.fetchTenants());
            }
        })
        .catch(err => console.log('handleSubmit-error:', err));
        if (!this.state.errorMessage) {
            this.fetchTenants();
        }
    }

    applyTenantFilters = (tenants, dropDownFilter, searchfield) => {
         let filteredTenants = tenants;
        if (dropDownFilter === 'withDebt') {
            filteredTenants = filteredTenants.filter(tenant => {
                return Number(tenant.financialDebt) > 0
            });
        } else if (dropDownFilter === 'withoutDebt') {
            filteredTenants = filteredTenants.filter(tenant => {
                return Number(tenant.financialDebt) <= 0
            });
        }
        if (searchfield !== '') {
            filteredTenants = filteredTenants.filter(tenant => {
                   return tenant.fullname.toLowerCase().includes(searchfield);
            });
        }
        return filteredTenants;
    }

    render() {
        const { route, tenants, searchfield, dropDownFilter, isDropDownOpen, userForm, tenantForm, isLoggedIn, errorMessage } = this.state;

        const filteredTenants = this.applyTenantFilters(tenants, dropDownFilter, searchfield);

        return (
            <div className=''>   
                <NavBar handleClick={this.handleClick} searchChange={this.onTextChanged} searchfield={searchfield} 
                    isDropDownOpen={isDropDownOpen} route={route} isLoggedIn={isLoggedIn}
                />
                <div className='d-flex flex-column align-items-center'>
                    {(isLoggedIn && route === '/tenants/list')
                    ?   (
                            <div className='d-flex flex-column align-items-center mt-4' style={{width: '90%'}}>
                                <h2 className='custom-font align-self-start mb-5'>
                                    Total tenants in table: {tenants && tenants.length ? filteredTenants.length + '/' + tenants.length : 'No entries yet...'}
                                </h2>
                                {
                                    (tenants && tenants.length 
                                    ?   <Scroll>
                                            <Table tenants={filteredTenants} handleClick={this.handleClick}/>
                                        </Scroll>
                                    : null)
                                }
                            </div>
                        ) 
                    :   <Form handleChange={this.handleChange} handleClick={this.handleClick} isLoggedIn={isLoggedIn} errorMessage={errorMessage}
                            form={isLoggedIn ? tenantForm : userForm} handleSubmit={this.handleSubmit} route={route}
                        />
                    }
                </div>
            </div>
        );
    }
}

export default App;