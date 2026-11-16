// A small deterministic Gomoku bot: take a win, block a win, then build open lines.
export const CARO_SIZE=11, CARO_TARGET=5;
const directions=[[1,0],[0,1],[1,1],[1,-1]];
const inside=(x,y)=>x>=0&&y>=0&&x<CARO_SIZE&&y<CARO_SIZE;
export function winningLine(board,index,side=board[index]){
 if(!side)return [];
 const x=index%CARO_SIZE,y=Math.floor(index/CARO_SIZE);
 for(const [dx,dy] of directions){const line=[index];
  for(const sign of [-1,1])for(let k=1;inside(x+dx*k*sign,y+dy*k*sign);k++){
   const at=(y+dy*k*sign)*CARO_SIZE+x+dx*k*sign;if(board[at]!==side)break;line.push(at);
  }
  if(line.length>=CARO_TARGET)return line;
 }
 return [];
}
function shapeScore(board,index,side){
 const x=index%CARO_SIZE,y=Math.floor(index/CARO_SIZE);let total=0;
 for(const [dx,dy] of directions){let count=1,open=0;
  for(const sign of [-1,1]){let k=1;while(inside(x+dx*k*sign,y+dy*k*sign)&&board[(y+dy*k*sign)*CARO_SIZE+x+dx*k*sign]===side){count++;k++;}
   if(inside(x+dx*k*sign,y+dy*k*sign)&&board[(y+dy*k*sign)*CARO_SIZE+x+dx*k*sign]===0)open++;
  }
  total+=count>=5?1e7:open?[0,2,14,110,1800][count]*(open===2?3:1):0;
 }
 return total;
}
export function botMove(board,random=()=>.5){
 const empty=board.map((v,i)=>v===0?i:-1).filter(i=>i>=0);if(!empty.length)return -1;
 for(const side of [2,1]){const wins=empty.filter(i=>{const b=[...board];b[i]=side;return winningLine(b,i,side).length;});if(wins.length)return wins[Math.min(wins.length-1,Math.floor(random()*wins.length))];}
 const occupied=board.map((v,i)=>v?i:-1).filter(i=>i>=0);
 if(!occupied.length)return Math.floor(board.length/2);
 const scored=empty.filter(i=>occupied.some(j=>Math.abs(i%CARO_SIZE-j%CARO_SIZE)<=2&&Math.abs(Math.floor(i/CARO_SIZE)-Math.floor(j/CARO_SIZE))<=2)).map(i=>({i,score:shapeScore(board,i,2)+shapeScore(board,i,1)*1.1+(CARO_SIZE-Math.abs(i%CARO_SIZE-5)-Math.abs(Math.floor(i/CARO_SIZE)-5))*.1}));
 scored.sort((a,b)=>b.score-a.score);const best=scored[0].score,candidates=scored.filter(x=>x.score>=best*.96);
 return candidates[Math.min(candidates.length-1,Math.floor(random()*candidates.length))].i;
}
export function newBoard(emperor,month){return {board:Array(CARO_SIZE**2).fill(0),emperor,month,status:'playing',lastPlayer:null,lastBot:null,line:[],rewarded:false,chest:null};}
export function playTurn(game,index,random){
 if(game.status!=='playing'||!Number.isInteger(index)||index<0||index>=game.board.length||game.board[index])return {error:'Ô này không thể đặt quân.'};
 game.board[index]=1;game.lastPlayer=index;game.line=winningLine(game.board,index);
 if(game.line.length){game.status='won';return {status:game.status};}
 if(game.board.every(Boolean)){game.status='draw';return {status:game.status};}
 const move=botMove(game.board,random);game.board[move]=2;game.lastBot=move;game.line=winningLine(game.board,move);
 if(game.line.length)game.status='lost';else if(game.board.every(Boolean))game.status='draw';
 return {status:game.status,bot:move};
}
export function validateBoard(game){
 if(!game)return;
 const b=game.board;if(!Array.isArray(b)||b.length!==CARO_SIZE**2||b.some(v=>![0,1,2].includes(v))||!['playing','won','lost','draw'].includes(game.status)||typeof game.rewarded!=='boolean'||typeof game.emperor!=='string'||!Number.isInteger(game.month)||game.month<0)throw Error('Ván caro không hợp lệ.');
 const a=b.filter(v=>v===1).length,c=b.filter(v=>v===2).length;
 if(a<c||a>c+1||game.status==='playing'&&a!==c)throw Error('Lượt caro không hợp lệ.');
 const w1=b.some((v,i)=>v===1&&winningLine(b,i).length),w2=b.some((v,i)=>v===2&&winningLine(b,i).length);
 if(w1&&w2||game.status==='won'&&(!w1||a!==c+1)||game.status==='lost'&&(!w2||a!==c)||game.status==='playing'&&(w1||w2||b.every(Boolean))||game.status==='draw'&&(w1||w2||b.some(v=>!v)))throw Error('Kết quả caro không hợp lệ.');
 if(game.rewarded!==(game.status==='won')||game.rewarded&&typeof game.chest!=='string')throw Error('Ban thưởng caro không hợp lệ.');
 for(const k of ['lastPlayer','lastBot'])if(game[k]!==null&&(!Number.isInteger(game[k])||game[k]<0||game[k]>=b.length||b[game[k]]!==(k==='lastPlayer'?1:2)))throw Error('Nước cờ cuối không hợp lệ.');
 if(!Array.isArray(game.line)||game.line.some(i=>!Number.isInteger(i)||i<0||i>=b.length))throw Error('Đường thắng caro không hợp lệ.');
 const side=game.status==='won'?1:game.status==='lost'?2:0;
 if(side){const at=b.findIndex((v,i)=>v===side&&winningLine(b,i,side).length);game.line=winningLine(b,at,side);}else game.line=[];
}
