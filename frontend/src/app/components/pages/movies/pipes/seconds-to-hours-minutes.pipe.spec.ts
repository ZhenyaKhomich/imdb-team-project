import { SecondsToHoursMinutesPipe } from './seconds-to-hours-minutes.pipe';

describe('SecondsToHoursMinutesPipe', () => {
  let pipe: SecondsToHoursMinutesPipe;

  beforeEach(() => {
    pipe = new SecondsToHoursMinutesPipe();
  });

  it('create', () => {
    expect(pipe).toBeTruthy();
  });

  it('null', () => {
    expect(pipe.transform(null)).toBe('0m');
  });

  it('undefined', () => {
    expect(pipe.transform(undefined)).toBe('0m');
  });

  it('negative', () => {
    expect(pipe.transform(-1)).toBe('0m');
    expect(pipe.transform(-100)).toBe('0m');
  });

  it('0', () => {
    expect(pipe.transform(0)).toBe('0m');
  });

  it('format minutes', () => {
    expect(pipe.transform(60)).toBe('1m');
    expect(pipe.transform(3599)).toBe('59m');
    expect(pipe.transform(120)).toBe('2m');
  });

  it('format hours', () => {
    expect(pipe.transform(3600)).toBe('1h');
    expect(pipe.transform(7200)).toBe('2h');
    expect(pipe.transform(10800)).toBe('3h');
    expect(pipe.transform(36000)).toBe('10h');
  });

  it('format hours and minutes', () => {
    expect(pipe.transform(3660)).toBe('1h 1m');
    expect(pipe.transform(7320)).toBe('2h 2m');
    expect(pipe.transform(3750)).toBe('1h 2m');
    expect(pipe.transform(7260)).toBe('2h 1m');
    expect(pipe.transform(36660)).toBe('10h 11m');
  });
});
