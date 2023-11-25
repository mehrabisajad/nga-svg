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
    const parser = new DOMParser();
    const doc = parser.parseFromString(str ?? '', 'image/svg+xml');
    const svg: SVGSVGElement | null = doc.querySelector('svg');
    if (!svg) {
      throw SVGTagNotFoundError;
    }

    const allowedTags = this.getAllowedTags();
    const elementsToRemove = [];
    const elementsByTagName = svg.getElementsByTagName('*');
    for (let i = 0; i < elementsByTagName.length; i++) {
      const element = elementsByTagName.item(i);
      if (element) {
        if (!allowedTags.includes(element.tagName)) {
          elementsToRemove.push(element);
        }
      }
    }

    for (const elementToRemove of elementsToRemove) {
      elementToRemove.parentNode?.removeChild(elementToRemove);
    }

    return svg;
  }

  getAllowedTags(): string[] {
    return [
      'svg',
      'a',
      'circle',
      'clipPath',
      'defs',
      'desc',
      'ellipse',
      'feBlend',
      'feColorMatrix',
      'feComponentTransfer',
      'feComposite',
      'feConvolveMatrix',
      'feDiffuseLighting',
      'feDisplacementMap',
      'feDistantLight',
      'feFlood',
      'feGaussianBlur',
      'feImage',
      'feMerge',
      'feMergeNode',
      'feMorphology',
      'feOffset',
      'fePointLight',
      'feSpecularLighting',
      'feSpotLight',
      'feTile',
      'filter',
      'foreignObject',
      'g',
      'image',
      'line',
      'marker',
      'mask',
      'metadata',
      'path',
      'pattern',
      'polygon',
      'polyline',
      'rect',
      'stop',
      'style',
      'switch',
      'symbol',
      'text',
      'title',
      'tspan',
      'view',
    ];
  }
}
