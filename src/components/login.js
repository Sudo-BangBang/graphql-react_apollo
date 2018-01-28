import React from 'react'
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    render() {
        if("authToken" in localStorage && "authUsername" in localStorage) {
            return(
                <div className="login">
                    <span style={{color:"#9E9E9E"}}>logged in as </span>{localStorage.getItem("authUsername")}
                    <div style={{paddingTop: "5px"}}>
                        <button className="button-secondary" onClick={this.handleLogout}>logout</button>
                    </div>

                </div>
            )
        }else{
            return (
                <div className="login">
                    <input type="text" placeholder="username"
                           value={this.state.username}
                           onChange={e => this.setState({username: e.target.value})}/>
                    <input type="text" placeholder="password"
                           value={this.state.password}
                           onChange={e => this.setState({password: e.target.value})}/>
                    <div>
                        <div style={{paddingTop: "5px"}}>
                            <button className="button-primary" onClick={this.handleLogin}>login</button>
                            <button className="button-secondary" onClick={this.handleSignup}>sign-up</button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    handleLogin = async () => {
        const {username, password} = this.state;
        let response = await this.props.loginMutation({variables: {email: username, password}});
        localStorage.setItem("authToken", response.data.signinUser.token);
        localStorage.setItem("authUsername", response.data.signinUser.user.name);
        this.setState({username:"", password: ""});
    }

    handleLogout(){
        this.setState({username:"", password: ""});
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUsername");

    }

    handleSignup = async () => {
        const {username, password} = this.state;
        await this.props.signupMutation({variables: {email: username, password}});
        this.handleLogin();
    }
}

const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        signinUser(auth:{email: $email, password: $password}){
            user{
              name
              password
              id
              email
            }
            token
        }
    }
`;
const SIGNUP_MUTATION = gql`
    mutation SignupMutation($email: String!, $password: String!) {
        createUser(name: $email, auth:{email: $email, password: $password}){
          name
          password
        }
    }
`;

const LoginWithMutation = compose(
    graphql(LOGIN_MUTATION, {name: 'loginMutation'}),
    graphql(SIGNUP_MUTATION, {name: 'signupMutation'})

)(Login);

export default LoginWithMutation
