import React from 'react';
import { Bootstrap } from 'react-bootstrap-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.scss"
function Register() {
  return (
      <div className="register">
        <form>
        <div className="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="text" class="form-control" placeholder='Email' aria-label='Email' aria-describedby='email'></input>
        </div>
        </form>
      </div>
  )
}

export default Register