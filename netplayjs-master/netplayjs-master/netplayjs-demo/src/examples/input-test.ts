import {
    NetplayPlayer,
    DefaultInput,
    Game,
    RollbackWrapper,
    Vec2,
    LockstepWrapper,
    LocalWrapper,
  } from "netplayjs/src/index";
  
  export class InputTestGame extends Game {
    static timestep = 1000 / 5;
    static canvasSize = { width: 600, height: 600 };
    static deterministic = true;
    static preventContextMenu = true;
    static highDPI = true;
    
    inputs: Map<NetplayPlayer, DefaultInput> = new Map();
  
    tick(playerInputs: Map<NetplayPlayer, DefaultInput>): void {
      for (const [player, input] of playerInputs.entries()) {
        this.inputs.set(player, input);
      }
    }
  
    draw(canvas: HTMLCanvasElement) {
      // Fill in a black background.
      const ctx = canvas.getContext("2d")!;

      ctx.resetTransform();
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // Draw squares for the characters.
      Array.from(this.inputs.values()).forEach((input, i) => {
        ctx.fillStyle = "white";
        ctx.font = "10px Arial";
        const text = JSON.stringify(input, null, 2);
        const lines = text.split("\n");
        for (let j = 0; j < lines.length; j++) {
          ctx.fillText(
            lines[j],
            10 + i * 300,
            20 + j * 10,
          );
        }
      });
    }
  }
  
  new LocalWrapper(InputTestGame).start();
  