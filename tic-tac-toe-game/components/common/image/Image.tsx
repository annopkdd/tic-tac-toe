import React from "react";

interface IImage
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  defaultImageSrc?: string;
}

const Image: React.FC<IImage> = (props) => {
  const { src, defaultImageSrc, width, height, ...rest } = props;

  const [imageSrc, setImageSrc] = React.useState(defaultImageSrc || "");

  React.useEffect(() => {
    if (src) {
      setImageSrc(src);
    }
  }, [src]);

  return (
    <img
      src={imageSrc}
      {...rest}
      style={{ width: width || "auto", height: height || "auto" }}
    />
  );
};

export default Image;
