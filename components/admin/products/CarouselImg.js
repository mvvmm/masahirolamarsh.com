import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function CarouselImg(src, alt) {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const animationControls = useAnimation();

  const animationVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  useEffect(() => {
    setImageIsLoaded(false);
    if (imageIsLoaded) {
      animationControls.start("visible");
    }
  }, [imageIsLoaded, src]);

  return (
    <motion.div
      initial={"hidden"}
      animate={animationControls}
      variants={animationVariants}
      transition={{ ease: "easeOut", duration: 1 }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="contain"
        onLoad={(event) => {
          const target = event.target;
          if (target.src.indexOf("data:image/gif;base64") < 0) {
            setImageIsLoaded(true);
          }
        }}
      />
    </motion.div>
  );
}
