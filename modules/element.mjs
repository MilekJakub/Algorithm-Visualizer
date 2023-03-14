class Element {

	value;
	x;
	y;
	width;
	height;
	font;
	color;

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }

	drawText(ctx) {
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
