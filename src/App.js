import logo from './logo.svg';
import './App.css';
import React from 'react';

function Clock(){
  //const breakLengthNum=document.getElementById("break-length");
  //const sessionLengthNum=document.getElementById("session-length");
  //const timerLengthNum=document.getElementById("timer-left")
  let sessionTimer;
  let sessionProgress=false;
  let sessionlen;
  let sessionStart=false;
  
  let breakTimer;
  let breakProgress=false;
  let breaklen;
  let breakStart=false;
  
  
  const handleBreakAdd=()=>{
    if(!(sessionProgress || breakProgress)){
      const breakLengthNum=document.getElementById("break-length");
      if (breakLengthNum.innerHTML !== 60){
        breakLengthNum.textContent=eval(breakLengthNum.innerHTML+'+1');
      }
    }
  }
  const handleBreakSubtract=()=>{
    if(!(sessionProgress || breakProgress)){
      const breakLengthNum=document.getElementById("break-length");
      if(breakLengthNum.innerHTML!==1){
        breakLengthNum.textContent=eval(breakLengthNum.innerHTML+'-1');
      }
    }
  }
  const handleSessionAdd=()=>{
    if(!(sessionProgress || breakProgress)){
      const sessionLengthNum=document.getElementById("session-length");
      if (sessionLengthNum.innerHTML !== 60){
        const timerLengthNum=document.getElementById("time-left");
        const num=eval(sessionLengthNum.innerHTML+'+1');
        sessionLengthNum.textContent=num;
        if (num.toString().length === 1){
          timerLengthNum.textContent='0'+ num +':00';
        } else {
          timerLengthNum.textContent=num +':00';
        }
        sessionStart=false;
      }
    }
  }
  const handleSessionSubtract=()=>{
    if(!(sessionProgress || breakProgress)){
      const sessionLengthNum=document.getElementById("session-length");
      if (sessionLengthNum.innerHTML !== 1){
        const timerLengthNum=document.getElementById("time-left");
        const num=eval(sessionLengthNum.innerHTML+'-1');
        sessionLengthNum.textContent=num;
        if (num.toString().length === 1){
          timerLengthNum.textContent='0'+ num +':00';
        } else {
          timerLengthNum.textContent=num +':00';
        }
        sessionStart=false;
      }
    }
  }
  const handleRefresh=()=>{
    const breakLengthNum=document.getElementById("break-length");
    const sessionLengthNum=document.getElementById("session-length");
    const timerLengthNum=document.getElementById("time-left");
    document.getElementById('timer-label').innerHTML="Session";
    breakLengthNum.textContent='5';
    sessionLengthNum.textContent='25';
    timerLengthNum.textContent='25:00';
    clearInterval(sessionTimer);
    sessionProgress=false;
    sessionStart=false;
    clearInterval(breakTimer);
    breakProgress=false;
    breakStart=false;
    document.getElementById("beep").load();
  }
  
  const handlePlay=()=>{
    const title=document.getElementById('timer-label').innerHTML;
    if (title==="Session"){
      startSession();
    } else {
      startBreak();
    }
  }
  
  function startBreak(){
    if (!breakProgress){
      clearInterval(breakTimer);
      breakProgress=true;
      document.getElementById('timer-label').innerHTML="Break";
      const timerLengthNum=document.getElementById("time-left");
      if (!breakStart){
        breaklen = eval(document.getElementById("break-length").innerHTML)*60;
        breakStart=true;
        const btime=document.getElementById("break-length").innerHTML;
        if (btime.length===1){
          document.getElementById('time-left').innerHTML='0'+ btime +':00';
        } else {
          document.getElementById('time-left').innerHTML=btime+':00';
      }
        //breaklen=5;                 //tesing purpose--------------------------------
      }
      breakTimer=setInterval(() => {
        breaklen -= 1;
        var minute= Math.floor(breaklen / 60);
        var seconds= breaklen % 60;
        if ((minute.toString().length === 1) && (seconds.toString().length ===1)){
          timerLengthNum.textContent='0'+ minute.toString()+":0"+seconds.toString();
        } else if ((minute.toString().length === 1) && (seconds.toString().length !== 1)){
          timerLengthNum.textContent='0'+ minute.toString()+":"+seconds.toString();
        } else if ((minute.toString().length !== 1) && (seconds.toString().length === 1)){
          timerLengthNum.textContent=minute.toString()+":0"+seconds.toString();
        } else {
          timerLengthNum.textContent=minute.toString()+":"+seconds.toString();
        }
        if(breaklen=== 0){document.getElementById("beep").play();}
        if (breaklen=== -1){
          clearInterval(breakTimer);
          breakStart=false;
          breakProgress=false;
          startSession();
        }
      },1000);
    } else {
      breakProgress=false;
      clearInterval(breakTimer);
    }
  }
  
  function startSession(){
    if (!sessionProgress){
      clearInterval(breakTimer);
      sessionProgress=true;
      document.getElementById('timer-label').innerHTML="Session";
      const timerLengthNum=document.getElementById("time-left");
      if (!sessionStart){
        sessionlen = eval(document.getElementById("session-length").innerHTML)*60;
        sessionStart=true;
        const stime=document.getElementById("session-length").innerHTML;
        if (stime.length===1){
          document.getElementById('time-left').innerHTML='0'+ stime +':00';
        } else {
          document.getElementById('time-left').innerHTML=stime+':00';
      }
        //sessionlen=5;                 //tesing purpose--------------------------------
      }
      sessionTimer=setInterval(() => {
        sessionlen -= 1;
        var minute= Math.floor(sessionlen / 60);
        var seconds= sessionlen % 60;
        if ((minute.toString().length === 1) && (seconds.toString().length ===1)){
          timerLengthNum.textContent='0'+ minute.toString()+":0"+seconds.toString();
        } else if ((minute.toString().length === 1) && (seconds.toString().length !== 1)){
          timerLengthNum.textContent='0'+ minute.toString()+":"+seconds.toString();
        } else if ((minute.toString().length !== 1) && (seconds.toString().length === 1)){
          timerLengthNum.textContent=minute.toString()+":0"+seconds.toString();
        } else {
          timerLengthNum.textContent=minute.toString()+":"+seconds.toString();
        }
        if(sessionlen=== 0){document.getElementById("beep").play();}
        if (sessionlen=== -1){
          clearInterval(sessionTimer);
          sessionStart=false;
          sessionProgress=false;
          startBreak();
        }
      },1000);
    } else {
      sessionProgress=false;
      clearInterval(sessionTimer);
    }
  }
  
  
  
  
  return(
    <div id="clock-body">
      <div class="format-title">25 + 5 Clock</div>
      
      <div id="lengths">
        <div id="lengths-container">
          <div id="break-label" class="format-text">Break Length</div>
          <div>
            <button id="break-decrement" onClick={handleBreakSubtract}><i class="fa fa-arrow-down"></i></button>
            <span id="break-length">5</span>
            <button id="break-increment" onClick={handleBreakAdd}><i class="fa fa-arrow-up"></i></button>
          </div>
        </div>
        <div id="lengths-container">
          <div id="session-label" class="format-text">Session Length</div>
          <div>
            <button id="session-decrement" onClick={handleSessionSubtract}><i class="fa fa-arrow-down"></i></button>
            <span id="session-length">25</span>
            <button id="session-increment" onClick={handleSessionAdd}><i class="fa fa-arrow-up"></i></button>
          </div>
        </div>
        
      </div>
      
      <div id="timer-container">
        <div id="timer-label" class="format-text">Session</div>
        <div id="time-left" class="format-text">25:00</div>
      </div>
      
      <div id="control-container">
        <button id="start_stop" onClick={handlePlay}><i class="fa fa-play"></i><i class="fa fa-pause"></i></button>
        <button id="reset" onClick={handleRefresh}><i class="fa fa-refresh"></i></button>
      </div>
      <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
}

export default Clock;
