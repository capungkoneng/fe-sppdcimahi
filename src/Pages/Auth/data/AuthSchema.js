import * as Yup from 'yup';

export const AuthSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
});