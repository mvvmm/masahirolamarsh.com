import Image from "next/dist/client/image";
import Head from "next/head";
import Tilt from "react-parallax-tilt";
import bg from "../public/img/bg.webp";
import teeth from "../public/img/teeth.webp";

import { useEffect, useRef } from "react";

export default function Home() {
  let rootDir = "https://www.masahirolamarsh.com";

  const Morph = {
    finished: false,
    startTime: null,
    endTime: null,
    texts: ["[ contact ]", "contact info..."],
    morphing: useRef(false),
    morphTime: 2,
    els: {
      text1: null,
      text2: null,
    },
    init: function () {
      this.els = {
        text1: document.getElementById("text1"),
        text2: document.getElementById("text2"),
      };
      this.els.text2.style.filter = "";
      this.els.text2.style.opacity = "0%";
      this.animate();
    },
    doMorph: function () {
      if (!this.startTime) {
        this.startTime = new Date().getTime();
        this.endTime = this.startTime + this.morphTime * 1000;
      }

      const now = new Date().getTime();
      if (this.finished) {
        this.els.text1.style.display = "none";
      } else {
        if (now <= this.endTime) {
          this.setMorph(
            (now - this.startTime) / (this.endTime - this.startTime)
          );
        } else {
          this.setMorph(1);
          this.finished = true;
        }
      }
    },
    setMorph: function (fraction) {
      this.els.text2.style.filter = `blur(${Math.min(
        8 / fraction - 8,
        100
      )}px)`;
      this.els.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      fraction = 1 - fraction;
      this.els.text1.style.filter = `blur(${Math.min(
        8 / fraction - 8,
        100
      )}px)`;
      this.els.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    },
    animate: function () {
      requestAnimationFrame(this.animate.bind(this));

      this.morphing.current && this.doMorph();
    },
  };

  useEffect(() => {
    if (!document) {
      return;
    }

    Morph.init();
  });

  return (
    <>
      <Head>
        <title>Masahiro LaMarsh</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          name="description"
          content={`Masahiro LaMarsh - New York City Jeweler.`}
          key="head-description"
        />
        <meta
          property="og:title"
          content={`Masahiro LaMarsh`}
          key="head-ogtitle"
        />
        <meta
          property="og:description"
          content={`Masahiro LaMarsh - New York City Jeweler.`}
          key="head-ogdescription"
        />
        <meta
          property="og:image"
          content={`${rootDir}/img/masahirolamarsh.jpeg`}
          key="head-ogimage"
        />
        <meta property="og:url" content={`${rootDir}`} key="head-ogurl" />
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="head-twittercard"
        />
        <meta
          name="twitter:image:alt"
          content="Masahiro Lamarsh - New York City Jeweler"
          key="head-twitterimgalt"
        />
        <meta
          property="og:site_name"
          content="Masahiro LaMarsh"
          key="head-ogsite_name"
        />
      </Head>

      <div className="absolute inset-0">
        <div className="h-full flex">
          <div className="relative mx-auto my-auto" id="img-container">
            <Tilt
              className="absolute"
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={900}
              transitionSpeed={5000}
              gyroscope
              trackOnWindow
            >
              <Image src={bg} alt="bg" />
            </Tilt>
            <Tilt
              className="absolute"
              tiltMaxAngleX={20}
              tiltMaxAngleY={20}
              perspective={700}
              transitionSpeed={9000}
              scale={1.1}
              gyroscope
              trackOnWindow
            >
              <Image src={teeth} alt="teeth" />
            </Tilt>
            <div
              className="absolute top-full flex w-full justify-center mt-12"
              onClick={() => {
                Morph.morphing.current = true;
              }}
            >
              <div
                id="text-container"
                className="relative w-full h-32 w-min-content tracking-widest"
              >
                <span
                  id="text1"
                  className="absolute left-1/2 -translate-x-1/2 z-10 group"
                >
                  [ <span className="group-hover:text-sm">contact</span> ]
                </span>
                <span id="text2" className="absolute left-1/2 -translate-x-1/2">
                  m@masahirolamarsh.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <svg id="filters">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -20"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
