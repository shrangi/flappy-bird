var cvs= document.getElementById("canvas");
var ctx= cvs.getContext("2d");

//load images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src="birdie.png";
bg.src="bg.png";
fg.src="fg.png";
pipeNorth.src="pipeNorth.png";
pipeSouth.src="pipeSouth.png";

var gap = 100;
var constant =pipeNorth.height + gap;

var bx=20;
var by=150;
var gravity=2;

document.addEventListener("keydown",moveup);
function moveup()
{by-=25   ;
}   

var pipe=[];
 
pipe[0]={
    x : cvs.width,
    y : -100  
}

var score=0;
function draw()
{
    ctx.drawImage(bg, 0,0);  
    
    for(var i=0;i<pipe.length;i++)
    { ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
      ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
      pipe[i].x--;
      if(pipe[i].x==150)
       {
         pipe.push(
            {x : cvs.width,
             y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }
        if((bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width) && 
           (by <=pipe[i].y + pipeNorth.height || by + bird.height >=pipe[i].y+constant) || 
           by + bird.height >= cvs.height -(fg.height-20))
         {location.reload();}  

         if(pipe[i].x== 5 )
             score++;
    }
    ctx.drawImage(fg,0,500);
    ctx.drawImage(bird,bx,by);
    by+=gravity;

    ctx.fillStyle = "#000";
    ctx.font =" 30px comic sans"
    ctx.fillText("Score " + score, 10, cvs.height-20);
    requestAnimationFrame(draw);
}
draw();
