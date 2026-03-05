/**
 * JS-Interpreter 适配器 - 沙箱执行 Blockly 生成的 JavaScript
 */
import Interpreter from 'js-interpreter';

export type OutputCallback = (text: string) => void;

export interface InitApiOptions {
  onOutput: OutputCallback;
  onHighlight?: (blockId: string) => void;
  infiniteLoopLimit?: number;
}

export function createInterpreter(
  code: string,
  options: InitApiOptions
): Interpreter {
  const limit = options.infiniteLoopLimit ?? 100000;
  let stepCount = 0;

  const initFunc = (interpreter: Interpreter, globalObject: Interpreter.Object) => {
    // 无限循环保护
    const checkInfiniteLoop = () => {
      if (++stepCount > limit) {
        throw new Error('执行步数超限，可能存在无限循环');
      }
    };
    interpreter.setProperty(
      globalObject,
      'checkInfiniteLoop',
      interpreter.createNativeFunction(checkInfiniteLoop)
    );
    // 重定向 console.log 到输出面板
    const wrapperLog = (...args: unknown[]) => {
      const text = args.map((a) => String(a)).join(' ');
      options.onOutput(text + '\n');
    };
    interpreter.setProperty(
      globalObject,
      'console',
      interpreter.createObject(interpreter.OBJECT)
    );
    const consoleObj = interpreter.getProperty(globalObject, 'console') as Interpreter.Object;
    interpreter.setProperty(
      consoleObj,
      'log',
      interpreter.createNativeFunction(wrapperLog)
    );

    // alert -> 输出
    const wrapperAlert = (text: string) => {
      options.onOutput(String(text ?? '') + '\n');
    };
    interpreter.setProperty(
      globalObject,
      'alert',
      interpreter.createNativeFunction(wrapperAlert)
    );

    // prompt -> 简化版，返回空字符串（可后续扩展为弹窗）
    const wrapperPrompt = () => '';
    interpreter.setProperty(
      globalObject,
      'prompt',
      interpreter.createNativeFunction(wrapperPrompt)
    );

    if (options.onHighlight) {
      const wrapperHighlight = (id: string) => {
        options.onHighlight!(String(id || ''));
      };
      interpreter.setProperty(
        globalObject,
        'highlightBlock',
        interpreter.createNativeFunction(wrapperHighlight)
      );
    }
  };

  return new Interpreter(code, initFunc);
}
