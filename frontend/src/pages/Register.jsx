import Form from '../components/Form.jsx'

function Register () {
    return <Form route="/api/user/register/" method="register" /> //specify the route we want to send request to and the method
}

export default Register