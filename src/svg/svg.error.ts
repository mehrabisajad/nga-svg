export const AVANNG_SVG_ANGULAR_CONSOLE_PREFIX = '[avanng/svg]:';

export function SVGTagNotFoundError(): Error {
  return new Error(`${AVANNG_SVG_ANGULAR_CONSOLE_PREFIX}<svg> tag not found.`);
}
