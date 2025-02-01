"use client";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import imageUrl from "../../assets/img/geo.png";
const Card = () => {
    return (
        <StyledWrapper>
            <div className="card my-5">
                <Image
                    src={imageUrl}
                    alt="Card Visual"
                    className="card__image"
                    layout="fill"
                    objectFit="cover"
                />
                <div className="card__content">
                    <p className="card__title">Geography</p>
                    <p className="card__description">
                        Test your knowledge about the world's geography.
                        Challenge yourself with fun and engaging questions.
                    </p>
                </div>
            </div>
        </StyledWrapper>
    );
};
const StyledWrapper = styled.div`
    .card {
        position: relative;
        width: 300px;
        height: 200px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .card__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }
    .card svg {
        width: 48px;
        fill: #333;
        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        z-index: 2;
    }
    .card:hover {
        transform: rotate(-5deg) scale(1.1);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
    .card__content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        background-color: #fff;
        opacity: 0;
        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        z-index: 3;
    }
    .card:hover .card__content {
        transform: translate(-50%, -50%) rotate(0deg);
        opacity: 1;
    }
    .card__title {
        margin: 0;
        font-size: 24px;
        color: #333;
        font-weight: 700;
    }
    .card__description {
        margin: 10px 0 0;
        font-size: 14px;
        color: #777;
        line-height: 1.4;
    }
    .card:hover svg {
        scale: 0;
        transform: rotate(-45deg);
    }
`;
export default Card;
