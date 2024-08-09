import React, { useEffect, useRef, useState } from 'react'
import api from "@api/interceptor"
import Friend from '@pages/friend/Friend';
const {kakao} = window;

function Location() {
    const [location, setLocation] = useState({
        latitude : 33.450701,
        longitude : 126.570667
    });
    const [myLocation, setMyLocation] = useState({})
    const [friendLocations, setFriendLocations] = useState([]);
    const [error, setError] = useState(null);
    const mapRef = useRef(null)
    const [map, setMap] = useState(null);
    
    

    const sendLocationToServer = async (latitude, longitude) => {
        try {
        const response =   await api.post('/api/v1/userLocation', { latitude, longitude });
        //   fetchFriendsLocations();
        } catch (error) {
          setError('서버에 위치 정보를 전송하는데 실패했습니다.');
        }
    };
    
    const getFriendLocations = async () => {
        try {
            const response = await api.get('/api/v1/userLocation');
            return response.data.data;
        } catch (error) {
            setError('친구들의 위치 정보를 가져오는데 실패했습니다.');
        }
    };

    // 지도를 특정 위치로 이동시키는 함수
    const moveMapToLocation = (username) => {
        if (map && friendLocations) {
            const friend = friendLocations.find(f => f.username === username);
            if (friend) {
                const moveLatLon = new kakao.maps.LatLng(friend.latitude, friend.longitude);
                map.setCenter(moveLatLon);
                map.setLevel(8)
            }
        }
    };

    const initializeMap = (position, friendsData,myLocation) => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(position.latitude, position.longitude),
            level: 10
        };
        const map = new kakao.maps.Map(container, options);
        setMap(map)

        // 현재 위치 마커
        const myMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(position.latitude, position.longitude),
            map: map
        });

        const content = 
                `
                    <div class="items-center gap-4 w-10">
                        <div>
                            <p class="text-sm font-bold text-center text-fuchsia-500">Me</p>
                        </div>
                        <div class="avatar w-full">
                            <div class="w-full rounded-full">
                                <img src="https://avatar.iran.liara.run/public/boy?username=${myLocation.username}" alt="user avatar" />
                            </div>
                        </div>
                    </div>
                `;

         // 내 위치 인포윈도우
         const friendInfowindow = new kakao.maps.CustomOverlay({
            position: new kakao.maps.LatLng(myLocation.latitude, myLocation.longitude),
            content: content,
            xAnchor: 0.5,
            yAnchor: 1.57
        });
        friendInfowindow.setMap(map);


        // 친구들 위치 마커
        friendsData.forEach(friend => {
            const friendMarker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(friend.latitude, friend.longitude),
                map: map
            });

            friendsData.forEach(friend => {
                const friendMarker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(friend.latitude, friend.longitude),
                    map: map
                });
            
                const content = 
                `
                    <div class="items-center gap-4 w-10">
                        <div>
                            <p class="text-sm font-bold text-center text-blue-500">${friend.username}</p>
                        </div>
                        <div class="avatar w-full">
                            <div class="w-full rounded-full">
                                <img src="https://avatar.iran.liara.run/public/boy?username=${friend.username}" alt="user avatar" />
                            </div>
                        </div>
                    </div>
                `;
            
                // 친구 위치 인포윈도우
                const friendInfowindow = new kakao.maps.CustomOverlay({
                    position: new kakao.maps.LatLng(friend.latitude, friend.longitude),
                    content: content,
                    xAnchor: 0.5,
                    yAnchor: 1.57
                });
                friendInfowindow.setMap(map);
            });
            
            mapRef.current = map;
            // 친구 위치 인포윈도우
           
        });

        mapRef.current = map;
    };
  
    // useEffect(() => {
    //     if (!navigator.geolocation) {
    //         setError('Geolocation is not supported by your browser');
    //         return;
    //     }

    //     navigator.geolocation.getCurrentPosition(
    //         async (position) => {
    //             const newLocation = {
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude
    //             };
    //             setLocation(newLocation);
    //             // await sendLocationToServer(newLocation.latitude,newLocation.longitude)
    //             // await getFriendLocations();
    //             await sendLocationToServer(newLocation.latitude, newLocation.longitude);
    //             const friendsData = await getFriendLocations();
    //             const myLocation = {userId : friendsData.id, username : friendsData.username, latitude : friendsData.latitude, longitude : friendsData.longitude}
    //             setFriendLocations(friendsData.friendsLocations);
    //             setMyLocation(myLocation)
    //             initializeMap(newLocation, friendsData.friendsLocations,myLocation );

    //         },
    //         (error) => {
    //         setError(`Error: ${error.message}`);
    //         }
    //     );
    // }, []);
    useEffect(() => {
        // Kakao 지도 스크립트 로드
        const script = document.createElement('script');
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&autoload=false`;
        document.head.appendChild(script);
    
        script.onload = () => {
            window.kakao.maps.load(() => {
                if (!navigator.geolocation) {
                    setError('Geolocation is not supported by your browser');
                    return;
                }
    
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const newLocation = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        };
                        setLocation(newLocation);
                        await sendLocationToServer(newLocation.latitude, newLocation.longitude);
                        const friendsData = await getFriendLocations();
                        const myLocation = {userId : friendsData.id, username : friendsData.username, latitude : friendsData.latitude, longitude : friendsData.longitude}
                        setFriendLocations(friendsData.friendsLocations);
                        setMyLocation(myLocation)
    
                        initializeMap(newLocation, friendsData.friendsLocations, myLocation);
                    },
                    (error) => {
                        setError(`Error: ${error.message}`);
                    }
                );
            });
        };
    
        return () => {
            const script = document.querySelector('script[src^="//dapi.kakao.com/v2/maps/sdk.js"]');
            if (script) {
                document.head.removeChild(script);
            }
        };
    }, []);

   
    return (
        <>
            <div id="map" style={{width:"500px", height:"400px"}}></div>
            <div className='-mt-16'>
                <Friend moveMapToLocation={moveMapToLocation}/>
            </div>
        </>
    )
}

export default Location