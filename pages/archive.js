import ArchiveImages from "../components/archive/ArchiveImages";
import NavBar from "../components/NavBar";
import { getAllArchiveData } from "../lib/db";
import { useEffect } from "react";

export default function Archive({ archiveData }) {
  useEffect(() => {
    const P5 = require("p5");

    let archiveSquares = [];
    let NUM_COLS = 10;
    let W = 400;
    let H = 400;
    let CANVAS_WIDTH = W * NUM_COLS;
    let CANVAS_HEIGHT = Math.ceil(archiveData.length / NUM_COLS) * H;
    let XY_OFFSET_EXTRA = 150;
    let X_OFFSET = 0;
    let Y_OFFSET = 0;
    let PREV_MOUSE_X = 0;
    let PREV_MOUSE_Y = 0;
    let TARGET_SCROLL_X = 0;
    let TARGET_SCROLL_Y = 0;
    let TARGET_SCROLL_X_MOUSE = 0;
    let TARGET_SCROLL_Y_MOUSE = 0;
    let TARGET_SCROLL_X_MIN = -XY_OFFSET_EXTRA;
    let TARGET_SCROLL_Y_MIN = -XY_OFFSET_EXTRA;
    let TARGET_SCROLL_X_MAX =
      CANVAS_WIDTH - window.innerWidth + XY_OFFSET_EXTRA;
    let TARGET_SCROLL_Y_MAX =
      CANVAS_HEIGHT - window.innerHeight + XY_OFFSET_EXTRA;

    new P5((p) => {
      class ArchiveSquare {
        constructor(data, x, y, w, h) {
          this.data = data;
          this.x = x;
          this.y = y;
          this.w = w;
          this.h = h;
          this.x_offset = p.random(0, 100);
          this.y_offset = p.random(0, 100);
          this.showing = true;
        }

        show() {
          if (this.showing) {
            p.push();
            p.translate(this.x - X_OFFSET, this.y - Y_OFFSET);
            p.image(this.data.imageData, 0, 0, W, H);
            p.pop();
          }
        }

        hovered(mouseX, mouseY) {
          // if (
          //   mouseX < this.x + this.w &&
          //   mouseX > this.x &&
          //   mouseY < this.y + this.h &&
          //   mouseY > this.y
          // ) {
          //   if (p.width > p.height) {
          //     p.imageMode(p.CENTER);
          //     p.image(
          //       this.data.imageData,
          //       p.width / 2,
          //       p.height / 2,
          //       p.height,
          //       p.height
          //     );
          //     p.image(
          //       this.data.imageData,
          //       p.width / 2 + 400,
          //       p.height / 2 - 400,
          //       p.height,
          //       p.height
          //     );
          //   } else {
          //     p.imageMode(p.CENTER);
          //     p.image(
          //       this.data.imageData,
          //       p.width / 2,
          //       p.height / 2,
          //       p.width,
          //       p.width
          //     );
          //     p.image(
          //       this.data.imageData,
          //       p.width / 2 + 400,
          //       p.height / 2 - 400,
          //       p.height,
          //       p.height
          //     );
          //   }
          //   p.imageMode(p.CORNER);
          // }
        }
      }

      p.preload = () => {
        for (const idx in archiveData) {
          archiveData[idx].imageData = p.loadImage(
            `https://s3.us-east-2.amazonaws.com/cdn.masahirolamarsh.com/archive/${archiveData[idx].archiveID}/${archiveData[idx].imgs[0]}`
          );
        }
      };

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.background(0);
        let idx = 0;
        let x = 0;
        let y = 0;
        for (const data of archiveData) {
          archiveSquares.push(new ArchiveSquare(data, x, y, W, H));
          idx += 1;
          if (idx % NUM_COLS == 0) {
            x = 0;
            y += H;
          } else {
            x += W;
          }
        }
        TARGET_SCROLL_X = p.width / 2;
        TARGET_SCROLL_Y = p.height / 2;
        X_OFFSET = p.width / 2;
        Y_OFFSET = p.height / 2;
        p.cursor("grab");
      };

      p.draw = () => {
        p.background(0);
        p.noStroke(0);
        for (const archiveSquare of archiveSquares) {
          archiveSquare.hovered(p.mouseX, p.mouseY);
        }
        for (const archiveSquare of archiveSquares) {
          archiveSquare.show();
        }

        if (
          TARGET_SCROLL_X + TARGET_SCROLL_X_MOUSE != X_OFFSET ||
          TARGET_SCROLL_Y + TARGET_SCROLL_Y_MOUSE != Y_OFFSET
        ) {
          X_OFFSET = p.lerp(
            X_OFFSET,
            TARGET_SCROLL_X + TARGET_SCROLL_X_MOUSE,
            0.04
          );
          Y_OFFSET = p.lerp(
            Y_OFFSET,
            TARGET_SCROLL_Y + TARGET_SCROLL_Y_MOUSE,
            0.04
          );
        }

        TARGET_SCROLL_X_MOUSE = p.map(p.mouseX, 0, p.width, -100, 100);
        TARGET_SCROLL_Y_MOUSE = p.map(p.mouseY, 0, p.height, -100, 100);
      };

      p.mousePressed = () => {
        PREV_MOUSE_X = p.mouseX + X_OFFSET;
        PREV_MOUSE_Y = p.mouseY + Y_OFFSET;
      };

      p.mouseDragged = () => {
        TARGET_SCROLL_Y = -(p.mouseY - PREV_MOUSE_Y);
        TARGET_SCROLL_X = -(p.mouseX - PREV_MOUSE_X);
        if (TARGET_SCROLL_Y > TARGET_SCROLL_Y_MAX) {
          TARGET_SCROLL_Y = TARGET_SCROLL_Y_MAX;
        }
        if (TARGET_SCROLL_Y < TARGET_SCROLL_Y_MIN) {
          TARGET_SCROLL_Y = TARGET_SCROLL_Y_MIN;
        }
        if (TARGET_SCROLL_X > TARGET_SCROLL_X_MAX) {
          TARGET_SCROLL_X = TARGET_SCROLL_X_MAX;
        }
        if (TARGET_SCROLL_X < TARGET_SCROLL_X_MIN) {
          TARGET_SCROLL_X = TARGET_SCROLL_X_MIN;
        }
        p.cursor("grabbing");
      };

      p.mouseReleased = () => {
        p.cursor("grab");
      };
    });
  });
  return <></>;
}

export async function getServerSideProps() {
  const archiveData = await getAllArchiveData();
  return { props: { archiveData } };
}
