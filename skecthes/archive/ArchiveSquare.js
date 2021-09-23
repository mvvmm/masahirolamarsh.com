export class ArchiveSquare {
  constructor(data, x, y) {
    this.data = data;
    this.x = x;
    this.y = y;
  }

  draw() {
    push();
    texture(data.imageData);
    plane(x, y);
    pop();
  }
}
