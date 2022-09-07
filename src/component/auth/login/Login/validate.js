//validation Rules
export const validationRules = () => {
  let passwordValidation = {
    // format: {
    //   pattern:
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_#%*?&])[A-Za-z\d@_#$!%*?&]*$/,
    //   flags: "i",
    //   message:
    //     "^Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    // },
    length: {
      minimum: 7,
      tooShort: "must contain alteast 7 character",
      maximum: 15,
      tooLong: "must contain less than 12 character",
    },
  };
  return {
    email: {
      presence: {
        allowEmpty: false,
        message: "^Email is required",
      },
      email: true,
    },
    password: {
      presence: {
        allowEmpty: false,
        message: "^Password is required",
      },
      ...passwordValidation,
    },
  };
};
