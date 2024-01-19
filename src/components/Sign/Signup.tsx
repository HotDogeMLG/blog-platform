import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './signup.module.css';

const Signup: FC = () => {
  return (
    <div className={styles.signup}>
      <div className={styles.heading}>Create new account</div>

      <form className={styles.form}>
        <label>
          <div>Username</div>
          <input
            className={styles.formInput}
            type='text'
            placeholder='Username'
          ></input>
        </label>
        <label>
          <div>Email address</div>
          <input
            className={styles.formInput}
            type='email'
            placeholder='Email address'
          ></input>
        </label>
        <label>
          <div>Password</div>
          <input
            className={styles.formInput}
            type='password'
            placeholder='Password'
          ></input>
        </label>
        <label>
          <div>Repeat password</div>
          <input
            className={styles.formInput}
            type='password'
            placeholder='Password'
          ></input>
        </label>
        <label className={styles.personalInfo}>
          <input className={styles.checkboxInput} type='checkbox'></input>
          <div className={styles.checkbox}>
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
          I agree to the processing of my personal information
        </label>
        <input className={styles.submit} type='submit' value='Create'></input>
      </form>
      <div className={styles.aboutAcc}>
        <span>Already have an account? </span>
        <Link className={styles.btn} to='/signin'>
          Sign In.
        </Link>
      </div>
    </div>
  );
};

export default Signup;
