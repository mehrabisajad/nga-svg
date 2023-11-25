import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { SvgService } from './svg.service';

@Directive({
  selector: '[ngaSvg]',
})
export class SvgDirective implements OnChanges {
  @Input() ngaSvg?: string;
  @Input() svgName?: string;

  constructor(
    protected svgService: SvgService,
    protected _elementRef: ElementRef,
    protected _renderer: Renderer2,
  ) {}

  ngOnChanges(): void {
    this.changeSvg();
  }

  /**
   * Render a new svg in the current element. Remove the svg when `type` is falsy.
   */
  protected changeSvg(): void {
    if (!this.ngaSvg && !this.svgName) {
      this._clearSVGElement();
    } else if (this.svgName) {
      this._setSVGElement(this.svgService.loadSVGFromCacheOrCreateNew(this.svgName, this.ngaSvg));
    } else {
      this._setSVGElement(this.svgService.createSVGElementFromString(this.ngaSvg));
    }
  }

  protected _setSVGElement(svg: SVGElement): void {
    this._clearSVGElement();
    this._renderer.appendChild(this._elementRef.nativeElement, svg);
  }

  protected _clearSVGElement(): void {
    const el: HTMLElement = this._elementRef.nativeElement;
    const children = el.childNodes;
    const length = children.length;
    for (let i = length - 1; i >= 0; i--) {
      const child = children[i] as any;
      if (child.tagName?.toLowerCase() === 'svg') {
        this._renderer.removeChild(el, child);
      }
    }
  }
}
