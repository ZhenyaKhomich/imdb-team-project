import { ChangeUrlPicturePipe } from './change-url-picture.pipe';

describe('ChangeUrlPicturePipe', () => {
  let pipe: ChangeUrlPicturePipe;

  beforeEach(() => {
    pipe = new ChangeUrlPicturePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('should handle empty values', () => {
    it('should return empty string for undefined', () => {
      expect(pipe.transform(undefined)).toBe('');
    });

    it('should return empty string for empty string', () => {
      expect(pipe.transform('')).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(pipe.transform(undefined)).toBe('');
    });
  });

  describe('should not modify non-jpg URLs', () => {
    it('should return original URL for PNG', () => {
      const url = 'https://example.com/image.png';
      expect(pipe.transform(url)).toBe(url);
    });

    it('should return original URL for JPEG', () => {
      const url = 'https://example.com/image.jpeg';
      expect(pipe.transform(url)).toBe(url);
    });

    it('should return original URL for GIF', () => {
      const url = 'https://example.com/image.gif';
      expect(pipe.transform(url)).toBe(url);
    });

    it('should return original URL for WebP', () => {
      const url = 'https://example.com/image.webp';
      expect(pipe.transform(url)).toBe(url);
    });

    it('should return original URL for URL without extension', () => {
      const url = 'https://example.com/image';
      expect(pipe.transform(url)).toBe(url);
    });

    it('should return original URL for URL with query parameters', () => {
      const url = 'https://example.com/image.png?width=100&height=100';
      expect(pipe.transform(url)).toBe(url);
    });
  });

  describe('should modify JPG URLs correctly', () => {
    it('should add quality parameters to simple JPG URL', () => {
      const input = 'https://example.com/image.jpg';
      const expected = 'https://example.com/imageQL75_UX100_CR0,1,100,125_.jpg';
      expect(pipe.transform(input)).toBe(expected);
    });

    it('should add quality parameters to JPG with path', () => {
      const input = 'https://example.com/path/to/image.jpg';
      const expected = 'https://example.com/path/to/imageQL75_UX100_CR0,1,100,125_.jpg';
      expect(pipe.transform(input)).toBe(expected);
    });

    it('should add quality parameters to JPG with subdomain', () => {
      const input = 'https://cdn.example.com/image.jpg';
      const expected = 'https://cdn.example.com/imageQL75_UX100_CR0,1,100,125_.jpg';
      expect(pipe.transform(input)).toBe(expected);
    });
  });

  describe('should handle edge cases with JPG URLs', () => {
    it('should handle URL ending with .jpg but containing jpg elsewhere', () => {
      const input = 'https://example.com/jpgimage.jpg';
      const expected = 'https://example.com/jpgimageQL75_UX100_CR0,1,100,125_.jpg';
      expect(pipe.transform(input)).toBe(expected);
    });

    it('should handle URL with multiple dots', () => {
      const input = 'https://example.com/image.version2.jpg';
      const expected = 'https://example.com/image.version2QL75_UX100_CR0,1,100,125_.jpg';
      expect(pipe.transform(input)).toBe(expected);
    });

    it('should handle URL with ports', () => {
      const input = 'https://example.com:8080/image.jpg';
      const expected = 'https://example.com:8080/imageQL75_UX100_CR0,1,100,125_.jpg';
      expect(pipe.transform(input)).toBe(expected);
    });

    it('should handle URL with authentication', () => {
      const input = 'https://user:pass@example.com/image.jpg';
      const expected = 'https://user:pass@example.com/imageQL75_UX100_CR0,1,100,125_.jpg';
      expect(pipe.transform(input)).toBe(expected);
    });
  });

  describe('should handle complex URL structures', () => {
    it('should not modify URL with .jpg in query parameters', () => {
      const input = 'https://example.com/image.png?format=jpg';
      expect(pipe.transform(input)).toBe(input);
    });

    it('should not modify URL with .jpg in path but different extension', () => {
      const input = 'https://example.com/jpg/image.png';
      expect(pipe.transform(input)).toBe(input);
    });

    it('should handle URL with .jpg as part of filename', () => {
      const input = 'https://example.com/my.jpg.file.jpg';
      const expected = 'https://example.com/my.jpg.fileQL75_UX100_CR0,1,100,125_.jpg';
      expect(pipe.transform(input)).toBe(expected);
    });
  });

  describe('performance and special characters', () => {
    it('should handle very long URLs', () => {
      const longPath = 'a'.repeat(100);
      const input = `https://example.com/${longPath}/image.jpg`;
      const expected = `https://example.com/${longPath}/imageQL75_UX100_CR0,1,100,125_.jpg`;
      expect(pipe.transform(input)).toBe(expected);
    });

    it('should handle URLs with special characters', () => {
      const input = 'https://example.com/imäge.jpg';
      const expected = 'https://example.com/imägeQL75_UX100_CR0,1,100,125_.jpg';
      expect(pipe.transform(input)).toBe(expected);
    });

    it('should handle URLs with encoded characters', () => {
      const input = 'https://example.com/image%20name.jpg';
      const expected = 'https://example.com/image%20nameQL75_UX100_CR0,1,100,125_.jpg';
      expect(pipe.transform(input)).toBe(expected);
    });
  });
});
