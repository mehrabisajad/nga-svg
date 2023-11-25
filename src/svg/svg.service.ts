import { Inject, Injectable, Optional } from '@angular/core';
import { CachedSvgDefinition } from './types';
import { DOCUMENT } from '@angular/common';
import { SVGTagNotFoundError } from './svg.error';

@Injectable({ providedIn: 'root' })
export class SvgService {
  protected readonly _svgRenderedDefinitions = new Map<string, CachedSvgDefinition>();

  constructor(@Optional() @Inject(DOCUMENT) protected _document: any) {}

  public addSVG(key: string, svgContent: string): void {
    const cached = this._svgRenderedDefinitions.get(key);

    if (cached) {
      cached.svg = this.createSVGElementFromString(svgContent);
    } else {
      this.createAndCatch(key, svgContent);
    }
  }

  private createAndCatch(key: string, svgContent?: string): SVGElement {
    const svg = this.createSVGElementFromString(svgContent);
    // Cache it.
    this._svgRenderedDefinitions.set(key, {
      key,
      svg,
    } as CachedSvgDefinition);
    return svg;
  }

  loadSVGFromCacheOrCreateNew(key: string, svgContent?: string): SVGElement {
    let svg: SVGElement;
    const cached = this._svgRenderedDefinitions.get(key);
    svg = cached ? cached.svg : this.createAndCatch(key, svgContent);
    return this.cloneSVG(svg);
  }

  cloneSVG(svg: SVGElement): SVGElement {
    return svg.cloneNode(true) as SVGElement;
  }

  createSVGElementFromString(str?: string): SVGElement {
    const div = this._document.createElement('div');
    div.innerHTML = str;
    const svg: SVGElement | undefined = div.querySelector('svg');
    if (!svg) {
      throw SVGTagNotFoundError;
    }
    return svg;
  }
}
