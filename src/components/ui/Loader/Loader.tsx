import images from '@src/constants/images';

interface LoaderProps {
  width?: number;
  height?: number;
}

const Loader = ({ width = 200, height = 200 }: LoaderProps) => (
  <div>
    <img
      src={images.loader}
      alt="Loader"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  </div>
);

export default Loader;
