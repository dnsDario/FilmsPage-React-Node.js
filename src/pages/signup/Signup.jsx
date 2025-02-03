import { Container } from "react-bootstrap";
import SignupForm from "../../components/SignupForm/SignupForm";
import './Signup.css'

export default function Signup(){
    return(
        <div className="signupDiv">
            <Container>
                <h2 className="h2signup">Regístrese para continuar</h2>
                <SignupForm className="signup"></SignupForm>
            </Container>
        </div>
    )
}