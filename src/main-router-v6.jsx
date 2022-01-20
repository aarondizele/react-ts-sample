import React, { useState, useEffect, useReducer } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate,
    Outlet,
    useParams,
    NavLink,
    useNavigate,
    useLocation
} from 'react-router-dom'
import axios from "axios"
import { useFormik } from 'formik'
import * as Yup from "yup"
import { Letter } from 'react-letter'
import { extract } from "letterparser"
import request from './request'
import { MdiLightAccount } from './icons'

// 
axios.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
})

const mail_object = ``

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            <Route path="/mylearn" element={<Navigate replace to="/learn" />} />
            <Route path="/learn" element={<Learn />}>
                <Route path="courses" element={<Courses />}>
                    <Route path=":courseid" element={<CourseItem />} />
                </Route>
                <Route path="bundles" element={<Bundles />} />
            </Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/email" element={<ReadEmail />} />
            <Route path="/example" element={<Example />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
)

function Home() {
    return <div><h1>E-mailer</h1></div>
}

function Learn() {
    return (
        <div>
            <h1>Learn</h1>
            <h4>How to learn new skills</h4>
            <p><Link to="/learn/courses">Courses</Link>{" | "}<Link to="/learn/bundles">Bundles</Link></p>
            <Outlet />
        </div>
    )
}

function Courses() {
    const courseList = ["React", "Vue", "Angular", "Python", "NodeJS"]
    const randomCourseName = courseList[Math.floor(Math.random() * courseList.length)]

    return (
        <div>
            <h1>Course list</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae hic error corporis eaque placeat alias animi corrupti qui, voluptatem earum dicta omnis iure velit cumque, et numquam quia tempora voluptas!</p>
            <br />
            <p>More test</p>
            <div>
                <NavLink style={({ isActive }) => ({ backgroundColor: isActive ? "green" : "transparent" })} to={`/learn/courses/${randomCourseName}`}>{randomCourseName}</NavLink>{" | "}
                <NavLink style={({ isActive }) => ({ backgroundColor: isActive ? "green" : "transparent" })} to="/learn/courses/tests">Tests</NavLink>
            </div>
            <hr />
            <Outlet />
        </div>
    )
}

function Bundles() {
    return (
        <div>
            <h1>Bundle list</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla corrupti iure fuga aliquam nisi possimus nobis id? Inventore unde ut aliquid voluptate! Fugiat a quae consequatur facere laboriosam incidunt quisquam!</p>
        </div>
    )
}

function CourseItem() {
    const navigate = useNavigate()
    const { courseid } = useParams()

    return (
        <div>
            <h1>Course ID : {courseid}</h1>
            <button onClick={() => navigate("/dashboard", { state: { courseid } })}>Price</button>
            <Link to="/dashboard" state={{ "courseid": "Tests" }}>Tests</Link>
        </div>
    )
}

function Dashboard() {
    const { state } = useLocation()
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: ""
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, "Must be 15 charactes or less")
                .min(3, "Must be more than 3 characters")
                .required("First name is required"),
            email: Yup.string()
                .email("Must be an email")
                .required("Email is required")
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    })

    return (
        <div>
            <h1>Dashboard here : {state?.courseid}</h1>
            <hr />
            <form onSubmit={formik.handleSubmit}>
                <div style={{ marginBottom: 20 }}>
                    <input
                        type='text'
                        id='firstName'
                        placeholder='First name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName && <small>{formik.errors.firstName}</small>}
                </div>
                <div style={{ marginBottom: 20 }}>
                    <input
                        type='text'
                        id='lastName'
                        placeholder='Last name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                    />
                    {formik.touched.lastName && formik.errors.lastName && <small>{formik.errors.lastName}</small>}
                </div>
                <div style={{ marginBottom: 20 }}>
                    <input
                        type='email'
                        id='email'
                        placeholder='Email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && <small>{formik.errors.email}</small>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

function ReadEmail() {
    const [emails, setEmails] = useState([])

    useEffect(() => {
        fetchEmails()
    }, [])

    const fetchEmails = async () => {
        try {
            const { data } = await request.get("mailbox");
            console.log(data);
            // const parsed_data = data.map(x => x[0][1])
            // parsed_data.forEach(mailobject => {
            //   console.log(mailobject);
            //   const { html, text } = extract(mail_object)
            //   setEmails(old => [...old, { html, text }])
            // });
        } catch (error) {
            console.log(error);
        }
    }

    // No sanitization needs to be performed beforehand,
    // react-letter takes care of sanitizing the input.
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <span>Loading.... </span>
            <MdiLightAccount height="24px" width="24px" />
        </div>
        // <div>
        //   {emails.length ? emails.map((mail, idx) => <div style={{ marginBottom: 50, borderBottom: "1px solid #ccc" }}><Letter key={idx} html={mail?.html} text={mail?.text} /></div>) :
        //     <div>Loading...</div>}
        // </div>
    )
}

const INCREMENT = "increment"
const DECREMENT = "decrement"

const app_state = {
    count: 0
}

function countReducer(state, action) {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        default:
            throw new Error();
    }
}

function Example() {
    const [state, dispatch] = useReducer(countReducer, 0)

    return (
        <>
            <NavLink to="/mylearn">My learn</NavLink>
            <button onClick={() => dispatch({ type: DECREMENT })}>-</button>
            Count: {state}
            <button onClick={() => dispatch({ type: INCREMENT })}>+</button>
        </>
    )
}