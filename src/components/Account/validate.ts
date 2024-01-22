export const validateEmail = (email: string) => {
  const validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(validRegex)) return true;
  return false;
};

export const validatePassword = (password: string) => {
  if (password.length >= 6 && password.length <= 40) return true;
  return false;
};

export const validateUsername = (username: string) => {
  if (username.length >= 3 && username.length <= 20) return true;
  return false;
};
