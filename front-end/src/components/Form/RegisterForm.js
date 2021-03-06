import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from './Copyright';
import renderText from '../Render/renderText';
import renderCheckbox from '../Render/renderCheckbox';
import { Field, reduxForm } from 'redux-form';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegisterForm = (props) => {
  const { handleSubmit, onSubmit } = props;
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원 가입
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                      <Grid item xs={12}>
                          <Field type="text" name="realname" component={renderText} label="이름" />
                      </Grid>
                      <Grid item xs={12}>
                          <Field type="text" name="unit" component={renderText} label="소속" />
                      </Grid>
                      <Grid item xs={12}>
                          <Field type="text" name="username" component={renderText} label="아이디" />
                      </Grid>
                      <Grid item xs={12}>
                          <Field type="password" name="password" component={renderText} label="비밀번호" />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Field type="checkbox" id="pro" name="pro" component="input" value="false"/>}
                          label="전문 상담사 확인 여부"
                        />
                      </Grid>
                  </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
              회원가입하기
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                이미 가입하셨나요? 로그인 하기
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

  const validateSignUp = (values) => {
    const errors = {};
  
    const requiredFields = ['name', 'unit', 'id', 'password', 'pro'];
    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = '(The ' + field + ' field is required.)';
      }
    });
  
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = '(Invalid email address.)';
    }
    return errors;
  };

  export default reduxForm({
    form: 'RegisterForm', // a unique identifier for this form
    validate: validateSignUp, // ←Callback function for client-side validation
  })(RegisterForm);
