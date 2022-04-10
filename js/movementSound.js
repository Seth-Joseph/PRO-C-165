AFRAME.registerComponent("movement-sound", {
    init: function () {
      this.walk();
    },
    walk: function () {
      window.addEventListener("keydown", (e) => {
        if (
          e.key === "w" ||
          e.key === "d" ||
          e.key === "a" ||
          e.key === "s"
        ) {
          var entity = document.querySelector("#footStep");
          entity.components.sound.playSound();
        }
      });
    },
  });
  
  