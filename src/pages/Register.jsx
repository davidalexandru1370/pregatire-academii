import React from 'react';
import { Bootstrap } from 'react-bootstrap-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.scss"
function Register() {
  return (
          <div className='register'>
          <form >
          <div className="form-group">
          <div className='mt-5'>
            <label for= "name">Adresa de email</label>
            <input type="text" className="form-control" id='name' placeholder='Email' aria-label='email' />
          </div>
          <div className='mt-5'>

            <label for='password'>Parola</label>
            <input type="text" id='password' className='form-control' placeholder='Parola' aria-label='password' />
          </div>
          <div className='mt-5'>

            <label for="repeatpassword">Repeta parola</label>
            <input type="text"  id='repeatpassword' className='form-control' placeholder='Repeta parola' aria-label='password'/>
          </div>
            <button className='register-btn btn mt-3 d-flex justify-content-center '>Creeaza cont</button>
          </div>
          </form>
        </div>
  )
}

export default Register