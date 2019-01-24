import React, { Component, Fragment } from 'react';

// Login Dialog 
import Dialog from '../../Helper/Dialog/'

// Material Button
import Button from '@material-ui/core/Button';

// Facebook Login

// Local CSS
import './style.css'




class AuthScreen extends Component {
    constructor() {
        super()

        this.Dialogs = React.createRef()
    }


    componentWillMount() {
        if (localStorage.getItem('userSignup')) {
            this.props.history.push('Home')
        }
    }

    onChangeHandler = (targetName, targetValue) => {
        this.setState({
            [targetName]: targetValue,
        })
    }

    showLogin = () => {
        this.Dialogs.current.handleClickOpen();
    }

    showRegister= () => {
        this.Dialogs.current.handleRegisterForm();
    }

    render() {
        return <Fragment >
            <div className="myComponent">
                <h1>ToDo App</h1>

                <Dialog ref={this.Dialogs} {...this.props}/>

                <div className='btnDiv'>
                    <Button className="btn" onClick={this.showLogin} variant="contained" color="secondary" >
                        Login
                    </Button>

                    <Button className="btn" onClick={this.showRegister} variant="contained" color="primary" >
                        Register
                    </Button>
                </div>

            </div>
        </Fragment>
    }


}

export default AuthScreen;