import { FC } from 'react';
import styles from './account.module.css';
import { Link } from 'react-router-dom';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from './validate';

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

  const submit: SubmitHandler<SigninForm> = () => {
    console.log('OK');
  };
  const errorHandler: SubmitErrorHandler<SigninForm> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.signup}>
      <div className={styles.heading}>Sign In</div>

      <form
        onSubmit={handleSubmit(submit, errorHandler)}
        className={styles.form}
      >
        <label>
          <div>Email</div>
          <input
            className={`${styles.formInput} ${errors.email && styles.invalid}`}
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
        <input className={styles.submit} type='submit' value='Login'></input>
      </form>
      <div className={styles.aboutAcc}>
        <span>Don&apos;t have an account? </span>
        <Link className={styles.btn} to='/sign-up'>
          Sign Up.
        </Link>
      </div>
    </div>
  );
};

export default Signin;
