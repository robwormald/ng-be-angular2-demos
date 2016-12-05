import { Component } from '@angular/core';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

@Component({
  selector: 'app-root',
  template: `
    <div style="float: left;">
      <svg width="550" height="550"
        (mousedown)="mouseDown($event)"
        (mousemove)="mouseMove($event)"
        (mouseup)="mouseUp($event)"
        >
        <svg:g
          square-box
          *ngFor="let box of boxes; trackBy:trackByBoxId"
          [box]="box"
          [selected]="box.id == currentId"
          ></svg:g>
      </svg>
    </div>
    <div style="float: left;"><nvd3-chart [positions]="boxes"></nvd3-chart></div>
  `
})
export class AppComponent {

  currentId = null;
  boxes = [];
  offsetX;
  offsetY;


  ngOnInit() {
    for (let i=0; i < 10; i++) {
      const id = i;
      const x = getRandomInt(0, 500);
      const y = getRandomInt(0, 500);
      const box = { id, x, y };
      this.boxes.push(box);
    }
  }

  mouseDown(event) {
    const id = Number(event.target.getAttribute("dataId"));
    const box = this.boxes[id];
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    this.offsetX = box.x - mouseX;
    this.offsetY = box.y - mouseY;
    this.currentId = id;
  }

  trackByBoxId(index, box) {
    return box.id;
  }

  mouseMove(event) {
    if (this.currentId !== null) {
      this.updateBox(this.currentId, event.clientX + this.offsetX, event.clientY + this.offsetY);
    }
  }

  mouseUp($event) {
    this.currentId = null;
  }

  updateBox(id, x, y) {
    this.boxes[id] = { id, x, y };
  }
}
