import React from 'react'
import main1 from "../Assets/Images/1.jpg"
import main2 from "../Assets/Images/2.jpg"
import main3 from "../Assets/Images/3.jpg"
import main4 from "../Assets/Images/4.jpg"
import main5 from "../Assets/Images/5.jpg"
import Slider from "react-slick"


export default function MainSlider() {
    var settings = {
        dots: true,
        infinte: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
    };
    return (
        <>
            <div className="container pt-5">
                    <div className="row g-0 justify-content-center">
                        <div className="col-md-3">
                            <Slider {...settings}>
                                <img src={main1} className='' alt="" />
                                <img src={main2} className='' alt="" />
                                <img src={main3} className='' alt="" />

                            </Slider>
                        </div>
                        <div className="col-md-3">
                            <img src={main4} height={200} alt="" />
                            <img src={main5} height={200} alt="" />

                        </div>
                    </div>

            </div>
        </>
    )
}
