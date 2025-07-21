import React,{useState,useEffect} from 'react'
import {Form,Input,message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import '../styles/Loginpage.css';


const Login = () => {
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
     //from submit
    const submitHandler = async(values) => {
       try{
        setLoading(true);
    const {data} = await axios.post("/api/v1/users/login", values);
      setLoading(false);
  message.success('login success');  
  localStorage.setItem('user', JSON.stringify({...data.user,password:''}));
  navigate('/');    
}catch(error){
     setLoading(false);
message.error("something went wrong");
       }
    };
     //prevent for login user
        useEffect(() => {
          if(localStorage.getItem("user")){
            navigate("/");
          }
        },[navigate]);
  return (
    <>
 <div className="login-page">
  {loading && <Spinner />}
  <Form layout="vertical" className="login-form" onFinish={submitHandler}>
    <h2>Login</h2>

    <Form.Item label="Email" name="email">
      <Input type="email" />
    </Form.Item>

    <Form.Item label="Password" name="password">
      <Input type="password" />
    </Form.Item>

    <div className="form-footer">
      <Link to="/register">Not a user? Register here</Link>
      <button type="submit" className="btn">Login</button>
    </div>
  </Form>
</div>
    </>
  )
}

export default Login;