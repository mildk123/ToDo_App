import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
    state = {
        open: false,
        registerForm: null
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRegisterForm = () => {
        this.setState({ open: true, registerForm: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                {!this.state.registerForm && <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
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
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
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
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="firstname"
                            label="First Name"
                            type="firstname"
                            fullWidth
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="lastname"
                            label="Last Name"
                            type="lastname"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>}
            </div>
        );
    }
}
