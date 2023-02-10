import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { AppConfig } from "Configs";
import { Button, TextInput } from "Components"
import { AuthSchema } from "./data/AuthSchema";
import { AuthLogin } from "Services/Auth";
import { useDispatch } from "react-redux";
import { setUsername } from "Configs/Redux/reducers";
import Logo from 'Assets/icons/logo-kota-cimahi.png';

export const Auth = () => {
    const [data] = useState({
        username: '',
        password: ''
    })
    const navigation = useNavigate();
    const dispatch = useDispatch();

    const handleOnSubmit = async (payload) => {
        try {
            const response = await AuthLogin(payload);
            if (response.data.msg) {
                dispatch(setUsername(response.data.result.username))
                AppConfig.SetToken(response.data.result.session.acces_token);
                navigation('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <main className="w-full h-screen flex">
            <section className="w-1/2 p-4 hidden md:flex lg:flex flex-col justify-center text-center items-center">
                <img src={Logo} alt="Pemkot Cimahi Logo" className="w-[250px]" />
                <h4 className="text-2xl font-bold uppercase text-orange-400 w-3/5 mt-2">
                    Pemerintah Kota Cimahi Dinas Pangan dan Pertanian
                </h4>
                <p className="font-semibold text-lg w-3/4 mt-2">
                    Jl. Raden Demang Hardjakusumah No.1, Harja Kusumah, Kec. Cimahi Utara, Kota Cimahi, Jawa Barat 40132
                </p>
            </section>

            <section className="w-full md:w-1/2 p-20 px-8 md:px-20 lg:px-32 lg:w-1/2 bg-green-500 flex flex-col justify-center">
            <Formik
                initialValues={data}
                validationSchema={AuthSchema}
                onSubmit={handleOnSubmit}
            >
                {({errors, touched, values, handleSubmit, handleChange}) => (
                    <Form>
                        <TextInput
                            id="username"
                            name="username"
                            rightIcon
                            position="bottom-2 left-2"
                            withIcon
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>

                            }
                            labelColor="text-white"
                            withLabel
                            label="Username"
                            placeholder="Username"
                            value={values.username}
                            onChange={handleChange}
                        />
                        {touched.username && errors.username && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.username}</span>}

                        <TextInput
                            id="password"
                            name="password"
                            labelColor="text-white"
                            wrapperClassName="mt-8"
                            label="Password"
                            placeholder="Password"
                            rightIcon
                            withLabel
                            position="bottom-2 left-2"
                            type="password"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                </svg>
                            }
                            value={values.password}
                            onChange={handleChange}
                        />
                        {touched.password && errors.password && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.password}</span>}

                        <Button onClick={handleSubmit} className="mt-8">
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
                </section>
        </main>
    )
}