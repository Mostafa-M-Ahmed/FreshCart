import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick"

export default function CategorySlider() {
  function getCatSlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  let { data } = useQuery("catSlider", getCatSlider)

  var settings = {
    dots: false,
    infinte: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]

  };

  return (
    <>
      <div className={"container-fluid py-5 px-0" }>
        <h2>Shop popular categories</h2>
        <Slider {...settings}>
          {data?.data?.data.map((el) => <>
            <img src={el.image} className='w-100' height={300} alt="" />
            <p>{el.name}</p>
          </>)}
        </Slider>


      </div></>
  )
}
