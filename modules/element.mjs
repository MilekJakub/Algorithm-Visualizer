class Element {
  constructor(value, x, y, width, height, color, font) {
    this.value = value;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = font;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();

    // text
    ctx.font = this.font;
    const margin = (this.width - ctx.measureText(this.value).width) / 2;
		const fontSize = this.font.replace(/\D/g,'');

    ctx.fillText(
      this.value,
      this.x + margin,
      this.y + this.height + Number(fontSize),
      this.width
    );
  }
}

export { Element };
