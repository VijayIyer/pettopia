import { useEffect, useState, useContext } from 'react';
import { loginFields } from "./constants/formFields";
import { useNavigate, state , useLocation} from 'react-router-dom';
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import ErrorMessage from './ErrorMessage';
import AppContext from '../../AppContext';

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const backendUrl = process.env.REACT_APP_URL
    const navigate = useNavigate();
    const [loginState,setLoginState]=useState(fieldsState);
    const [loginError, setLoginError] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState(null);
    // const { authToken, setAuthToken } = useContext(AppContext);
    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
        setLoginError(false);
        setLoginErrorMessage(null);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = () =>{
        let loginFields={
                email:loginState['email-address'],
                password:loginState['password']
        };
        const endpoint=`${backendUrl}/api/v1/auth/login`;
        fetch(endpoint,
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(loginFields)
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.ok){

            //API Success from LoginRadius Login API
            // setAuthToken(data.token);
            localStorage.setItem('token', data.token)
            navigate(-1);
            }
            else{
                console.log(data);
                setLoginError(true);
                setLoginErrorMessage(data.msg);
            }
         })
        .catch(error=>console.log(error))
     }

    return(
        <div>
        <form className="w-[60%] mx-auto mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>

        <FormExtra/>
        {loginError && <ErrorMessage text={loginErrorMessage} />}
        <FormAction handleSubmit={handleSubmit} text="Login"/>
        
      </form>
      </div>
    )
}

