import * as d3 from 'd3';
import * as nv from 'nvd3';
import {
  Component,
  OnChanges,
  DoCheck,
  ElementRef,
  Input,
  IterableDiffers,
  IterableDiffer,
  AfterViewInit,
  ViewChild
} from '@angular/core';

import {calculateDistributionData} from '../util';

@Component({
  selector: 'nvd3-chart',
  template: `<svg width="350" height="350" class="with-3d-shadow with-transitions" #svg></svg>`
})
export class Nvd3ChartComponent implements AfterViewInit {

  private d3selection: any;

  private differ: IterableDiffer;

  private chart;

  @Input() positions: any[];
  @ViewChild('svg') svgRef: ElementRef;

  constructor(private differs: IterableDiffers) {}

  ngAfterViewInit() {
    const data = calculateDistributionData(this.positions);

    nv.addGraph(() => {
      this.chart = nv.models.pieChart()
        .x((d) => d.label)
        .y((d) => d.value)
        .showLabels(true);

      this.d3selection = d3.select(this.svgRef.nativeElement);
      this.updateChart(data, this.d3selection, this.chart);
    });
  }

  ngOnChanges() {
    this.differ = this.differs.find(this.positions).create();
  }

  ngDoCheck() {
    const changes = this.differ.diff(this.positions);

    if (changes && this.d3selection) {
      const data = calculateDistributionData(this.positions);
      this.updateChart(data, this.d3selection, this.chart);
    }
  }

  updateChart(data, d3selection, chart) {
    d3selection
      .datum(data)
      .transition().duration(350)
      .call(chart);
  }
}

