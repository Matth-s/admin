import React, { useState, useRef, useEffect } from "react";

import { Images } from "../../schema";

import "./style.scss";

type Props = {
  imageArray: Images[];
  imagePresentation: string;
};

const Carrousel = ({ imageArray, imagePresentation }: Props) => {
  const [img, setImg] = useState<string>(imagePresentation);

  const hoverHandler = (image: Images) => {
    setImg(image.image);
  };

  const refs = useRef<HTMLDivElement[]>([]);
  refs.current = [];

  const addRefs = (el: HTMLDivElement | null) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  return (
    <div className="carrousel-container">
      <div className="left">
        <div className="left_1">
          {imageArray.length > 0 &&
            imageArray.map((image, index) => (
              <div
                className={image.image === img ? "img_wrap active" : "img_wrap"}
                key={index}
                onMouseOver={() => hoverHandler(image)}
                ref={addRefs}
              >
                <img src={image.image} alt={image.image} />
              </div>
            ))}
        </div>
        <div className="left_2">
          <img src={`${img ? img : "../assets/empty-image.svg"}`} alt="d" />
        </div>
      </div>
    </div>
  );
};

export default Carrousel;
