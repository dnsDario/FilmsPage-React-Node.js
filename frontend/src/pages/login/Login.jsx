import { Container } from "react-bootstrap";
import LoginForm from "../../components/LoginForm/LoginForm";
import './Login.css'

export default function Login(){
    return (
      <div className="loginDiv">
        <Container>
          <h2 className="h2login">Entre en su cuenta personal</h2>
          <LoginForm></LoginForm>
        </Container>
      </div>
    );
   
}