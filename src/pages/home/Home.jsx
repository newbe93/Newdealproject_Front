import React, { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';



import { Navigation, Autoplay, EffectFade, Controller,Scrollbar  } from 'swiper/modules';
import {gsap} from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

import MAIN_SLIDE_1 from '@assets/CITY.jpg'
import MAIN_SLIDE_2 from '@assets/FRIENDS.jpg'
import MAIN_SLIDE_3 from '@assets/COUPLE.jpg'
import LOGO from '@assets/logo.png'

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const [bgActiveIndex, setBgActiveIndex] = useState(0);
    const [textActiveIndex, setTextActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const bgSwiperRef = useRef(null);
    const textSwiperRef = useRef(null);

    const logoSectionRef = useRef(null);
    const logoRef = useRef(null);
    const MsectionRef = useRef(null);
    const bgOrangeRef = useRef(null);

    const section2Ref = useRef(null);

    const slides = ['1', '2', '3'];

    useEffect(() => {
        window.scrollTo(0,0)
        const logo = logoRef.current
        const logoSection = logoSectionRef.current
        const Msection = MsectionRef.current
        const section2 = section2Ref.current
        const bgOrange = bgOrangeRef.current

        const tl = gsap.timeline()
        
        gsap.set(logo, {
            scale : 0,
            autoAlpha: 0,
        });

        tl.to(logo,{
            scale : 1,
            autoAlpha : 1,
            duration :2,
        })
        .to(logo,{
            duration : 1,
            
        },"+=0.5")
        .to(logoSection, {
            yPercent : -100,
            duration : 1
        },"<")
        .from(Msection,{
            yPercent : 100,
        },"<")
        .to(Msection, {
            yPercent : 0,
            duration : 1,
        },"<")

        gsap.to(bgOrange,{
            autoAlpha : 0,
            scrollTrigger : {
                trigger : section2,
                start : "top bottom",
                end : "top 99%",
                scrub : 1
            }
        })

        gsap.to(Msection,{
            scale : 1,
            scrollTrigger : {
                trigger : section2,
                start : "top bottom",
                end : "center center",
                scrub : 1
            }
        })

        if (bgSwiperRef.current && textSwiperRef.current) {
            const bgSwiper = bgSwiperRef.current.swiper;
            const textSwiper = textSwiperRef.current.swiper;
    
            bgSwiper.on('slideChange', () => {
                // console.log("bg_index", bgSwiper.realIndex);
                textSwiper.slideTo(bgSwiper.realIndex);
                
            });
        }

        return () => {
            tl.kill(); // Timeline 중지 및 정리
            ScrollTrigger.getAll().forEach(st => st.kill());
            Aos.refresh();
        };
    }, []);



    const goNext = () => {
    if (bgSwiperRef.current && bgSwiperRef.current.swiper) {
        const bgswiper = bgSwiperRef.current.swiper;
        const textswiper = textSwiperRef.current.swiper;
        if (bgActiveIndex === slides.length - 1) {
            bgswiper.slideTo(0);
            textswiper.slideTo(0);
        } else {
            bgswiper.slideNext();
            textswiper.slideNext();
        }
        }
    };
    
    const goPrev = () => {
        if (bgSwiperRef.current && bgSwiperRef.current.swiper) {
            const bgswiper = bgSwiperRef.current.swiper;
            const textswiper = textSwiperRef.current.swiper;
            if (bgActiveIndex === 0) {
                bgswiper.slideTo(slides.length - 1);
                textswiper.slideTo(slides.length - 1);
            } else {
                bgswiper.slidePrev();
                textswiper.slidePrev();
            }
            }
    };

    const goToSlide = (index) => {
        if (bgSwiperRef.current && bgSwiperRef.current.swiper) {
            bgSwiperRef.current.swiper.slideTo(index);
            textSwiperRef.current.swiper.slideTo(index)
        }
    };
        
    const togglePlayPause = () => {
        const bgswiper = bgSwiperRef.current.swiper;
        const textswiper = textSwiperRef.current.swiper;
        if (isPlaying) {
            bgswiper.autoplay.stop();
            setIsPlaying(false);
            } else {
            bgswiper.autoplay.start();
            setIsPlaying(true);
            }
    };


    return (
        <>
            <section className="section" id="section1">
                <div className="flex justify-center items-center w-full h-full fixed left-0 right-0 z-[2]" ref={logoSectionRef}>
                    <div className="flex items-center justify-center flex-col h-36" >
                        <img src={LOGO} alt="logo" className="block w-36 h-36" ref={logoRef}/>
                        <p className="font-bold text-2xl">WHERE ARE YOU?</p>
                    </div>
                </div>
                <div className="main_home Msection1" >
                    <div className=" borderPadding" >
                        <div ref={MsectionRef} style={{width : "100%", height : "100vh"}} className="">
                            {/* <div className="main_bg_slider main_slider"></div> */}
                            <div className="flex items-center justify-center h-36 absolute z-[3] w-full top-28" >
                                <img src={LOGO} alt="logo" className="block w-24 h-24 -ml-2"/>
                                <p className="font-bold text-3xl text-white">WHERE ARE YOU?</p>
                            </div>
                            <Swiper
                                ref={bgSwiperRef}
                                slidesPerView={1}
                                spaceBetween={30}
                                effect={'fade'}
                                onSlideChange={(swiper) => {setBgActiveIndex(swiper.realIndex)}}
                                loop={true}
                                autoplay={{
                                    delay: 6000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: false,
                                }}
                                modules={[EffectFade, Navigation, Autoplay, Controller]}
                                className="mySwiper main_bg_slider main_slider"
                            >
                                <SwiperSlide>
                                    <div className="img" style={{background : `url(${MAIN_SLIDE_1}) no-repeat center / cover`}}></div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="img" style={{background : `url(${MAIN_SLIDE_2}) no-repeat center / cover`}}></div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="img" style={{background : `url(${MAIN_SLIDE_3}) no-repeat center / cover`}}></div>
                                </SwiperSlide>
                            </Swiper>
                            <div className="text_slider_wrap">
                                <div className="inner">
                                    <Swiper
                                        ref={textSwiperRef}
                                        slidesPerView={1}
                                        spaceBetween={30}
                                        loop={true}
                                        // onSlideChange={(swiper) => {setTextActiveIndex(swiper.realIndex);}}
                                        // autoplay={{
                                        //     delay: 6000,
                                        //     disableOnInteraction: false,
                                        //     pauseOnMouseEnter: false,
                                        // }}
                                        effect={'fade'}
                                        modules={[EffectFade, Navigation,Controller]}
                                        className="mySwiper main_text_slider main_slider"
                                    >
                                        <SwiperSlide>
                                            <div className="text_wrap">
                                                <div className="title1">
                                                    <p>친구들과 실시간 위치를 공유해보세요.</p>
                                                </div>
                                                {/* <div className="txt1">
                                                    <p>
                                                    이제 먼 길로 돌아가지 마세요.<br/>
                                                    스마트가 여러분의 건강을 책임집니다.
                                                    </p>
                                                </div> */}
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="text_wrap">
                                                <div className="title1">
                                                    <p>
                                                        친구들의 출발/도착<br/>
                                                        을 실시간으로<br/>
                                                        확인해보세요.
                                                    </p>
                                                </div>
                                                {/* <div className="txt1">
                                                    <p>
                                                    신체의 일부분이 아닌, 전체적인 관점에서<br/>
                                                    바라보며 치료합니다.
                                                    </p>
                                                </div> */}
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="text_wrap">
                                                <div className="title1">
                                                    <p>
                                                        친구들과 실시간<br/>
                                                        채팅을 나눠보세요.
                                                    </p>
                                                </div>
                                                {/* <div className="txt1">
                                                    <p>
                                                    풍부한 임상경험과 노하우로<br/>
                                                    꼼꼼하고 정밀한 진료를 약속드립니다.
                                                    </p>
                                                </div> */}
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                    <div className="custom-controls">
                                        <div className="custom-bullets">
                                        {slides.map((_, index) => (
                                            <span
                                            key={index}
                                            className={`custom-bullet ${index === bgActiveIndex ? 'active' : ''}`}
                                            onClick={() => goToSlide(index)}
                                            >
                                            </span>
                                        ))}
                                        </div>
                                        {/* <button className="status_wrap" onClick={togglePlayPause}>
                                            <span className={`status ${isPlaying ? 'stop' : 'play'}`}></span>
                                        </button>
                                        <button onClick={goPrev} className="btnn prev"></button>
                                        <button onClick={goNext} className="btnn next"></button> */}
                                    </div>
                                    <div className="flex justify-center">
                                        <Link to={'/login'} className="btn z-[4] w-[96%] mt-6 rounded-2xl">시작</Link>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                    {/* <div className="orange_bg" ref={bgOrangeRef}></div> */}
                    
                </div>
            </section>
            
        </>
    )
}

export default Home;