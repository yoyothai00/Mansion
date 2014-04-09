var Kyoda = cc.Sprite.extend({

	ctor: function(x, y){
		this._super();
		this.initWithFile('images/kyoda.png');

		this.x = x;
		this.y = y;
		this.direction = Kyoda.DIR.LEFT;
		this.updatePosition();

		this.checkBorderLeft();
		this.checkBorderRight();

		this.isLeft = false;
		this.isRight = false;
		
	},

	updatePosition: function(){
		this.setPosition(cc.p(this.x, this.y));
	},

	flipCharacter: function(dir){
		if(this.direction == Kyoda.DIR.RIGHT)
		{	
			this.setFlippedX(true);
		}
		if(this.direction == Kyoda.DIR.LEFT)
		{
			this.setFlippedX(false);
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

	update: function( dt ){
		if( this.isLeft && this.checkBorderLeft())
		{
			this.x -= Kyoda.MOVE_STEP;
			this.flipCharacter(this.direction);
		}
		if( this.isRight && this.checkBorderRight())
		{
			this.x += Kyoda.MOVE_STEP;	
			this.flipCharacter(this.direction);
		}

		this.updatePosition();
	}
});


Kyoda.MOVE_STEP = 5;
Kyoda.DIR = {
	LEFT: -1,
	RIGHT: 1
};