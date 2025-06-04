declare module "react-slick" {
  import { ComponentType, ReactNode } from "react";

  interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
    arrows?: boolean;
    centerMode?: boolean;
    centerPadding?: string;
    [key: string]: any;
  }

  const Slider: ComponentType<Settings & { children: ReactNode }>;
  export default Slider;
}
