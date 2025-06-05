// components/RainbowHearts.js

import React from 'react';
import styled, { keyframes } from 'styled-components'; // styled와 keyframes 임포트

// 바운스 애니메이션 정의 (keyframes)
const bounce = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-10px);
    }
`;

// 컨테이너 스타일 컴포넌트 정의
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 150px;
    background-color:rgb(36, 36, 36);
    margin: 15px 0 15px 0;
    padding: 0 15px 0 15px;     
    font-family: sans-serif;
    gap: 15px;
`;

// 하트 스타일 컴포넌트 정의
const Heart = styled.div`
    font-size: 50px;
    display: inline-block;
    animation: ${bounce} 1s infinite alternate; /* 정의된 애니메이션 적용 */

   /* 개별 하트 파스텔 톤 색상 및 애니메이션 딜레이 */
    &:nth-child(1) { color: #FFD1DC; animation-delay: 0s; } /* 파스텔 핑크 */
    &:nth-child(2) { color: #FFDAB9; animation-delay: 0.1s; } /* 파스텔 오렌지 (피치) */
    &:nth-child(3) { color: #FFFFB5; animation-delay: 0.2s; } /* 파스텔 옐로우 */
    &:nth-child(4) { color: #B0E0E6; animation-delay: 0.3s; } /* 파스텔 민트 (파우더 블루) */
    &:nth-child(5) { color: #ADD8E6; animation-delay: 0.4s; } /* 파스텔 블루 (라이트 블루) */
    &:nth-child(6) { color: #C9B8E6; animation-delay: 0.5s; } /* 파스텔 퍼플 (라벤더) */
    &:nth-child(7) { color: #E6B0E6; animation-delay: 0.6s; } /* 파스텔 바이올렛 (플럼) */
`;

const RainbowHearts = () => {
    return (
        <Container> {/* 스타일 컴포넌트 사용 */}
            <Heart>&#x2764;</Heart>
            <Heart>&#x2764;</Heart>
            <Heart>&#x2764;</Heart>
            <Heart>&#x2764;</Heart>
            <Heart>&#x2764;</Heart>
            <Heart>&#x2764;</Heart>
            <Heart>&#x2764;</Heart>
        </Container>
    );
};

export default RainbowHearts;