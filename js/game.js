AFRAME.registerComponent("game-play", {

  init: function () {
    var duration = 49;
    var timerEl = document.querySelector("#timer");
    this.startTimer(duration, timerEl);
    this.diffuseBomb();
    setInterval(this.shootEnemyBullet, 5000)
  },

  startTimer: function (duration, timerEl) {
    var minutes;
    var seconds;

    setInterval(()=> {
      if (duration >=0) {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);

        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        timerEl.setAttribute("text", {
          value: minutes + ":" + seconds,
        });

        duration -= 1;

        var entity = document.querySelector("#bombInitiated");
        entity.components.sound.playSound();
      } 
      else {
        this.gameOver();        
      }
    },1000)
  },

  shootEnemyBullet: function () {

    //get all enemies using className
    var els = document.querySelectorAll(".enemy");

    for (var i = 0; i < els.length; i++) {  

      //enemyBullet entity
      var enemyBullet = document.createElement("a-entity");

      enemyBullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
      });

      enemyBullet.setAttribute("material", "color", "#282B29");

      var position = els[i].getAttribute("position")

      enemyBullet.setAttribute("position", {
          x: position.x,
          y: position.y,
          z: position.z,
      });

      var scene = document.querySelector("#scene");
      scene.appendChild(enemyBullet);


      var position1 = new THREE.Vector3();
      var position2 = new THREE.Vector3();

      //shooting direction
      var enemy = els[i].object3D;
      var player = document.querySelector("#camera").object3D;

      player.getWorldPosition(position1);
      enemy.getWorldPosition(position2);

      
      var direction = new THREE.Vector3();

      direction.subVectors(position1, position2).normalize();

      enemyBullet.setAttribute("velocity", direction.multiplyScalar(10));

      enemyBullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "0",
      });


      var element = document.querySelector("#countLife");
      var playerLife = element.getAttribute("text").value;

      
      enemyBullet.addEventListener("collide", function (e) {

        if (e.detail.body.el.id === "camera") {

          if (playerLife > 0) {
            playerLife -= 25;
            
            element.setAttribute("text", {

              value: playerLife
            });
            var damageSound = document.querySelector("#damage");
            damageSound.components.sound.playSound();
          }
          if (playerLife <= 0) {

            //show text
            var overText = document.querySelector("#game_over_text");
            overText.setAttribute("visible", true);

            var victoryText = document.querySelector("#game_victory_text");
            victoryText.setAttribute("text",{
                value:" "
            });

            var movement = document.querySelector("#camera-rig");
            movement.setAttribute("movement-controls",{
              speed:"0"
            });
              
            var fadeBackground = document.querySelector("#fadeBackground");
            fadeBackground.setAttribute("visible",true);
            
            var shootSound = document.querySelector("#shoot");
            shootSound.setAttribute("sound",{
              volume:0
            });

            var footstepSound = document.querySelector("#footStep");
            footstepSound.setAttribute("sound",{
              volume:0
            });

            var shootSound = document.querySelector("#shoot");
            shootSound.setAttribute("sound",{
              volume:0
            });
            
            //remove enemy                        
            var enemyEl = document.querySelectorAll(".enemy")

            for (var i = 0; i < enemyEl.length; i++) {
                scene.removeChild(enemyEl[i])

            }
          }

      }
    });

  }
},
  shootSound: function () {
    var entity = document.querySelector("#shoot");
    entity.components.sound.playSound();
  },
  damageSound: function(){
    var entity = document.querySelector("#damage");
    entity.components.sound.playSound();
  },


  gameOver: function () {
    var overText = document.querySelector("#game_over_text");
    overText.setAttribute("visible", true);

    var victoryText = document.querySelector("#game_victory_text");
    victoryText.setAttribute("text",{
        value:" "
    });

    var movement = document.querySelector("#camera-rig");
    movement.setAttribute("movement-controls",{
      speed:"0"
    });
      
    var fadeBackground = document.querySelector("#fadeBackground");
    fadeBackground.setAttribute("visible",true);
    
    var shootSound = document.querySelector("#shoot");
    shootSound.setAttribute("sound",{
      volume:0
    });

    var footstepSound = document.querySelector("#footStep");
    footstepSound.setAttribute("sound",{
      volume:0
    });
  },

  


  diffuseBomb: function(){
      var cam = document.querySelector("#camera-rig");
      pos = cam.getAttribute("position");


      window.addEventListener("keydown",(e)=>{

          if (e.key === 'e' && pos.x <=-29.6  ){  //&& pos.x <=-29.6
            
            var bombDefusedSound = document.querySelector("#bombDefused");
            bombDefusedSound.components.sound.playSound();

            setTimeout(function(){

              var victoryText = document.querySelector("#game_victory_text");
              victoryText.setAttribute("visible", true);

              var stopTimer = document.querySelector("#timer");
              stopTimer.setAttribute("visible",false)
              
              var overText = document.querySelector("#game_over_text");
              overText.setAttribute("text",{
                  value:" "
              });

              var movement = document.querySelector("#camera-rig");
              movement.setAttribute("movement-controls",{
                speed:"0"
              });
              
              var gun = document.querySelector("#weapon");
              gun.setAttribute("visible",false);

              var fadeBackground = document.querySelector("#fadeBackground");
              fadeBackground.setAttribute("visible",true);

              var bombInitiatedSound = document.querySelector("#bombInitiated");
              bombInitiatedSound.setAttribute("sound",{
                volume:0
              });

              var shootSound = document.querySelector("#shoot");
              shootSound.setAttribute("sound",{
                volume:0
              });

              var footstepSound = document.querySelector("#footStep");
              footstepSound.setAttribute("sound",{
                volume:0
              });
            }, 3000); 
          };
      });
  },


    
    
  });