const errorMsg =  {
    required: 'This field required.',
    requiredTrue: 'This field required.',
    email: 'The email entered is invalid.',
    minlength: 'You have not reached the minimum limit of characters.',
    maxlength: 'You have exceded the maximum limit of characters.',
    pattern: 'The format used is invalid.',
    runDv: 'You must enter a valid RUN.',
    runFormat: 'The RUN must be written without dots and with a hyphen.',
    region: 'You must select a region.',
    comuna: 'You must select a commune.',
    tyc: 'You must accept our terms and conditions.',
    password: 'The password must be at least 6 characters long and only include letters and numbers.',
    passwordConfirm: 'The passwords do not match.',
}

type FormError = keyof typeof errorMsg;

export {errorMsg};
export type {FormError};