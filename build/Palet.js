"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Palet = (function (_super) {
    __extends(Palet, _super);
    function Palet(balise) {
        var _this = _super.call(this, balise) || this;
        _this.xmin = 0;
        _this.xmax = 0;
        return _this;
    }
    Palet.prototype.setLimites = function (zone) {
        this.xmin = zone.getX();
        this.xmax = zone.getX() + zone.getLargeur() - this.getLargeur();
    };
    Palet.prototype.follow = function (zone) {
        var _this = this;
        this.move = function (e) {
            var x = e.clientX - (zone.getLargeur() / 2) - (_this.getLargeur() / 2 + 10);
            if (x < _this.xmin) {
                x = _this.xmin;
            }
            if (x > _this.xmax) {
                x = _this.xmax;
            }
            _this.setX(x);
        };
        window.addEventListener("mousemove", this.move);
    };
    Palet.prototype.disable_move = function () {
        window.removeEventListener("mousemove", this.move);
    };
    return Palet;
}(Sprite));
