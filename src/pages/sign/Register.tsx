import axios from "axios";
import { FormEvent, SyntheticEvent, useReducer, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { PrimaryButton, TextField } from "@fluentui/react";

export default function Register() {
    // const [state, dispatch] = useReducer(userReducer, userState);

    // REF
    const formRef = useRef<HTMLFormElement | null>(null);

    // STATES
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<Object[]>([]);
    const [error, setError] = useState<string | null>(null);

    // FUNCTIONS
    const onLogin = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const target = e.target as typeof e.target & {
                lastname: { value: string };
                middlename: { value: string };
                firstname: { value: string };
                email: { value: string };
                password: { value: string };
                password_confirmation: { value: string };
            }
            const lastname = target.lastname.value;
            const middlename = target.middlename.value;
            const firstname = target.firstname.value;
            const password_confirmation = target.password_confirmation.value;
            const email = target.email.value;
            const password = target.password.value;

            const res = await axios.post('http://127.0.0.1:8000/api/register', {
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    lastname,
                    middlename,
                    firstname,
                    password_confirmation,
                })
            })

            console.log(res.data());

        } catch (err: any) {
            console.error("Error: ", err);
            // setError(err.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Login page</h1>
            {error && <p>{error}</p>}
            <form ref={formRef} onSubmit={onLogin}>
                <TextField label="Nom" name="lastname" required />
                <TextField label="Post-nom" name="middlename" />
                <TextField label="Prénom" name="firstname" required />
                <TextField type="email" label="Email" name="email" required />
                <TextField label="Nom" name="lastname" required />

                
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input type={showPassword ? 'text' : 'password'} name="password" id="password" required />
                </div>
                <div>
                    <label htmlFor="password_confirmation">Confirmer le mot de passe</label>
                    <input type={showPassword ? 'text' : 'password'} name="password_confirmation" id="password_confirmation" required />
                </div>
                <a onClick={() => setShowPassword(v => v = !v)}>Show/Hide</a>
                <button type="submit" disabled={loading}>{loading ? '...' : 'S\'inscrire'}</button>
            </form>
        </div>
    )
}