class Shot {
  constructor(xPosition) {
    this.xPosition = xPosition;
    this.yPosition = 0;
  }

  get x() {
    return this.xPosition;
  }

  set x(newXPosition) {
    this.xPosition = newXPosition;
  }

  get y() {
    return this.yPosition;
  }

  set y(newYPosition) {
    this.yPosition = newYPosition;
  }
}

export default Shot;
