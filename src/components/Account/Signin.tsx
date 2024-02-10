import { FC } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from './validate';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import styles from './account.module.css';
import { useTheme } from 'antd-style';

interface SigninForm {
  email: string;
  password: string;
}

const Signin: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SigninForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { signIn } = useActions();

  const submit: SubmitHandler<SigninForm> = (data) => {
    signIn(data);
  };
  const errorHandler: SubmitErrorHandler<SigninForm> = (data) => {
    console.log(data);
  };

  const accErrors = useTypedSelector((state) => state.account.error);
  let signInError: string = '';
  if (typeof accErrors === 'object' && accErrors) {
    if (
      'email or password' in accErrors &&
      typeof accErrors['email or password'] === 'string'
    )
      signInError = accErrors['email or password'];
  }

  const theme = useTheme();

  const loggedIn = useTypedSelector((state) => state.account.loggedIn);
  if (loggedIn) return <Navigate to='/articles' />;

  return (
    <div
      className={styles.signupWrapper}
      style={{ background: theme.colorBgContainer }}
    >
      <div
        className={styles.signup}
        style={{ background: theme.colorBgElevated, color: theme.colorText }}
      >
        <div className={styles.heading}>Sign In</div>

        <form
          onSubmit={handleSubmit(submit, errorHandler)}
          className={styles.form}
        >
          <label>
            <div>Email</div>
            <input
              style={{
                background: theme.colorBgContainer,
                color: theme.colorText,
              }}
              className={`${styles.formInput} ${errors.email &&
                styles.invalid}`}
              type='text'
              placeholder='Email'
              {...register('email', {
                required: true,
                validate: validateEmail,
              })}
            ></input>
            <div className={styles.error}>
              {errors.email && 'Please enter a correct email address'}
            </div>
          </label>

          <label>
            <div>Password</div>
            <input
              style={{
                background: theme.colorBgContainer,
                color: theme.colorText,
              }}
              className={`${styles.formInput} ${errors.password &&
                styles.invalid}`}
              type='password'
              placeholder='Password'
              {...register('password', {
                required: true,
                validate: validatePassword,
              })}
            ></input>
            {errors.password && (
              <div className={styles.error}>
                {watch('password').length < 6
                  ? 'Password should be at least 6 characters'
                  : watch('password').length > 40 &&
                    'Password should be at most 40 characters'}
              </div>
            )}
          </label>
          {signInError && (
            <div className={styles.error}>Password or email is invalid</div>
          )}
          <input className={styles.submit} type='submit' value='Login'></input>
        </form>
        <div className={styles.aboutAcc}>
          <span>Don&apos;t have an account? </span>
          <Link className={styles.btn} to='/sign-up'>
            Sign Up.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
