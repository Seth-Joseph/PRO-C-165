AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
     

      if (e.key === "z" || e.key === "Z") {
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        bullet.setAttribute("material", "color", "black");
        bullet.setAttribute("dynamic-body",{
          shape:'sphere',
          mass:0
        });

        var cam = document.querySelector("#camera-rig");

        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: 2.5,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        bullet.setAttribute("velocity", direction.multiplyScalar(-50));

        var scene = document.querySelector("#scene");

        // Add Event listener to bullet
        bullet.addEventListener('collide',this.deleteBullet);
        scene.appendChild(bullet);

        //shooting sound
        this.shootSound();
      }
    });
  },
  deleteBullet: function(e){
    //this will give the details about the orginal entity on which trigger 
    console.log(e.detail.target.el)

     //this will give the details about the other entity on which bullet touched 
     console.log(e.detail.body.el)

     var element = e.detail.target.el;
     var elementHit = e.detail.body.el;

     
     if(elementHit.id.includes('enemy')){
      scene.removeChild(elementHit);
      //impulse
      
      scene.removeChild(element);
     }

     if(elementHit.id.includes('box')||
        elementHit.id.includes('vertWall')||
        elementHit.id.includes('horiWall')||
        elementHit.id.includes('ground')||
        elementHit.id.includes('coloumn')||
        elementHit.id.includes('plantPlatform')||
        elementHit.id.includes('plantStair')||
        elementHit.id.includes('plantMark')||
        elementHit.id.includes('plantBomb')){
      
      scene.removeChild(element);
     }

  },
  shootSound: function () {
    var entity = document.querySelector("#shoot");
    entity.components.sound.playSound();
  },
});