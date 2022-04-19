//==================================================================================================
// ANIMATION AVEC TYPESCRIPT                                                               Scene.ts
//==================================================================================================

// Classe  S c e n e //-----------------------------------------------------------------------------
class Scene extends Sprite {
 //----------------------------------------------------------------------------------------Attributs
 /* Declarer ici les attributs de la scene. */
   public balle : Balle;
   public palet : Palet;
   public tab_brique: Array<Sprite>;
 //-------------------------------------------------------------------------------------Constructeur
    public constructor(balise : HTMLElement) {
    super(balise);
    this.setDimension(900,900);
    this.setX(this.getLargeur()/2);
    this.setY(30);
    }

 //-----------------------------------------------------------------------------------------demarrer
   public demarrer() {
      let jeu : Sprite = new Sprite(document.getElementById("jeu"));
      jeu.setXY(10,10);
      jeu.setDimension(this.getLargeur()-20,this.getHauteur()-20);

      this.balle = new Balle(document.createElement("img"),this);
      this.balle.setImage("rond_rouge.png",30,30)
      this.ajouter(this.balle);
      this.balle.setLimites(jeu);
      this.balle.setXY(this.balle.xmax/2,this.balle.ymax/2);

      this.palet = new Palet(document.createElement("img"));
      this.palet.setImage("palet.png",90,20);
      this.ajouter(this.palet);
      this.palet.setLimites(jeu);
      this.palet.setXY(this.palet.xmax/2,jeu.getHauteur()-100);
      

      this.balle.vx= 2,3 //Math.random()*4-2;
      this.balle.vy= 2 //Math.random()*4-2;;
      this.balle.animer();
      
      this.palet.follow(jeu);

      this.tab_brique=new Array<Sprite>();
      let y=35;
      for (let i =0; i<4; i++){
        let x=35;
        for (let j = 0; j < 12; j++) {
          let brique : Sprite = new Sprite(document.createElement("img"));
          brique.setImage("brique.png",60,60)
          this.ajouter(brique);
          brique.setXY(x,y);
          this.tab_brique.push(brique);
          x=x+70;;
        }
        y=y+70;
      }
   }
   private new:any;
   public looseAnimation(){
    let msg_loose = new Sprite(document.createElement("img"));
    msg_loose.setImage("loose.png",500,500);
    msg_loose.setXY(this.getLargeur()/2-msg_loose.getLargeur()/2,this.getHauteur()/2-msg_loose.getHauteur()/2);
    this.ajouter(msg_loose);
    this.new = (e : MouseEvent) => {
      window.location.href="scene.htm";
    }
    window.addEventListener("click",this.new)
   }
 //------------------------------------------------------------------------------------------arreter
   public arreter() {
  /* Ecrire ici le code qui termine la scene. */
    }
}

// Fin //-------------------------------------------------------------------------------------------
