import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './account.module.css';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { validateEmail, validatePassword, validateUsername } from './validate';

interface MyForm {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  agreed: boolean;
}

const Signup: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MyForm>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const submit: SubmitHandler<MyForm> = () => {
    console.log('OK');
  };
  const errorHandler: SubmitErrorHandler<MyForm> = (data) => {
    console.log(data);
  };

  const validateRepeatedPassword = (repeatedPassword: string) => {
    if (
      repeatedPassword === watch('password') &&
      repeatedPassword.length >= 6 &&
      repeatedPassword.length <= 40
    )
      return true;
    return false;
  };

  const showPasswordError = (repeatPswrd: string) => {
    if (repeatPswrd.length < 6)
      return 'Password should be at least 6 characters';
    else if (repeatPswrd.length > 40)
      return 'Password should be at most 40 characters';
    else if (repeatPswrd !== watch('password')) return 'Passwords must match';

    return '';
  };

  return (
    <div className={styles.signup}>
      <div className={styles.heading}>Create new account</div>

      <form
        className={styles.form}
        onSubmit={handleSubmit(submit, errorHandler)}
      >
        <label>
          <div>Username</div>
          <input
            className={`${styles.formInput} ${errors.username &&
              styles.invalid}`}
            type='text'
            placeholder='Username'
            {...register('username', {
              required: true,
              validate: validateUsername,
            })}
          ></input>
          {errors.username && (
            <div className={styles.error}>
              {watch('username').length < 3
                ? 'Username should be at least 3 characters'
                : watch('username').length > 20 &&
                  'Username should be at most 20 characters'}
            </div>
          )}
        </label>

        <label>
          <div>Email address</div>
          <input
            className={`${styles.formInput} ${errors.email && styles.invalid}`}
            type='email'
            placeholder='Email address'
            {...register('email', { required: true, validate: validateEmail })}
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

        <label>
          <div>Repeat password</div>
          <input
            className={`${styles.formInput} ${errors.repeatPassword &&
              styles.invalid}`}
            type='password'
            placeholder='Password'
            {...register('repeatPassword', {
              required: true,
              validate: validateRepeatedPassword,
            })}
          ></input>
          {errors.repeatPassword && (
            <div className={styles.error}>
              {showPasswordError(watch('repeatPassword'))}
            </div>
          )}
        </label>

        <label className={styles.personalInfo}>
          <input
            className={styles.checkboxInput}
            type='checkbox'
            {...register('agreed', { required: true })}
          ></input>
          <div
            className={`${styles.checkbox} ${errors.agreed && styles.invalid}`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              width='100'
              height='100'
              viewBox='0,0,256,256'
            >
              <g
                fill='#ffffff'
                fillRule='nonzero'
                stroke='none'
                strokeWidth='1'
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit='10'
                strokeDasharray=''
                strokeDashoffset='0'
                fontFamily='none'
                fontWeight='none'
                fontSize='none'
                textAnchor='none'
              >
                <g transform='scale(9.84615,9.84615)'>
                  <path d='M22.56641,4.73047l-1.79297,-1.21875c-0.49609,-0.33594 -1.17578,-0.20703 -1.50781,0.28516l-8.78906,12.96094l-4.03906,-4.03906c-0.42187,-0.42187 -1.10937,-0.42187 -1.53125,0l-1.53516,1.53516c-0.42187,0.42188 -0.42187,1.10938 0,1.53516l6.21094,6.21094c0.34766,0.34766 0.89453,0.61328 1.38672,0.61328c0.49219,0 0.98828,-0.30859 1.30859,-0.77344l10.57813,-15.60547c0.33594,-0.49219 0.20703,-1.16797 -0.28906,-1.50391z'></path>
                </g>
              </g>
            </svg>
          </div>
          <span className={errors.agreed && styles.error}>
            I agree to the processing of my personal information
          </span>
        </label>
        <input className={styles.submit} type='submit' value='Create'></input>
      </form>
      <div className={styles.aboutAcc}>
        <span>Already have an account? </span>
        <Link className={styles.btn} to='/sign-in'>
          Sign In.
        </Link>
      </div>
    </div>
  );
};

export default Signup;
