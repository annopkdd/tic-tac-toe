import React from "react";
import Slider from "react-slick";
import { Image } from "../image";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { combine } from "@/utils";

interface ICarouselItem {
  src: string;
  onClick?: () => void;
}

interface IImageCarousel {
  list: ICarouselItem[];
  height: number;
  className?: string;
}

const ImageCarousel: React.FC<IImageCarousel> = (props) => {
  const { list, height, className } = props;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    customPaging: (index: number) => {
      return (
        <div
          id="pagingDot"
          className="rounded-full w-[8px] h-[8px] bg-disabled mt-[-4px]"
        />
      );
    },
  };

  return (
    <Slider {...settings} className={combine([className])}>
      {list.map((item: ICarouselItem, index: number) => (
        <div key={`_ImageCarousel_${index}`}>
          <Image
            src={item.src}
            onClick={item.onClick}
            height={height}
            width="100%"
            alt={`_ImageCarousel_${item.src}`}
            className="rounded-2xl"
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageCarousel;
