import { add } from './add';

 // 测试add函数
describe("add函数", () => {

    // 负数相加
    test("两个负整数相加", () => {
      expect(add(-1, -2)).toBe(-3);
      expect(add(-10, -20)).toBe(-30);
      expect(add(-100, -200)).toBe(-300);
    });

    // 正数加负数
    test("正数与负数相加", () => {
      expect(add(5, -3)).toBe(2);
      expect(add(-5, 3)).toBe(-2);
      expect(add(10, -10)).toBe(0);
    });

    // 浮点数相加
    test("浮点数相加", () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
      expect(add(1.5, 2.5)).toBeCloseTo(4.0);
      expect(add(-1.1, 2.2)).toBeCloseTo(1.1);
    });

    // 大数相加
    test("大数相加", () => {
      expect(add(1_000_000, 2_000_000)).toBe(3_000_000);
      expect(add(Number.MAX_SAFE_INTEGER, 0)).toBe(Number.MAX_SAFE_INTEGER);
      expect(add(999_999_999, 1)).toBe(1_000_000_000);
    });

    // 边界值
    test("与零相加", () => {
      expect(add(0, 0)).toBe(0);
      expect(add(5, 0)).toBe(5);
      expect(add(0, -5)).toBe(-5);
    });
  });
