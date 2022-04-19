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
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene(balise) {
        var _this = _super.call(this, balise) || this;
        _this.setDimension(900, 900);
        _this.setX(_this.getLargeur() / 2);
        _this.setY(30);
        return _this;
    }
    Scene.prototype.demarrer = function () {
        var jeu = new Sprite(document.getElementById("jeu"));
        jeu.setXY(10, 10);
        jeu.setDimension(this.getLargeur() - 20, this.getHauteur() - 20);
        this.balle = new Balle(document.createElement("img"), this);
        this.balle.setImage("rond_rouge.png", 30, 30);
        this.ajouter(this.balle);
        this.balle.setLimites(jeu);
        this.balle.setXY(this.balle.xmax / 2, this.balle.ymax / 2);
        this.palet = new Palet(document.createElement("img"));
        this.palet.setImage("palet.png", 90, 20);
        this.ajouter(this.palet);
        this.palet.setLimites(jeu);
        this.palet.setXY(this.palet.xmax / 2, jeu.getHauteur() - 100);
        this.balle.vx = 2, 3;
        this.balle.vy = 2;
        this.balle.animer();
        this.palet.follow(jeu);
        this.tab_brique = new Array();
        var y = 35;
        for (var i = 0; i < 4; i++) {
            var x = 35;
            for (var j = 0; j < 12; j++) {
                var brique = new Sprite(document.createElement("img"));
                brique.setImage("brique.png", 60, 60);
                this.ajouter(brique);
                brique.setXY(x, y);
                this.tab_brique.push(brique);
                x = x + 70;
                ;
            }
            y = y + 70;
        }
    };
    Scene.prototype.looseAnimation = function () {
        var msg_loose = new Sprite(document.createElement("img"));
        msg_loose.setImage("loose.png", 500, 500);
        msg_loose.setXY(this.getLargeur() / 2 - msg_loose.getLargeur() / 2, this.getHauteur() / 2 - msg_loose.getHauteur() / 2);
        this.ajouter(msg_loose);
        this.new = function (e) {
            window.location.href = "scene.htm";
        };
        window.addEventListener("click", this.new);
    };
    Scene.prototype.arreter = function () {
    };
    return Scene;
}(Sprite));
