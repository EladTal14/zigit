import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { checkEmail, checkPass, postUser } from '../services/appService'
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux'
import { setUser } from "../store/appActions";

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    flexWrap: 'wrap',

  },
  margin: {
    margin: theme.spacing(2),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '30%',
  },
  button: {
    margin: theme.spacing(1),
    width: '30.5%',
  },
}));

export function Register() {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles();
  const [values, setValues] = useState({ password: '', showPassword: false, email: '' });
  const [emailCheck, setEmailCheck] = useState(false)
  const [passCheck, setPassCheck] = useState(false)

  useEffect(() => {
    setEmailCheck(checkEmail(values.email))
  }, [values.email])

  useEffect(() => {
    setPassCheck(checkPass(values.password))
  }, [values.password])

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch(setUser(values))
    history.push('/info')
  }
  return (
    <section style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
      <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
        <InputLabel htmlFor="email">Email</InputLabel>
        <OutlinedInput
          id="email"
          type='email'
          value={values.email}
          error={emailCheck !== true}
          onChange={handleChange('email')}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
          labelWidth={40}
        />
      </FormControl>
      <div style={{ marginLeft: '18px', marginTop: '-12px' }}>{!emailCheck && 'email is not in format'}</div>
      <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          error={passCheck !== true}
          onChange={handleChange('password')}
          startAdornment={
            <InputAdornment position="start">
              <VpnKeyIcon />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
      <div style={{ marginLeft: '18px', marginTop: '-9px' }}>{passCheck !== 1 ? passCheck : ""}</div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SendIcon />}
        disabled={passCheck !== true || emailCheck !== true}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </section>
  )
}
