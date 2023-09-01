import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const cookies = new Cookies();

    const handleSubmit = (e) => {
        e.preventDefault();
        // set configurations
        const configuration = {
            method: "post",
            url: "http://127.0.0.1:8000/api/login",
            data: {
                email,
                password,
            },
        };
        // make the API call
        axios(configuration)
            .then((result) => {
                console.log(result);
                setLogin(true);
                // set the cookie
                cookies.set("TOKEN", result.data.token, {
                    path: "/",
                });
                window.location.href = "/auth";
            })
            .catch((error) => {
                error = new Error();
            });
    }


    return (
        <>
            <h2>Login</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </Form.Group>

                {/* password */}
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Group>

                {/* submit button */}
                <Button className='button' variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                    Submit
                </Button>

                {/* display success message */}
                {login ? (
                    <p className="text-success">You Are Logged in Successfully</p>
                ) : (
                    <p className="text-danger">You Are Not Logged in</p>
                )}

            </Form>
        </>
    )
}