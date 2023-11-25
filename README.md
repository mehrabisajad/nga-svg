# ngaSvg

ngaSvg is an Angular library that provides a directive to show svg content.

[![npm version](https://badge.fury.io/js/nga-svg.svg)](http://badge.fury.io/js/nga-svg)
[![GitHub issues](https://img.shields.io/github/issues/mehrabisajad/nga-svg.svg)](https://github.com/mehrabisajad/nga-svg/issues)
[![GitHub stars](https://img.shields.io/github/stars/mehrabisajad/nga-svg.svg)](https://github.com/mehrabisajad/nga-svg/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mehrabisajad/nga-svg/master/LICENSE)

## Installation

To install ngaSvg, run the following command in your terminal:

```
npm install nga-svg --save
```

## Usage

```html
<div [ngaSvg]="svgString"></div>
```

```typescript
export class MyComponent {
  // ...
  svgString: '<svg> .... </svg>';
  // ...
}
```

or use catch:

```typescript
import { SvgService } from 'nga-svg';

export class MyComponent {
  svgService = inject(SvgService);

  // ...
  ngOnInit(): void {
    this.svgService.addSVG('name', '<svg> .... </svg>');
  }
  // ...
}
```

```html
<div ngaSvg svgName="name"></div>
```

or use input and catch

```html
<div [ngaSvg]="svgString" svgName="test"></div>
```

```typescript
export class MyComponent {
  // ...
  svgString: '<svg> .... </svg>';
  // ...
}
```

## Contributing

We welcome contributions to ngaSvg. Please feel free to create an issue or pull request on GitHub.

## License

ngaSvg is licensed under the MIT License.
