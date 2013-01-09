/*global console, Kinetic*/
Kinetic.Idea = function (config) {
	'use strict';
	var self = this;
	this.isRoot = config.isRoot || false;
	this.isSelected = false;
	this.setStyle(config);
	config.align = 'center';
	config.shadow = {
		color: 'black',
		blur: 10,
		offset: [4, 4],
		opacity: 0.4
	};
	config.cornerRadius = 6;
	config.draggable = true;
	config.name = 'Idea';
	Kinetic.Text.apply(this, [config]);
	this.classType = 'Idea';
	this.on('dblclick', function () {
		self.attrs.textFill = self.attrs.fill;
		var canvasPosition = $('canvas').offset(),
			currentText = self.getText(),
			ideaInput,
			onCommit = function () {
				self.setStyle(self.attrs);
				self.getStage().draw();
				self.fire(':textChanged', ideaInput.val());
				ideaInput.remove();
			};
		ideaInput = $('<input type="text" class="ideaInput" />')
			.css({
				top: canvasPosition.top + self.attrs.y,
				left: canvasPosition.left + self.attrs.x,
				width: self.getWidth(),
				height: self.getHeight()
			})
			.val(currentText)
			.appendTo('body')
			.keydown(function (e) {
				if (e.which === 13) {
					onCommit();
				}
				e.stopPropagation();
			})
			.blur(onCommit)
			.focus();
	});
};
Kinetic.Idea.prototype.setStyle = function (config) {
	'use strict';
	var isDroppable = this.isDroppable,
		isSelected = this.isSelected,
		isRoot = this.isRoot;
	config.strokeWidth = 1;
	config.padding = 8;
	config.fontSize = 10;
	config.fontFamily = 'Helvetica';
	config.fontStyle = 'bold';
	if (isDroppable) {
		config.stroke = '#9F4F4F';
		config.fill = '#CF4F4F';
		config.textFill = '#FFFFFF'
	} else if (isSelected) {
		config.stroke = '#4F9F4F';
		config.fill = '#5FBF5F';
		config.textFill = '#FFFFFF'
	} else {
		config.stroke = isRoot ? '#88F' : '#888';
		config.fill = {
			start: { x: 0, y: 0 },
			end: {x: 0, y: '25' },
			colorStops: isRoot ? [0, '#30C0FF', 1, '#3FCFFF'] : [0, '#FFFFFF', 1, '#F0F0F0']
		};
		config.textFill = isRoot ? '#FFFFFF' : '#5F5F5F';
	}
};
Kinetic.Idea.prototype.setIsSelected = function (isSelected) {
	'use strict';
	this.isSelected = isSelected;
	this.setStyle(this.attrs);
};
Kinetic.Idea.prototype.setIsDroppable = function (isDroppable) {
	'use strict';
	this.isDroppable = isDroppable;
	this.setStyle(this.attrs);
};
Kinetic.Global.extend(Kinetic.Idea, Kinetic.Text);
