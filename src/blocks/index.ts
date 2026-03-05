/**
 * 自定义积木块注册入口
 * 在 Blockly 工作区初始化前调用
 */
import 'blockly/blocks';
import 'blockly/javascript';

// 导入默认块后，可在此注册自定义块
// 当前使用 Blockly 内置块，后续可扩展
export function registerCustomBlocks(): void {
  // 示例：注册自定义块
  // Blockly.Blocks['custom_print'] = { ... };
  // Blockly.JavaScript['custom_print'] = function(block) { ... };
}
