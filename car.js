class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.accelaration=0.2;
        this.maxSpeed=3;
        this.friction = 0.05;
        this.angle = 0;

        this.controls = new Controls();
    }

    update(){
        if(this.controls.forward){
            this.speed += this.accelaration;
        }
        if(this.controls.reverse){
            this.speed -= this.accelaration;
        }

        if(this.speed > this.maxSpeed){
            this.speed = this.maxSpeed;
        }
        if(this.speed < -this.maxSpeed/2){            /*this.maxSpeed delimo sa dva da bi u nazad auto isao sporije*/
            this.speed = -this.maxSpeed/2;
        }

        if(this.speed > 0){
            this.speed -= this.friction                 /*Ovo znaci da trenje zaustavlja auto kada se aktivira arrowUp (Kada pustimo gas :D )*/
        }
        if(this.speed < 0){
            this.speed += this.friction
        }
        if(Math.abs(this.speed) < this.friction){       /*Ovo radimo da se auto ne bi pomerao kada stoji u mestu ( pomera se zato sto trenje iz predhodnih if-ova utice na njega ) */
            this.speed = 0;                             /*Drugim recima , ako je brzina apsolutna vrednost koja je manja od trenja , stavi brzinu na 0*/
        }

        if(this.speed != 0){
            const flip = this.speed>0?1:-1              /*Dodato zato sto kada idemo u nazad komande za levo i desno se zamnene , pa je ovde dodat uslov da ako je brzina manja od nule da se komande za levo i desno zamene odnosno da ostanu iste ako je brzina veca od nule*/
            if(this.controls.left){
                this.angle += 0.03*flip;
            }
            if(this.controls.right){
                this.angle -= 0.03*flip;
            }
        }
        this.x -= Math.sin(this.angle)*this.speed;
        this.y -= Math.cos(this.angle)*this.speed;
        /*this.y -= this.speed;*/    /*Mat. operacija iznad je dodata da bi se auto kretao pod pravilnim uglom po x i y osi kada ide napred ili nazad , tacnije , x i y osa se krive pod uglom pod kojim auto stoji (Ceo koordinantni sistem se krivi za zadati ugao)*/ 
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();
    }
}