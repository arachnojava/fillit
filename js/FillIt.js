// Fill It!
// by Avery Henson and Michael Henson

/*
$(document).ready(function(){
    $("#startButton").click(function()
	{
        setInterval(function() 
		{
			if(gamePlaying) {

					}
			}
        },1000);
    });
});
*/

//window.alert("HI!");

// Extra Variables for Features
var gamePlaying = true;

	// Keyboard Constants (separate file?)
	var KEY_ARROW_LEFT  = 37;
	var KEY_ARROW_UP    = 38;
	var KEY_ARROW_RIGHT = 39;
	var KEY_ARROW_DOWN  = 40;
	
	// Game Constants
	var COLOR_START = "#66FF66";
	var COLOR_CURSOR = "black";
	var GRID_SIZE = 10;
	var GRID_SPACE_SIZE = 640/10;
	var GRID_SPACE_NULL       = 0;
	var GRID_SPACE_OPEN       = 1;
	var GRID_SPACE_WALL       = 2;
	var GRID_SPACE_PATH       = 3;
	var GRID_SPACE_START      = 4;
	var GRID_SPACE_FINISH     = 5;
	var GRID_SPACE_TELEPORTER = 6;
	var GRID_SPACE_SKIP       = 7;

	// "Engine" parts
	var canvas = document.getElementById("gameCanvas");
	var context = canvas.getContext("2d");

	// Game objects
	var grid = new Grid();
	var cursor = new Cursor();
	var stateMessage = new StateMessage();

	function setDebugText(message)
	{
		document.getElementById("debug").innerHTML = message;
	}
	
	function fourDigitFormat(n)
	{
		var pad = "";
		if (n < 1000)
			pad += "0";
		if (n < 100)
			pad += "0"		
		if (n < 10)
			pad += "0";

		return pad + n;
	}

	function initializeImages() 
	{
		// TODO:  Load images.
		grid.init(1);
		draw();
	}
	initializeImages();

	function draw() 
	{
		// update phase
		grid.update();
		cursor.update();
			
		// render phase
		grid.draw();
		cursor.draw();
		stateMessage.draw();
		
			
		if(gamePlaying)
			timeOut = setTimeout(draw, 50);
	}

	
	function Grid()
	{
		var NUM_LEVELS = 2;
		this.grid = new Array(GRID_SIZE);
		//for (var r = 0; r < GRID_SIZE; r++)
		//	this.grid[r] = new Array(GRID_SIZE);


		this.init = function(level)
		{
			stateMessage.visible = false;		
			gamePlaying = true;
			if (level >= NUM_LEVELS)
				level = 0;

			if (level == 0)
			{
		this.grid[0] = [ GRID_SPACE_START, GRID_SPACE_OPEN, GRID_SPACE_OPEN, GRID_SPACE_FINISH, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
		this.grid[1] = [ GRID_SPACE_OPEN , GRID_SPACE_OPEN, GRID_SPACE_OPEN, GRID_SPACE_OPEN, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
		this.grid[2] = [ GRID_SPACE_OPEN , GRID_SPACE_WALL, GRID_SPACE_WALL, GRID_SPACE_OPEN, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
		this.grid[3] = [ GRID_SPACE_OPEN , GRID_SPACE_OPEN, GRID_SPACE_OPEN, GRID_SPACE_OPEN, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
		this.grid[4] = [GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
		this.grid[5] = [GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
		this.grid[6] = [GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
		this.grid[7] = [GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
		this.grid[8] = [GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
		this.grid[9] = [GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
			}
			else if (level == 1)
			{
		this.grid[0] = [ GRID_SPACE_START, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
		this.grid[1] = [ GRID_SPACE_OPEN , GRID_SPACE_NULL, GRID_SPACE_TELEPORTER, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
		this.grid[2] = [ GRID_SPACE_TELEPORTER , GRID_SPACE_NULL, GRID_SPACE_SKIP, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];

		this.grid[3] = [GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
		this.grid[4] = [GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_OPEN, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
		this.grid[5] = [ GRID_SPACE_NULL , GRID_SPACE_NULL, GRID_SPACE_FINISH, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
		this.grid[6] = [GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
		this.grid[7] = [GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
		this.grid[8] = [GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
		this.grid[9] = [GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL, GRID_SPACE_NULL   ];
			}
		}
		
		this.update = function()
		{
		}
		
		this.draw = function()
		{
			context.fillStyle = "#EEEEEE";
			context.fillRect(0,0,640,640);
			
			for (var r = 0; r < GRID_SIZE; r++)
			{
				for (var c = 0; c < GRID_SIZE; c++)
				{
					var x = c * GRID_SPACE_SIZE;
					var y = r * GRID_SPACE_SIZE;	
					if (this.grid[r][c] != GRID_SPACE_NULL)
					{
							context.fillStyle = "white";
							context.fillRect(x, y, GRID_SPACE_SIZE, GRID_SPACE_SIZE);

						if (this.grid[r][c] == GRID_SPACE_FINISH)
						{
							context.fillStyle = "red";
							context.fillRect(x, y, GRID_SPACE_SIZE, GRID_SPACE_SIZE);
						}
						else if (this.grid[r][c] == GRID_SPACE_PATH)
						{
							var DOT_SIZE = 15;
							var dotX = x + GRID_SPACE_SIZE / 2;// - DOT_SIZE / 2;
							var dotY = y + GRID_SPACE_SIZE / 2;// - DOT_SIZE / 2;
							context.beginPath();
							context.fillStyle = COLOR_START;
							context.arc(dotX, dotY, DOT_SIZE, 0, 2*Math.PI);
							context.fill();
						}
						else if (this.grid[r][c] == GRID_SPACE_START)
						{
							context.fillStyle = COLOR_START;
							context.fillRect(x, y, GRID_SPACE_SIZE, GRID_SPACE_SIZE);
						}
						else if (this.grid[r][c] == GRID_SPACE_WALL)
						{
							context.strokeStyle = "black";
							context.lineWidth = 6;
							var m = 10;
							context.beginPath();
							context.moveTo(x+m, y+m);
							context.lineTo(x+GRID_SPACE_SIZE-m, y+GRID_SPACE_SIZE-m);
							context.moveTo(x+GRID_SPACE_SIZE-m, y+m);
							context.lineTo(x+m, y+GRID_SPACE_SIZE-m);
							context.stroke();
						}
						else if (this.grid[r][c] == GRID_SPACE_TELEPORTER)
						{
							context.strokeStyle = "#0000FF"
							context.lineWidth = 1;
							var m = 10;
							var length = GRID_SPACE_SIZE - (m*2);
							context.beginPath();
							context.moveTo(x+m, y+m);
							while (length > 4)
							{
								context.lineTo(x+m+length, y+m);
								context.lineTo(x+m+length, y+m+length);
								context.lineTo(x+m, y+m+length);
								context.lineTo(x+m, y+m+4);
								m += 8;
								length = GRID_SPACE_SIZE - (m*2);
							}
							context.stroke();
						}
						else if (this.grid[r][c] == GRID_SPACE_SKIP)
						{
							context.strokeStyle = "#0000FF"
							context.lineWidth = 1;
							context.font = "24px Arial";
							context.fillStyle = "black";
							context.fillText("SKIP", x+5, y+GRID_SPACE_SIZE*0.7);
						}
						context.lineWidth = 1;
						context.strokeStyle = "black";
						context.strokeRect(x, y, GRID_SPACE_SIZE, GRID_SPACE_SIZE);
					}
				}
			}
		}		
	}
	
	
	function checkForWin()
	{
		var blanks = 0;
		for (var r = 0; r < GRID_SIZE; r++)
		{
			for (var c = 0; c < GRID_SIZE; c++)
			{
				if (canTraverse(grid.grid[r][c]))
					blanks++;
			}
		}
		
		return blanks;
	}
	
	function StateMessage()
	{
		this.message = "";
		this.visible = false;
		
		this.draw = function()
		{
			if (this.visible)
			{
				context.font = "30px Arial";
				context.fillStyle = "black";
				context.fillText(this.message, 10, GRID_SIZE * GRID_SPACE_SIZE - 10);
			}
		}
	}
	
	function distanceFromGoal(row, col)
	{
		// find goal
		for (var r = 0; r < GRID_SIZE; r++)
		{
			for (var c = 0; c < GRID_SIZE; c++)
			{
				if (grid.grid[r][c] == GRID_SPACE_FINISH)
				{
					return Math.abs(row - r) + Math.abs(col - c);
				}
			}
		}
		return 0;		
	}
	
	function teleport(player)
	{
		for (var r = 0; r < GRID_SIZE; r++)
		{
			for (var c = 0; c < GRID_SIZE; c++)
			{
				if (grid.grid[r][c] == GRID_SPACE_TELEPORTER)
				{
					if (player.targetRow != r || player.targetCol != c)
					{
						player.targetRow = r;
						player.targetCol = c;
						player.x = r * GRID_SPACE_SIZE;
						player.y = c * GRID_SPACE_SIZE;
						player.moveState = player.STATE_STOPPED;
						grid.grid[r][c] = GRID_SPACE_PATH;
						return;
					}
				}
			}
		}
	}
	
	function Cursor()
	{
		// Movement states
		this.STATE_MOVING = 0;
		this.STATE_STOPPED = 1;
		
		// Render states
		var RENDER_OFF = 0;
		var RENDER_ON = 1;
		var MAX_SIZE = 18;
		var MIN_SIZE = 12;
		
		this.targetRow = 0;
		this.targetCol = 0;
		this.x = 0;
		this.y = 0;
		this.size = 15;
		this.moveSpeed = 10;
		this.moveState = this.STATE_STOPPED;
		this.renderState = RENDER_ON;
		
		this.update = function()
		{
			if (Math.abs(this.x - this.targetCol*GRID_SPACE_SIZE) > this.moveSpeed)
			{
				this.moveState = this.STATE_MOVING;
				if (this.x > this.targetCol*GRID_SPACE_SIZE)
					this.x -= this.moveSpeed;
				else
					this.x += this.moveSpeed;
			}
			else if (Math.abs(this.y - this.targetRow*GRID_SPACE_SIZE) > this.moveSpeed)
			{
				this.moveState = this.STATE_MOVING;
				if (this.y > this.targetRow*GRID_SPACE_SIZE)
					this.y -= this.moveSpeed;
				else
					this.y += this.moveSpeed;
			}
			else
			{
				this.x = this.targetCol * GRID_SPACE_SIZE;
				this.y = this.targetRow * GRID_SPACE_SIZE;
				this.moveState = this.STATE_STOPPED;
				if (grid.grid[this.targetRow][this.targetCol] == GRID_SPACE_OPEN)
					grid.grid[this.targetRow][this.targetCol] = GRID_SPACE_PATH;
				else if (grid.grid[this.targetRow][this.targetCol] == GRID_SPACE_TELEPORTER)
				{
					grid.grid[this.targetRow][this.targetCol] = GRID_SPACE_PATH;
					teleport(this);
				}
				else if (grid.grid[this.targetRow][this.targetCol] == GRID_SPACE_FINISH)
				{
					var blanks = checkForWin();
					if (blanks <= 1)
					{
						stateMessage.message = "YOU WIN!";
						stateMessage.visible = true;
						gamePlaying = false;
					}
					else
					{
						stateMessage.message = "You left " + (blanks-1) + " spaces blank.  You lose.";
						stateMessage.visible = true;
						gamePlaying = false;
					}
				}
				else if (checkForWin() == 1 && distanceFromGoal(this.targetRow, this.targetCol) > 1) // not at end, but no blanks = lose
				{
					stateMessage.message = "You're trapped!  You lose.";
					stateMessage.visible = true;
						gamePlaying = false;
				}
			}
		}
		
		this.draw = function()
		{
			if (this.renderState == RENDER_ON)
			{
				if (this.size < MAX_SIZE)
					this.size++;
				else
					this.renderState = RENDER_OFF;
			}
			else
			{
				if (this.size > MIN_SIZE)
					this.size--;
				else
					this.renderState = RENDER_ON;
			}
				var dotX = this.x + GRID_SPACE_SIZE/2;
				var dotY = this.y + GRID_SPACE_SIZE/2;
				context.strokeStyle = COLOR_CURSOR;
				context.lineWidth = 4;
				context.beginPath();
				context.arc(dotX, dotY, this.size, 0, 2*Math.PI);
				context.stroke();			
		}
	}

	function canTraverse(gridSpace)
	{
		return (gridSpace == GRID_SPACE_OPEN || 
		        gridSpace == GRID_SPACE_FINISH ||
		        gridSpace == GRID_SPACE_SKIP ||
				gridSpace == GRID_SPACE_TELEPORTER);
	}
	
	document.onkeydown = keyDown;
	document.onkeyup = keyUp;
	document.onmousedown = keyDown;
	document.onmouseup = keyUp;

	
	function keyDown(e) {

		e = e || window.event;
		
		// TODO: Does JavaScript have a switch?
		//setDebugText("Key code: " + e.keyCode);
		
		if (cursor.moveState == cursor.STATE_MOVING)
			return;
		
		if (e.keyCode == KEY_ARROW_UP)
		{
			var row = cursor.targetRow - 1;
			if (row >= 0 && canTraverse(grid.grid[row][cursor.targetCol]))
			{
				cursor.targetRow--;
				
				if (grid.grid[cursor.targetRow][cursor.targetCol] == GRID_SPACE_SKIP)
					cursor.targetRow--;
			}
		}
		else if (e.keyCode == KEY_ARROW_DOWN)
		{
			var row = cursor.targetRow + 1;
			if (row < GRID_SIZE && canTraverse(grid.grid[row][cursor.targetCol]))
			{
				cursor.targetRow++;
				
				if (grid.grid[cursor.targetRow][cursor.targetCol] == GRID_SPACE_SKIP)
					cursor.targetRow++;
			}
		}
		else if (e.keyCode == KEY_ARROW_LEFT) 
		{
			var col = cursor.targetCol - 1;
			if (col >= 0 && canTraverse(grid.grid[cursor.targetRow][col]))
			{
				cursor.targetCol--;
				
				if (grid.grid[cursor.targetRow][cursor.targetCol] == GRID_SPACE_SKIP)
					cursor.targetCol--;
			}
		}
		else if (e.keyCode == KEY_ARROW_RIGHT) 
		{
			var col = cursor.targetCol + 1;
			if (col < GRID_SIZE && canTraverse(grid.grid[cursor.targetRow][col]))
			{
				cursor.targetCol++;
				
				if (grid.grid[cursor.targetRow][cursor.targetCol] == GRID_SPACE_SKIP)
					cursor.targetCol++;
			}
		}
	}

	function keyUp(e) 
	{
		e = e || window.event;
		//setDebugText("Key code: " + e.keyCode);
	}
	
	function mouseDown(e)
	{
		e = e || window.event;
		var center = canvas.width/2;
		if (e.clientX < center) 
		{
			player.action = ACTION_MOVE;	
			player.direction = DIRECTION_LEFT;
		}
		else
		{
			player.action = ACTION_MOVE;
			player.direction = DIRECTION_RIGHT;
		}
	}

	function mouseUp(e)
	{
		e = e || window.event;
		player.action = ACTION_IDLE;
	}
