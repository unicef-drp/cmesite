const PI = Math.PI;
const TAU = 2 * PI;

const rotatePoint = (x, y, theta) => [
  Math.cos(theta) * x + -Math.sin(theta) * y,
  Math.sin(theta) * x + Math.cos(theta) * y,
];

const pentagoncircumradiusCoeff = 1 / 10 * Math.sqrt(50 + 10 * Math.sqrt(5));
const pentagondenom = Math.sqrt(5 * (5 + 2 * Math.sqrt(5)));
const octagoncircumradiusCoeff = 1 / 2 * Math.sqrt(4 + 2 * Math.sqrt(2));

export const symbolPentagon = {
  draw: function(context, size) {
    var R = pentagoncircumradiusCoeff * Math.sqrt(4 * size / pentagondenom);
    var theta = -TAU / 4;

    context.moveTo.apply(context, rotatePoint(R, 0, theta));

    for (var i = 0; i < 5; ++i) {
      var a = TAU * i / 5;
      var x = Math.cos(a) * R;
      var y = Math.sin(a) * R;

      context.lineTo.apply(context, rotatePoint(x, y, theta));
    }

    context.closePath();
  },
};

export const symbolTriangleDown = {
  draw: function(context, size) {
    var sqrt3 = Math.sqrt(3);
    var y = -Math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, -y * 2);
    context.lineTo(-sqrt3 * y, y);
    context.lineTo(sqrt3 * y, y);
    context.closePath();
  },
};

export const symbolOctagon = {
  draw: function(context, size) {
    var R = octagoncircumradiusCoeff * Math.sqrt(-1 * (size * (1 - Math.sqrt(2))) / 2);

    context.moveTo.apply(context, rotatePoint(R, 0, 0));

    for (var i = 0; i < 8; ++i) {
      var a = TAU * i / 8;
      var x = Math.cos(a) * R;
      var y = Math.sin(a) * R;

      context.lineTo.apply(context, rotatePoint(x, y, 0));
    }

    context.closePath();
  },
};
