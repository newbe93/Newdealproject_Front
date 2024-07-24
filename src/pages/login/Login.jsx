import React, { useState } from "react";
import CHEVRON_LEFT_SOLID from "@assets/icons/chevron-left-solid.svg"
import axios from "axios";

const Login = () => {
    const [loginRequest, setLoginReqeust] = useState({
        username : '',
        password : ''
    })

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
                
                const accessToken = response.headers['access'];
                if (accessToken) {
                    localStorage.setItem('accessToken', accessToken);
                    // refreshToken은 서버에서 HttpOnly 쿠키로 자동 설정됨
                    console.log('로그인 성공');
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
             <header className="mt-9 h-8 mb-5">
                <div className="flex items-center w-full">
                    <div className="w-24 ml-2 flex-shrink-0">
                        <img src={CHEVRON_LEFT_SOLID} alt="back" className="w-6 h-6"/>
                    </div>
                    <div className="flex-grow flex justify-center">
                        <p className="font-bold text-lg">로그인</p>
                    </div>
                    <div className="w-24 flex-shrink-0"></div>
                </div>
            </header>
            <main className="px-6">
                <div className="">
                    <div className="mb-5">
                        <p className="text-sm mb-3">아이디</p>
                        <input type="text" placeholder="아이디를 입력해주세요." name="username" className="border-b w-full pb-2" value={username} onChange={handleInputvalue}/>
                    </div>
                    <div>
                        <p className="text-sm mb-3">비밀번호</p>
                        <input type="password" placeholder="비밀번호를 입력해주세요." name="password" className="border-b w-full pb-2" value={password} onChange={handleInputvalue}/>
                    </div>
                    <button className="btn btn-primary w-full text-lg mt-8" onClick={handleLoginBtnClick}>로그인</button>
                </div>
            </main>
        </>
    )
}

export default Login;