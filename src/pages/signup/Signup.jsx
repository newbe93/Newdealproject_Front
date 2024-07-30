import React, { useEffect, useState } from "react";
import CHEVRON_LEFT_SOLID from "@assets/icons/chevron-left-solid.svg"
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [step, setStep] = useState(1);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
                                value={id} 
                                onChange={(e) => setId(e.target.value)}
                                className="text-2xl"
                                placeholder="아이디를 입력해주세요"
                            />
                        </div>
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
                                onChange={(e) => setPassword(e.target.value)}
                                className="text-2xl"
                            />
                        </div>
                    </div>
                </>
            );
        }
    };

    const handleNext = () => {
        if (step === 1) {
            // 유효성 검사
            setStep(2);
        } else {
            // 회원가입 로직 구현
            console.log('ID:', id, 'Password:', password);
        }
    };

    return (
        <>
            <header className="mt-9 h-8 mb-5">
                <div className="flex items-center w-full">
                    <div className="w-24 ml-2 flex-shrink-0">
                        <img src={CHEVRON_LEFT_SOLID} alt="back" className="w-6 h-6" onClick={() => navigate(-1)}/>
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
                    <button className="btn btn-secondary w-full text-lg" onClick={handleNext} disabled={true}>다음</button>
                </div>
            </main>
        </>
    )
}

export default Signup;