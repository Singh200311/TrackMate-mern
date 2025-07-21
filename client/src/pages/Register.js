import React,{useState,useEffect} from 'react';
import {Form,Input, message} from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import '../styles/RegisterPage.css'; // ✅ Adjust path if needed


const Register = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    //from submit
    const submitHandler = async(values) => {
  console.log("Submitting register form:", values);
    try{
        setLoading(true);
 await axios.post("/api/v1/users/register", values);
  message.success('Registration Successful');
  setLoading(false);
  navigate('/login');

    }catch(error) {
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
  <div className="register-page">
    {loading && <Spinner/>}
  <Form layout='vertical' className="register-form" onFinish={submitHandler}>
  <h2>Register Form</h2>
  <Form.Item label="Name" name="name">
    <Input />
  </Form.Item>
  <Form.Item label="Email" name="email">
    <Input type="email" />
  </Form.Item>
  <Form.Item label="Password" name="password">
    <Input type="password" />
  </Form.Item>
  <div className="form-footer">
    <Link to="/login">Already registered? Login</Link>
    <button className="btn" type="submit">Register</button>
  </div>
</Form>
   </div>
    </>
  ); 
};

export default Register;