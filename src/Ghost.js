var Ghost = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile(s_SkullSign);
		this.randomPosition();
		this.x = this.getPosition().x;
		this.y = this.getPosition().y;

		this.dir = Ghost.DIR.Still;

		this.setOpacity(0);
		this.inGame = false;
		this.ghostBorn();
		this.moveSchedule();
		this.setAnchorPoint(0.5,0);
		this.scheduleUpdate();

	},

	timeTrack: function(){
		this.schedule(
			function(){ this.time++;},1
			);
	},
	randomPosition: function(){
		var newX = (Math.random()*650)+300;
		this.setPosition(cc.p( newX, ground_floor1+(GameLayer.Level-1)*200));
	},

	ghostBorn: function(){
		var time = 0;
		this.schedule(
			function(){
				if(time == 2){
					this.initWithFile(s_Ghost);
					this.setAnchorPoint(0.5, 0);
					this.inGame = true;
					this.setScale(0.8);
				}
				time++; },1
			);
	},
	flipCharacter: function(dir){
		if(dir == Ghost.DIR.Right){	
			this.setFlippedX(false);
		}
		if(dir == Ghost.DIR.Left){
			this.setFlippedX(true);
		}
	},

	closeTo: function( obj ){
		if(this.inGame){
			var myPos = this.getPosition();
			var oPos = obj.getPosition();
			return ((Math.abs(myPos.x - oPos.x))<=50 && Math.abs(myPos.y - oPos.y)<=50);
		}
	},

	moveSchedule: function(){
			var self = this;
			this.schedule(
				function(){
					if(this.inGame){
						self.autoMove();
					}},1
				);
	},
	checkBorderLeft: function(){
		var myPos = this.getPosition();
		return (myPos.x >= borderLeft) || (this.dir>=0);
	},

	checkBorderRight: function(){
		var myPos = this.getPosition();
		return (myPos.x <= borderRight) || (this.dir<=0); 
	},

	updatePosition: function(){
		this.setPosition(cc.p(this.x, this.y));
	},

	autoMove: function(){
		this.dir = Math.floor((Math.random()*3)-1);
	},

	update: function( dt ){
		if(!this.inGame) {
			if(!this.summonAction || this.summonAction.isDone()){
				var fadeOut = cc.FadeOut.create(0.5);
            	var fadeIn = cc.FadeIn.create(0.5);
            	var delay = cc.DelayTime(0.5);
            	this.summonAction = cc.Sequence.create(fadeIn,delay,fadeOut);
            	this.runAction(this.summonAction);
            }
		}
		else if(this.inGame){
			this.setOpacity(255);
		}
		if(this.checkBorderLeft() && this.checkBorderRight()){
			this.x += Ghost.Vx*this.dir;
		}
		this.flipCharacter(this.dir);
		this.updatePosition();
	}
});

Ghost.Vx = 4;
Ghost.DIR ={
	Left: -1,
	Right: 1,
	Still: 0
};