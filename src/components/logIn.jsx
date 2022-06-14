import React, {useRef, useState} from 'react'
import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
//import {useAuth} from './AuthContext';
import {log} from '../firebase'
import {AuthProvider} from "./AuthContext";
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
    const emailRef = useRef();
    const passRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault()


        try{
            setError('')
            setLoading(true)
            await log(emailRef.current.value, passRef.current.value);

            navigate("/");

        }

        catch{
            setError("Failed to sign in");

        }

        setLoading(false)
    }


    return(
        <div className="long">
            <AuthProvider>
                <Container className="d-flex align-items-center justify-content-center"
                           style ={{minHeight:"70vh" , minWidth:"85vh"}}>
                    <div className="w-100" style={{ maxWidth:"540px"}}>
                        <body  >

                        <Card>
                            <Card.Body>
                                <h2 className= "text-center mb-4"> Log In</h2>
                                {error && <Alert variant ="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type ="email" ref = {emailRef} required />
                                    </Form.Group>
                                    <Form.Group id="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type ="password" ref = {passRef} required />
                                    </Form.Group>
                                    <br/>
                                    <Button disabled ={loading} className="w-100" type ="userSubmit">LOG IN</Button>
                                </Form>

                                <div className="w-100 text-center mt-2">
                                    Don't Have An Account? <Link className = "signLink"to = "/signUp"> Sign Up</Link>
                                </div>
                            </Card.Body>
                        </Card>

                        </body>
                    </div>
                </Container>
            </AuthProvider>
        </div>
    )
}
