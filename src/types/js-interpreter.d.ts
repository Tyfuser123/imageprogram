declare module 'js-interpreter' {
  export default class Interpreter {
    constructor(code: string, initFunc?: (interpreter: Interpreter, globalObject: Interpreter.Object) => void);
    step(): boolean;
    setProperty(obj: Interpreter.Object, name: string, value: unknown): void;
    getProperty(obj: Interpreter.Object, name: string): unknown;
    createNativeFunction(fn: (...args: unknown[]) => unknown): Interpreter.Object;
    createObject(proto?: Interpreter.Object): Interpreter.Object;
    createPrimitive(value: string | number | boolean): Interpreter.Object;
    static readonly OBJECT: number;
  }

  namespace Interpreter {
    interface Object {
      [key: string]: unknown;
    }
  }
}
