import React, { FC } from 'react';
import styles from './account.module.css';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { validateEmail, validatePassword, validateUsername } from './validate';

interface EditForm {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

const Edit: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditForm>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      avatar: '',
    },
  });

  const submit: SubmitHandler<EditForm> = () => {
    console.log('OK');
  };
  const errorHandler: SubmitErrorHandler<EditForm> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.signup}>
      <div className={styles.heading}>Edit Profile</div>

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
          <div>New Password</div>
          <input
            className={`${styles.formInput} ${errors.password &&
              styles.invalid}`}
            type='password'
            placeholder='New Password'
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

        <input className={styles.submit} type='submit' value='Save'></input>
      </form>
    </div>
  );
};

export default Edit;
