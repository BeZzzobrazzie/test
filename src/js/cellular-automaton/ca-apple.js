import { CAEntity } from "./ca-entity";


export class CAApple extends CAEntity {
  constructor(step, cWidth, cHeight, ctx, main, color) {
    super(step, cWidth, cHeight, ctx, main, color);
    this.type = 'apples';
    this.create(color);
  }

}