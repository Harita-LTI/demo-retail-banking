import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
// @ts-expect-error
global.TextDecoder = TextDecoder;

HTMLCanvasElement.prototype.getContext = jest.fn();
