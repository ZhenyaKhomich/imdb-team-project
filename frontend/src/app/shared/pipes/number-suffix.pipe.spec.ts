import { NumberSuffixPipe } from './number-suffix.pipe';

describe('NumberSuffixPipe', () => {
  let pipe: NumberSuffixPipe;

  beforeEach(() => {
    pipe = new NumberSuffixPipe();
  });

  it('create', () => {
    expect(pipe).toBeTruthy();
  });

  it('call with null', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('call with undefined', () => {
    expect(pipe.transform(undefined)).toBe('');
  });

  it('return origin str', () => {
    expect(pipe.transform(0)).toBe('0');
    expect(pipe.transform(1)).toBe('1');
    expect(pipe.transform(999)).toBe('999');
  });

  it('format K', () => {
    expect(pipe.transform(1000)).toBe('1K');
    expect(pipe.transform(1500)).toBe('1.5K');
    expect(pipe.transform(999999)).toBe('1000K');
  });

  it('format M', () => {
    expect(pipe.transform(1000000)).toBe('1M');
    expect(pipe.transform(1500000)).toBe('1.5M');
    expect(pipe.transform(999999999)).toBe('1000M');
  });

  it('float', () => {
    expect(pipe.transform(1500, 0)).toBe('2K');
    expect(pipe.transform(1500, 1)).toBe('1.5K');
    expect(pipe.transform(1500, 2)).toBe('1.50K');
    expect(pipe.transform(1500, 3)).toBe('1.500K');
  });

  it('rounding', () => {
    expect(pipe.transform(1499)).toBe('1.5K');
    expect(pipe.transform(1500)).toBe('1.5K');
    expect(pipe.transform(1501)).toBe('1.5K');
    expect(pipe.transform(1550)).toBe('1.6K');
  });
});
