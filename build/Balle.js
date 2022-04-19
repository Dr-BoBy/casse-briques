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
var Balle = (function (_super) {
    __extends(Balle, _super);
    function Balle(balise, scene) {
        var _this = _super.call(this, balise) || this;
        _this.xmin = 0;
        _this.xmax = 0;
        _this.ymin = 0;
        _this.ymax = 0;
        _this.scene = scene;
        _this.can_move = false;
        _this.compteur = 0;
        return _this;
    }
    Balle.prototype.setLimites = function (zone) {
        this.xmin = zone.getX();
        this.xmax = zone.getX() + zone.getLargeur() - this.getLargeur();
        this.ymin = zone.getY();
        this.ymax = zone.getY() + zone.getHauteur() - this.getHauteur();
    };
    Balle.prototype.bouger = function () {
        if (this.can_move == true) {
            var x = this.getX() + this.vx;
            var y = this.getY() + this.vy;
            if (x <= this.xmin) {
                this.vx = -this.vx;
            }
            if (x >= this.xmax) {
                this.vx = -this.vx;
            }
            if (y <= this.ymin) {
                this.vy = -this.vy;
            }
            if (y >= this.ymax) {
                this.figer();
                this.scene.looseAnimation();
            }
            if (Sprite.collision(this.getCercle(1), this.scene.palet.getRectangle())) {
                this.vy = -this.vy;
                this.vx = ((this.scene.palet.getCentreX() - this.getCentreX()) / (this.scene.palet.getLargeur() / 2)) * 3;
                console.log(this.vx / 3);
                console.log(this.vx > 0);
                if (((this.scene.palet.getCentreX() - this.getCentreX()) / (this.scene.palet.getLargeur()) / 2) < -0.85 && this.vx < 0) {
                    this.vx = -0.8 * this.vx;
                    console.log(this.vx / 3);
                }
                else if (((this.scene.palet.getCentreX() - this.getCentreX()) / (this.scene.palet.getLargeur()) / 2) > 0.85 && this.vx > 0) {
                    this.vx = -0.8 * this.vx;
                    console.log(this.vx / 3);
                }
                if (y + this.getHauteur() > this.scene.palet.getY()) {
                    y = this.scene.palet.getY() - this.getHauteur();
                }
            }
            var tab_brique = this.scene.tab_brique;
            var touche = false;
            for (var i = 0; i < tab_brique.length; i++) {
                if (tab_brique[i] != null && Sprite.collision(this.getCercle(1), tab_brique[i].getRectangle())) {
                    this.scene.retirer(tab_brique[i]);
                    if (y + this.getHauteur() / 3 < tab_brique[i].getY() + tab_brique[i].getHauteur()) {
                        this.vx = -this.vx;
                    }
                    else {
                        this.vy = -this.vy;
                    }
                    tab_brique[i] = null;
                    this.compteur = this.compteur + 1;
                }
            }
            this.setXY(x, y);
        }
        else {
            var x = this.scene.palet.getX() + this.scene.palet.getLargeur() / 2 - this.getLargeur() / 2;
            var y = this.scene.palet.getY() - this.getHauteur() - 1;
            this.setXY(x, y);
            console.log(this.can_move);
        }
    };
    Balle.prototype.enable_move = function () {
        this.can_move = true;
        console.log(this.can_move);
        window.removeEventListener("click", this.click);
    };
    Balle.prototype.animer = function () {
        var _this = this;
        this.click = function (e) {
            _this.enable_move();
        };
        window.addEventListener("click", this.click);
        this.timerAnimation = setInterval(function () { _this.bouger(); }, 1000 / 240);
    };
    Balle.prototype.figer = function () {
        clearInterval(this.timerAnimation);
    };
    return Balle;
}(Sprite));
