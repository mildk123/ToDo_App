import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
    constructor() {
        super()
        this.state = {
            open: false,
            registerForm: null
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRegisterForm = () => {
        this.setState({ open: true, registerForm: true });
    };

    handleClose = () => {
        this.setState({
            open: false,
            registerForm: null,
        });
    };

    handleRegister = () => {
        debugger
        let email = this.state.email;
        let password = this.state.password;
        let firstname = this.state.firstname;
        let lastname = this.state.lastname;
        // Register
        if (email && password && firstname && lastname) {

            this.setState({
                open: false,
                registerForm: null,
                isloading: true
            }, () => {
                fetch("/auth/reg", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        firstname: firstname,
                        lastname: lastname,
                    })
                })
            })
        } else {
            alert('Please fill all the boxes!')
        }
    }

    handleLogin = () => {
        debugger
        // Login
        let email = this.state.email;
        let password = this.state.password;
        if (email && password) {

            this.setState({
                open: false,
                isloading: true
            }, () => {
                fetch("/auth/login", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    })
                })
            })
        } else {
            alert('Please fill all the boxes!')
        }
    }

    render() {
        return (
            <div>
                {!this.state.registerForm && <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>

                        <DialogContentText>
                            Fill in your credentials to login.
            </DialogContentText>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            onChange={(text) => { this.setState({ email: text.target.value }) }}
                        />

                        <TextField
                            margin="dense"
                            label="Password"
                            fullWidth
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            onChange={(text) => { this.setState({ password: text.target.value }) }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleLogin} color="primary">
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>}

                {this.state.registerForm && <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create Account</DialogTitle>
                    <DialogContent>

                        <DialogContentText>
                            Fill in your credentials to signup.
            </DialogContentText>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            onChange={(text) => { this.setState({ email: text.target.value }) }}
                        />

                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            onChange={(text) => { this.setState({ password: text.target.value }) }}
                        />

                        <TextField
                            margin="dense"
                            id="firstname"
                            label="First Name"
                            type="firstname"
                            fullWidth
                            onChange={(text) => { this.setState({ firstname: text.target.value }) }}
                        />

                        <TextField
                            margin="dense"
                            id="lastname"
                            label="Last Name"
                            type="lastname"
                            fullWidth
                            onChange={(text) => { this.setState({ lastname: text.target.value }) }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleRegister} color="primary">
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>}
            </div>
        );
    }
}
