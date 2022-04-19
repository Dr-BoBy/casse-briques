class Balle extends Sprite {
    public xmin :number;
    public xmax :number;
    public ymin :number;
    public ymax :number;
    public scene : Scene;
    public can_move : boolean;
    public compteur: number;

    public constructor(balise:HTMLElement, scene : Scene){
        super(balise);
        this.xmin =0;
        this.xmax =0;
        this.ymin =0;
        this.ymax =0;
        this.scene= scene;
        this.can_move=false;
        this.compteur=0;
    }

    public setLimites(zone:Sprite){
        this.xmin =zone.getX();
        this.xmax =zone.getX() + zone.getLargeur() - this.getLargeur();
        this.ymin =zone.getY();
        this.ymax =zone.getY() + zone.getHauteur() - this.getHauteur();
    }
    public vx: number;
    public vy: number;

    public bouger(){
        if  (this.can_move==true){
            let x : number = this.getX()+ this.vx;
            let y : number = this.getY()+ this.vy;
            if (x<=this.xmin){
                this.vx=-this.vx;
            }
            if (x>=this.xmax){
                this.vx=-this.vx;
            }
            if (y<=this.ymin){
                this.vy=-this.vy;
            }
            if (y>=this.ymax){
                this.figer();
                this.scene.looseAnimation()
            }
            //COllision palet
            if (Sprite.collision(this.getCercle(1),this.scene.palet.getRectangle())){
                this.vy=-this.vy;
                this.vx=((this.scene.palet.getCentreX()-this.getCentreX())/(this.scene.palet.getLargeur()/2))*3
                console.log(this.vx/3);
                console.log(this.vx>0);
                if(((this.scene.palet.getCentreX()-this.getCentreX())/(this.scene.palet.getLargeur())/2)<-0.85 && this.vx<0){
                    this.vx=-0.8*this.vx;
                    console.log(this.vx/3);
                }
                else if(((this.scene.palet.getCentreX()-this.getCentreX())/(this.scene.palet.getLargeur())/2)>0.85 && this.vx>0){
                    this.vx=-0.8*this.vx;
                    console.log(this.vx/3);
                }
                if (y+this.getHauteur()>this.scene.palet.getY()){
                    y=this.scene.palet.getY()-this.getHauteur();
                }
                
            }
            //Collision brique
            let tab_brique : Array<Sprite>=this.scene.tab_brique;
            let touche : boolean = false;
            
            for (let i=0; i<tab_brique.length;i++ ){
                if(tab_brique[i]!=null && Sprite.collision(this.getCercle(1),tab_brique[i].getRectangle())){
                    this.scene.retirer(tab_brique[i]);
                    if (y+this.getHauteur()/3<tab_brique[i].getY()+tab_brique[i].getHauteur()){
                        this.vx=-this.vx;
                    }
                    else {
                        this.vy=-this.vy;
                    }
                    tab_brique[i]=null;
                    this.compteur=this.compteur+1;
                }
            }
            this.setXY(x,y);
        }
        else {
            let x=this.scene.palet.getX()+this.scene.palet.getLargeur()/2-this.getLargeur()/2;
            let y=this.scene.palet.getY()-this.getHauteur()-1;
            this.setXY(x,y);
            console.log(this.can_move)
        }
    }
    private timerAnimation:number;
    private click:any;
    public enable_move(){
        this.can_move=true;
        console.log(this.can_move)
        window.removeEventListener("click",this.click);

    }
    public animer(){
        this.click = (e : MouseEvent) => {
            this.enable_move();
        };
        window.addEventListener("click",this.click);
        this.timerAnimation=setInterval(()=>{this.bouger()},1000/240);
    }

    public figer(){
        clearInterval(this.timerAnimation);
    }
}