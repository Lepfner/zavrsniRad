import React, {useEffect} from 'react'
import Content from './Content'
import Header from './Header'
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    const navigate = useNavigate();

    function checkUserToken() {
        if (localStorage.getItem("isLoggedIn") === 'false') {
          return navigate('/login');
        }
    }

    useEffect(() => {
        checkUserToken();
    })

    const visibility= localStorage.getItem("vis")
    return (
        <div className='h-screen w-full'>
            <Header visible={visibility}/>
            <div className='h-5/6 w-full flex justify-center'>
                <div className="h-full lg:w-full md: w-10/12">
                    <Content/>
                </div>
            </div>
        </div>
    )
}
