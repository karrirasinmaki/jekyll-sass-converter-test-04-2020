(function() {

  window.onload = function(){
    initVideos();
  }

  function initVideos(){	
    var videoDivs = document.getElementsByClassName('cover-media');
    for(var i = 0; i < videoDivs.length; i++){
      var videoDiv = videoDivs[i];
      var iframe = videoDiv.getElementsByTagName('iframe')[0];
      if(iframe != undefined) {
        initPlayer(iframe);
      }
    }
  }

  function resizeIframe(iframe) {
    var ratioxW = 9/16;
    var ratioxH = 16/9;
    var videoDiv = iframe.parentElement;
    var containerHeight = videoDiv.clientHeight;
    var containerWidth = videoDiv.clientWidth;
    var iframeHeight = containerHeight; //(9/16) * containerWidth;
    var iframeWidth = containerWidth;
    var iframeTop = 0;
    var iframeLeft = 0;
    if (iframeHeight > iframeWidth * ratioxW) {
      iframeWidth = iframeHeight * ratioxH;
      iframeLeft = (containerWidth - iframeWidth) / 2;
    }
    else if (iframeWidth > iframeHeight * ratioxH) {
      iframeHeight = iframeWidth * ratioxW;
      iframeTop = (containerHeight - iframeHeight) / 2;
    }
    iframe.setAttribute("height", iframeHeight);
    iframe.setAttribute("width", iframeWidth);
    iframe.style.height = iframeHeight + "px";
    iframe.style.width = iframeWidth + "px";
    iframe.style.left = iframeLeft + "px";
    iframe.style.top = iframeTop + "px";
  }

  function initPlayer(iframe) {
    $( window ).resize(function() {
      resizeIframe(iframe);
    });
    resizeIframe(iframe);
    var player = new YT.Player(iframe, {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    window.plaa = player;
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.mute();
    event.target.playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  function onPlayerStateChange(event) {
    if(event.data == 0){
      //event.target.a.classList.remove("ready");
      event.target.a.classList.remove("ready");
    } else if(event.data == 1) {
      event.target.a.classList.add("ready");
    }
  }
})();
