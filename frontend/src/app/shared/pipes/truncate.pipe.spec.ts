import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('create', () => {
    expect(pipe).toBeTruthy();
  });

  it('null', () => {
    expect(pipe.transform(null, 5)).toBe('');
  });

  it('undefined', () => {
    expect(pipe.transform(undefined, 5)).toBe('');
  });

  it('empty', () => {
    expect(pipe.transform('', 5)).toBe('');
  });

  it('less then need', () => {
    expect(pipe.transform('Hello', 5)).toBe('Hello');
    expect(pipe.transform('Hi', 5)).toBe('Hi');
  });

  it('more then need', () => {
    expect(pipe.transform('Hello World', 5)).toBe('Hello…');
  });

  it('default', () => {
    const longText = 'a'.repeat(150);
    const result = pipe.transform(longText);
    expect(result.length).toBe(101);
    expect(result.endsWith('…')).toBeTrue();
  });
});
