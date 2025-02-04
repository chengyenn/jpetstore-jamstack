import Image from "next/image";

const myLoader = ({ src, width, quality }) => {
  return `https://140.119.163.226/cdn/${src}?w=${width}&q=${quality || 75}`;
};

export default function CustomImage(props) {
  return <Image {...props} loader={myLoader} />;
}
