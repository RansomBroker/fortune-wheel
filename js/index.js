/** @format */
let spinSound = document.getElementById("wheel");
let applause = document.getElementById("applause");

let theWheel = new Winwheel({
  numSegments: 0,
  drawText: true,
  drawMode: "segmentImage",
  fillStyle: "white",
  textFontSize: 24,
  textFontWeight: "Bold",
  textFillStyle: "white",
  textAlignment: "inner",
  // textOrientation: "curved",
  textMargin: 56,
  outerRadius: 142,
  centerX: 177,
  centerY: 175, // Set outer radius as number.
  pointerAngle: 90,
  segments: [{ fillStyle: "", text: "" }],
  // Note animation properties passed in constructor parameters.
  animation: {
    type: "spinToStop", // Type of animation.
    duration: 5, // How long the animation is to take in seconds.
    spins: 8, // The number of complete 360 degree rotations the wheel is to do.
    callbackFinished: "alertPrized()",
  },
});

function alertPrized() {
  let winningSegment = theWheel.getIndicatedSegment();
  applause.play();
  Swal.fire({
    text: "Selamat kamu memenangkan " + winningSegment.text + "!",
    allowOutsideClick: false,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      theWheel.stopAnimation(false);
      theWheel.rotationAngle = 0;
      theWheel.draw();
    }
  });
}

async function startSpin() {
  let spinRequest = await fetch("./backend/spin-prize.php", { method: "GET" });
  let spinResponse = await spinRequest.json();

  if (spinResponse.hasOwnProperty("resp")) {
    if (spinResponse.resp == 0) {
      Swal.fire({
        text: "Silahkan check data",
      });
    }
  } else {
    let stopAt = theWheel.getRandomForSegment(spinResponse[4]);
    theWheel.animation.stopAngle = stopAt;
    spinSound.play();
    theWheel.startAnimation();
  }
}

async function initialData() {
  let bgElement = $("#bg-container");
  let bgRequest = await fetch("./backend/get-settings.php", { method: "GET" });
  let [bgResponse] = await bgRequest.json();

  if (bgResponse.length > 0) {
    // bg
    if (bgResponse[1] != null) {
      bgElement.css(
        "background-image",
        'url("./img/assets/' + bgResponse[1] + '")'
      );
    } else {
      bgElement.css(
        "background-image",
        'url("./img/assets/background-default.png")'
      );
    }
    // logo
    if (bgResponse[2] != null) {
      $("#logo-img").attr("src", "./img/assets/" + bgResponse[2]);
    } else {
      $("#logo-img").attr("src", "./img/assets/logo-default.png");
    }
    // header
    if (bgResponse[3] != null) {
      $("#header-img").attr("src", "./img/assets/" + bgResponse[3]);
    } else {
      $("#header-img").attr("src", "./img/assets/header-default.img");
    }
    // body
    if (bgResponse[4] != null) {
      $("#body-img").attr("src", "./img/assets/" + bgResponse[4]);
    } else {
      $("#body-img").attr("src", "./img/assets/body-default.png");
    }
    // footer
    if (bgResponse[5] != null) {
      $("#footer-img").attr("src", "./img/assets/" + bgResponse[5]);
    } else {
      $("#footer-img").attr("src", "./img/assets/footer-default.png");
    }
  } else {
    bgElement.css(
      "background-image",
      'url("./img/assets/background-default.png")'
    );
  }

  let initialResponse = await fetch("./backend/get.php", { method: "GET" });
  let initialData = await initialResponse.json();

  console.log(initialData);
  if (initialData.length > 0) {
    initialData.forEach(function (value, num) {
      let image = new Image(24);
      image.src = "./img/" + value[3];
      image.onload = function () {
        theWheel.addSegment({
          image: "./img/" + value[3],
          fillStyle: num % 2 == 0 ? "#f42d92" : "#5dc1d8",
          text: value[2],
          imgData: image,
          imageDirection: "S",
          strokeStyle: "black",
        });
        theWheel.draw();
      };
    });
  }
}

window.onload = function () {
  $("#spin").click(function () {
    startSpin();
  });
  function openfullscreen() {
    let elem = document.documentElement;
    console.log(open);
    // Trigger fullscreen
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  function closefullscreen() {
    let elem = document.documentElement;
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }

  var settngState = false;
  $(".btn-setting").click(function () {
    settngState = !settngState;
    if (settngState) {
      $(".setting-list").removeClass("d-none");
      $(".menu").addClass("d-none");
    } else {
      $(".setting-list").addClass("d-none");
      $(".menu").removeClass("d-none");
    }
  });

  var toggleBtn = false;
  $(".btn-full").on("click", function () {
    toggleBtn = !toggleBtn;
    if (toggleBtn) {
      openfullscreen();
    } else {
      closefullscreen();
    }

    console.log("click");
  });
  initialData();
  console.log("successfull load");
  if (window.innerWidth >= 1000) {
    theWheel.textFontSize = 16;
    theWheel.outerRadius = 250;
    theWheel.centerX = 300;
    theWheel.centerY = 300;
  } else if (window.innerWidth >= 800) {
    theWheel.textFontSize = 16;
    theWheel.outerRadius = 200;
    theWheel.centerX = 250;
    theWheel.centerY = 250;
  } else if (window.innerWidth >= 460) {
    theWheel.textFontSize = 16;
    theWheel.outerRadius = 250;
    theWheel.centerX = 300;
    theWheel.centerY = 300;
  } else if (window.innerWidth >= 320) {
    theWheel.outerRadius = 250;
    theWheel.centerX = 300;
    theWheel.centerY = 300;
  } else if (window.innerWidth <= 320) {
    theWheel.outerRadius = 250;
    theWheel.centerX = 300;
    theWheel.centerY = 300;
  }
};
