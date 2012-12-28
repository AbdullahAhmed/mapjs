Kinetic.Bezier = function (config) {
	config.name = "Bezier";
	this.color = config.stroke;
	this.lineWidth = config.strokeWidth;
	if (config.points) {
		this.startPoint = { x: config.points[0], y: config.points[1] };
		this.controlPoint1 = { x: config.points[2], y: config.points[3] };
		this.controlPoint2 = { x: config.points[4], y: config.points[5] };
		this.endPoint = { x: config.points[6], y: config.points[7] };
	}
	this.hasArrow = (typeof config.hasArrow !== "undefined") ? config.hasArrow : false;
	config.drawFunc = this._drawCurve;
	Kinetic.Line.apply(this, [config]);
	this.classType = "Bezier";
};
Kinetic.Bezier.prototype = {
	_drawCurve: function () {
		var context = this.getContext();
		context.save();
		context.beginPath();
		context.moveTo(this.startPoint.x, this.startPoint.y);
		context.bezierCurveTo(
			this.controlPoint1.x, this.controlPoint1.y,
			this.controlPoint2.x, this.controlPoint2.y,
			this.endPoint.x, this.endPoint.y
		);
		context.strokeStyle = this.color;
		context.lineWidth = this.lineWidth;
		if (this.hasArrow) {
			context.stroke();
			context.closePath();
			context.beginPath();
			var headlen = 13;
			var angle = Math.atan2(this.endPoint.y - this.controlPoint2.y, this.endPoint.x - this.controlPoint2.x);
			context.lineJoin = "round";
			var ax = this.endPoint.x - headlen * Math.cos(angle - Math.PI / 6);
			var ay = this.endPoint.y - headlen * Math.sin(angle - Math.PI / 6);
			context.moveTo(this.endPoint.x, this.endPoint.y);
			context.lineTo(this.endPoint.x - headlen * Math.cos(angle + Math.PI / 6), this.endPoint.y - headlen * Math.sin(angle + Math.PI / 6));
			context.lineTo(ax, ay);
			context.fillStyle = this.color;
			context.fill();
		}
		context.stroke();
		context.closePath();
		context.restore();
	},
	transform: function (delta) {
		this.startPoint.x += delta.dx;
		this.startPoint.y += delta.dy;
		this.endPoint.x += delta.dx;
		this.endPoint.y += delta.dy;
		this.controlPoint1.x += delta.dx;
		this.controlPoint1.y += delta.dy;
		this.controlPoint2.x += delta.dx;
		this.controlPoint2.y += delta.dy;
	}
};
Kinetic.Global.extend(Kinetic.Bezier, Kinetic.Line);
