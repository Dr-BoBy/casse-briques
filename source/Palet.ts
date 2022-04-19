class Palet extends Sprite {
    public xmin : number;
    public xmax : number;


    public constructor(balise:HTMLElement){
        super(balise);
        this.xmin=0;
        this.xmax=0;
    }

    public setLimites(zone:Sprite){
        this.xmin =zone.getX();
        this.xmax =zone.getX() + zone.getLargeur() - this.getLargeur();
    }

    public move : any;
    public follow(zone:Sprite){
        this.move = (e : MouseEvent) => {
            let x=e.clientX-(zone.getLargeur()/2)-(this.getLargeur()/2+10);
            if(x<this.xmin){
                x=this.xmin;
            }
            if(x>this.xmax){
                x=this.xmax;
            }
            this.setX(x);
        };
        window.addEventListener("mousemove",this.move);
    }
    
    public disable_move(){
        window.removeEventListener("mousemove",this.move)
    }
}