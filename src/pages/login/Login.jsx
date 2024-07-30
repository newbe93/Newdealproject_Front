import React, { useEffect, useState } from "react";
import CHEVRON_LEFT_SOLID from "@assets/icons/chevron-left-solid.svg"
import axios from "axios";
import LOGO from '@assets/logo.png'
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "@zustand/authStore";
import anyStore from "../../zustand/anyStore";

const Login = () => {
    const navigate = useNavigate();
    const {setAccessToken, setUser, setId} = useAuthStore(state => state)
    const [loginRequest, setLoginReqeust] = useState({
        username : '',
        password : ''
    })
    

    useEffect(() => {
        anyStore.getState().setAny("ㅇㅓ쩌라고")
    },[])

    const {username, password} = loginRequest

    const handleInputvalue = (e) => {
        setLoginReqeust({
            ...loginRequest,
            [e.target.name] : e.target.value
        })
    }

    const handleLoginBtnClick = () => {
        const login = async (username, password) => {
            try{
                console.log(username, password)
                const response = await axios.post('/api/login', {username, password});
                
                const accessToken = response.headers['authorization'];
                // console.log(response.headers)
                // console.log(response.data)
                // console.log(accessToken)
                if (accessToken) {
                    localStorage.setItem('accessToken', accessToken);
                    // refreshToken은 서버에서 HttpOnly 쿠키로 자동 설정됨
                    console.log('로그인 성공');

                    console.log(response.data)
                    setAccessToken(accessToken);
                    setUser(response.data.username);
                    setId(response.data.id)
                  } else {
                    throw new Error('Access 토큰이 없습니다.');
                  }
            }catch (error) {
                // 에러 처리
                console.error('Login failed:', error);
            }
        }
        login(username, password);
    }

    return (
        <>
            <div className="flex w-full h-[100vh] items-center">
                <header className="mt-9 h-8 mb-5 fixed left-0 top-0">
                    <div className="flex items-center w-full">
                        <div className="w-24 ml-2 flex-shrink-0">
                            <img src={CHEVRON_LEFT_SOLID} alt="back" className="w-6 h-6" onClick={() => navigate(-1)}/>
                        </div>
                        <div className="flex-grow flex justify-center">
                            <p className="font-bold text-lg">로그인</p>
                        </div>
                        <div className="w-24 flex-shrink-0"></div>
                    </div>
                </header>
                <main className="px-6 grow flex flex-col gap-14">
                    <div className="flex items-center justify-center gap-2" >
                        <img src={LOGO} alt="logo" className="block w-24 h-24 -ml-6"/>
                        <p className="font-bold text-3xl">WRU</p>
                    </div>
                    <div className="w-full min-h-80">
                        <div className="mb-5">
                            <p className="text-sm mb-3">아이디</p>
                            <input type="text" placeholder="아이디를 입력해주세요." name="username" className="border-b w-full pb-2" value={username} onChange={handleInputvalue}/>
                        </div>
                        <div>
                            <p className="text-sm mb-3">비밀번호</p>
                            <input type="password" placeholder="비밀번호를 입력해주세요." name="password" className="border-b w-full pb-2" value={password} onChange={handleInputvalue}/>
                        </div>
                        <button className="btn btn-primary w-full text-lg mt-8" onClick={handleLoginBtnClick}>로그인</button>
                        <Link to={`/signup`} className="btn btn-accent w-full text-lg mt-3" onClick={handleLoginBtnClick}>회원가입</Link>
                    </div>
            </main>
            </div>
        </>
    )
}

export default Login;