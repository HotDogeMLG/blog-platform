import { FC } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import {
  showUsernameError,
  validateEmail,
  validatePassword,
  validateUsername,
} from './validate';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import styles from './account.module.css';

interface EditForm {
  username: string;
  email: string;
  password: string;
  bio: string;
  image: string;
}

const Edit: FC = () => {
  const { username, email, bio, image } = useTypedSelector(
    (state) => state.account
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditForm>({
    defaultValues: {
      username: username,
      email: email,
      password: '',
      bio: bio,
      image: image || '',
    },
  });

  const { editProfile } = useActions();
  const token = useTypedSelector((state) => state.account.token);

  const submit: SubmitHandler<EditForm> = (data) => {
    let validated: boolean = false;
    const editData: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== '') {
        editData[key] = value;
        validated = true;
      }
    }
    if (validated) editProfile(editData, token);
  };
  const errorHandler: SubmitErrorHandler<EditForm> = (data) => {
    console.log('NOT OK', data);
  };

  const validateEditUsername = (username: string) => {
    if (username === '') return true;
    return validateUsername(username);
  };
  const validateEditEmail = (email: string) => {
    if (email === '') return true;
    return validateEmail(email);
  };
  const validateEditPassword = (password: string) => {
    if (password === '') return true;
    return validatePassword(password);
  };
  function validateUrl(value: string) {
    if (value === '') return true;
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      value
    );
  }

  const accErrors = useTypedSelector((state) => state.account.error);
  let usernameErrors: string = '';
  let emailErrors: string = '';
  if (typeof accErrors === 'object' && accErrors) {
    if ('username' in accErrors && typeof accErrors.username === 'string')
      usernameErrors = accErrors.username;
    if ('email' in accErrors && typeof accErrors.email === 'string')
      emailErrors = accErrors.email;
  }

  const loggedIn = useTypedSelector((state) => state.account.loggedIn);
  if (!loggedIn) return <Navigate to='/sign-in' />;

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
            className={`${styles.formInput} ${(errors.username ||
              usernameErrors) &&
              styles.invalid}`}
            type='text'
            placeholder='Username'
            {...register('username', {
              validate: validateEditUsername,
            })}
          ></input>
          {(errors.username || usernameErrors) && (
            <div className={styles.error}>
              {showUsernameError(watch('username'), usernameErrors)}
            </div>
          )}
        </label>

        <label>
          <div>Email address</div>
          <input
            className={`${styles.formInput} ${(errors.email || emailErrors) &&
              styles.invalid}`}
            type='email'
            placeholder='Email address'
            {...register('email', {
              validate: validateEditEmail,
            })}
          ></input>
          {(errors.email || emailErrors) && (
            <div className={styles.error}>
              {emailErrors
                ? 'Email ' + emailErrors
                : 'Please enter a correct email address'}
            </div>
          )}
        </label>

        <label>
          <div>New Password</div>
          <input
            className={`${styles.formInput} ${errors.password &&
              styles.invalid}`}
            type='password'
            placeholder='New Password'
            {...register('password', {
              validate: validateEditPassword,
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
          <div>Avatar Image (url)</div>
          <input
            className={`${styles.formInput} ${errors.image && styles.invalid}`}
            type='url'
            placeholder='Avatar image'
            {...register('image', {
              validate: validateUrl,
            })}
          ></input>
          {errors.image && (
            <div className={styles.error}>
              {errors.image && 'Please enter a correct url'}
            </div>
          )}
        </label>

        <input className={styles.submit} type='submit' value='Save'></input>
      </form>
    </div>
  );
};

export default Edit;
