var Kyoda = cc.Sprite.extend({

	ctor: function(x, y){
		this._super();
		this.initWithFile(s_Kyoda);

		this.x = x;
		this.y = y;
		this.direction = Kyoda.DIR.LEFT;
		this.updatePosition();


		this.checkGround();
		this.checkBorderLeft();
		this.checkBorderRight();
		this.checkJumpTop();

		this.isLeft = false;
		this.isRight = false;
		this.isJump = false;
		this.isTop = false;
		this.isHide = false;
		
	},

	checkGround: function(){
		return this.y <= ground_floor1;
	},

	updatePosition: function(){
		this.setPosition(cc.p(this.x, this.y));
	},

	flipCharacter: function(dir){
		if(this.isRight)
		{	
			this.setFlippedX(true);
		}
		if(this.isLeft)
		{
			this.setFlippedX(false);
		}
	},


	jump: function(){
		if(this.checkGround())
		{
			Kyoda.Vy = Kyoda.accelJump;
			this.isJump = true;
		}

	},

	setDirection: function( isMove, dir ){
		if(dir == Kyoda.DIR.LEFT)
		{
			this.isLeft = isMove;			
			this.direction = dir;
		}
		if(dir == Kyoda.DIR.RIGHT)
		{
			this.isRight = isMove;
			this.direction = dir;
		}
	},

	checkBorderLeft: function(){
		var myPos = this.getPosition();
		return myPos.x >= borderLeft;
	},

	checkBorderRight: function(){
		var myPos = this.getPosition();
		return myPos.x <= borderRight;
	},

	checkJumpTop: function(){
		return (this.y >= Kyoda.Max_Vy + ground_floor1);
	},

	hide: function(){
		if(!this.isHide)
		{
			this.setVisible(false);
			this.isHide = true;
		}
		else{
			this.setVisible(true);
			this.isHide = false;
		}
	},
	
	remove: function(){
		this.removeFromParent( true );
	},

	update: function( dt ){
		if(!this.isHide)
		{
			if( this.isLeft && this.checkBorderLeft())
			{
				this.x -= Kyoda.Vx;

			}
			if( this.isRight && this.checkBorderRight())
			{
				this.x += Kyoda.Vx;	
			}

			if( this.isJump )
			{
				Kyoda.Vy -= Kyoda.g;
			}

			if( Kyoda.Vy<= 0 && this.checkGround())
			{
				this.isJump = false;
				Kyoda.Vy = 0;
			}

			this.y += Kyoda.Vy;
		}
		this.flipCharacter();
		this.updatePosition();
	}
});



Kyoda.accelJump = 11;
Kyoda.Vx = 6;
Kyoda.Vy = 0;
Kyoda.g = 0.5;
Kyoda.DIR = {
	LEFT: -1,
	RIGHT: 1
};