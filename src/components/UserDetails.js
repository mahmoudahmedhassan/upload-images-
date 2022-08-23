import React from 'react';
import Users from './Users'
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
import { gitUsersData } from '../redux/actions/usersActions'
import { Col, Container, Row } from 'react-bootstrap';

function UserDetails() {
  const dispatch = useDispatch();

   const validate = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
  })
  return (
    <div className='userDetails'>
      <Container>
        <Row>
          <Col lg={6}>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                uploadPhoto: '',
               }}
              validationSchema={validate}
              onSubmit={(values,{ resetForm }) => {
                console.log(values)
                dispatch(gitUsersData(values))
                resetForm({ values: '' });
              }}
            >

              {(formik) => (
                <div>
                  <h1 className="my-4 font-weight-bold .display-4">User Interface</h1>
     
                  <Form >
                     <Row>
                      <Col lg={6}>
                        <TextField name="firstName" type="text" placeholder="First Name" />
                      </Col>
                      <Col lg={6}>
                        <TextField name="lastName" type="text" placeholder="Last Name" />
                      </Col>
                      <Col lg={12}>
                        <TextField name="email" type="email" placeholder="Email" email='email' />
                      </Col>
                    </Row>

                    <div className="buts">
                      <button className="btn btn-dark mt-3" type="submit">Register</button>
                      <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                    </div>
                  </Form>

                </div>
              )}

            </Formik>
          </Col>

          {/*  */}

          <Col lg={6}>
            <Row>
            <Users/>
            </Row>
          </Col>
        </Row>
      </Container>
 
    </div >
  )
}

export default UserDetails