import React, { useCallback, useEffect, useState } from "react";
import CHEVRON_LEFT_SOLID from "@assets/icons/chevron-left-solid.svg"
import { useNavigate } from "react-router-dom";
import useAuthStore from "@zustand/authStore";
import axios from "axios";
import debounce from 'lodash/debounce';  // lodash의 debounce 함수 사용
import toast from "react-hot-toast";

const Signup = () => {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [btnValue, setBtnValue] = useState('다음')
    const [password, setPassword] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [isExistUsername, setIsExistUsername] = useState(false);
    const navigate = useNavigate();
    const {accessToken} = useAuthStore()
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        if(accessToken) navigate('/chat')
    },[])

    useEffect(()=>{
        if (step === 1) {
            setBtnDisabled(username.trim() === '' || isExistUsername || loading);
        } else {
            setBtnDisabled(password.trim() === '' || loading);
        }
    },[username,isExistUsername,step, loading, password])

    useEffect(() => {
        if (step === 2) {
            setBtnValue("회원가입");
        } else {
            setBtnValue("다음");
        }
    }, [step]);

    const renderStepContent = () => {
        if (step === 1) {
            return (
                <>
                    <div className="font-bold text-3xl leading-[45px] mb-5">
                        <p>사용할 아이디를</p>
                        <p>알려주세요</p>
                    </div>
                    <div className="mb-52">
                        <div>
                            <input 
                                type="text" 
                                value={username} 
                                onChange={handleUsernameChange}
                                className={`text-2xl pb-1 ${isExistUsername ? 'border-b border-red-500 border-solid' : ''}`}
                                placeholder="아이디를 입력해주세요"
                            />
                        </div>
                        { isExistUsername ? <p className="text-red-500 mt-1">사용 불가능한 아이디입니다.</p> : ''}
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="font-bold text-3xl leading-[45px] mb-5">
                        <p>비밀번호를</p>
                        <p>입력해주세요</p>
                    </div>
                    <div className="mb-52">
                        <div>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => {setPassword(e.target.value)}}
                                className="text-2xl"
                            />
                        </div>
                    </div>
                </>
            );
        }
    };

    const isExistFetch = useCallback(debounce(async (username) => {
        if (username.trim() === '') {
            setIsExistUsername(false);
            setBtnDisabled(true);
            return;
        }
        try {
            const response = await axios.post('/api/v1/auth/isExist', { username });
            setIsExistUsername(response.data.data)
            // setBtnDisabled(response.data.data)
        } catch (error) {
            console.error("Error checking username:", error);
        }
    }, 300), []); // 300ms 디바운스

    const joinFetch = async () => {
        if(loading) return;

        setLoading(true);
        try {
            const response = await axios.post('/api/v1/auth/join', {username, password})
            if(response.status === 200){
                toast.success("회원가입에 성공했습니다.")
                navigate('/login')
            }
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    const handleUsernameChange = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        if (newUsername.trim() === '') {
            setIsExistUsername(false);
            setBtnDisabled(true);
        } else {
            isExistFetch(newUsername);
        }
        
    };

    const handleNext = () => {
        if (step === 1) {
            // 유효성 검사
            setStep(2);
            setBtnValue("회원가입")
        } else {
            
            // 회원가입 로직 구현
            joinFetch();
            console.log('ID:', username, 'Password:', password);
        }
    };

    return (
        <>
            <header className="mt-9 h-8 mb-5">
                <div className="flex items-center w-full">
                    <div className="w-24 ml-2 flex-shrink-0">
                        <img src={CHEVRON_LEFT_SOLID} alt="back" className="w-6 h-6" onClick={() => setStep(1)}/>
                    </div>
                    <div className="flex-grow flex justify-center">
                        <p className="font-bold text-lg">회원가입</p>
                    </div>
                    <div className="w-24 flex-shrink-0"></div>
                </div>
            </header>
            <main className="px-6">
                <div>
                    {renderStepContent()}
                </div>
                <div className="mb-4">
                    <div className="flex justify-end">
                        <p className="font-bold text-lg">2단계 중 1단계</p>
                    </div>
                    <progress className="progress w-full bg-gray-100" value={step} max="2"></progress>
                </div>
                <div>
                    <button className="btn btn-secondary w-full text-lg" onClick={handleNext} disabled={btnDisabled}>{btnValue}</button>
                </div>
            </main>
        </>
    )
}

export default Signup;