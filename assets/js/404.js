/* global TimelineMax, TweenLite, TweenMax, Linear, Power1 */

/* TODO:
 * Remove Kinetic dependency and do it all by myself
 */

(function () {
  'use strict';

  var canvasWidth = window.innerWidth;
  var canvasHeight = window.innerHeight;

  var animation = {
    stage: new Kinetic.Stage({
      container: 'canvas',
      width: canvasWidth,
      height: canvasHeight
    }),
    layer: new Kinetic.Layer(),
    icon: {
      image: new Image(),
      width: 50,
      height: 58,
      x: canvasWidth / 2,
      y: canvasHeight
    },
    numIcons: 100,
    timeline: new TimelineMax({
      repeat: -1
    }),

    start: function () {
      this.stage.add(this.layer);
      this.icon.image.src = '/img/file.png';

      this.populateTimeline();

      TweenLite.ticker.addEventListener('tick', function () {
        this.layer.draw();
      }.bind(this));
    },

    populateTimeline: function () {
      var icon;

      for (var i = 0; i < this.numIcons; i++) {
        icon = this.createIcon();

        this.timeline.add(this.createTweens(icon), i * 0.3);
      }
    },

    createIcon: function () {
      var icon = new Kinetic.Image({
        image: this.icon.image,
        width: this.icon.width,
        height: this.icon.height,
        x: this.icon.x,
        y: this.icon.y,
        offset: {
          x: this.icon.width / 2,
          y: this.icon.height / 2
        }
      });

      this.layer.add(icon);

      return icon;
    },

    createTweens: function (element) {
      var y = canvasHeight - Math.random() * canvasHeight;
      var x = Math.random() * canvasWidth;
      var duration = ((canvasHeight - y) / canvasHeight +
        Math.abs(x - this.icon.x) / canvasWidth) * 2 + 1;
      var rotation = (Math.random() * 20 - 10) * 100;

      return [
        new TweenMax(element, duration / 2, {
          setY: y,
          yoyo: true,
          repeat: 1,
          ease: Power1.easeOut
        }),
        new TweenMax(element, duration, {
          setX: x,
          ease: Linear.easeNone
        }),
        new TweenMax(element, duration, {
          setRotationDeg: rotation,
          ease: Linear.easeNone
        })
      ];
    }
  };

  animation.start();
}());
