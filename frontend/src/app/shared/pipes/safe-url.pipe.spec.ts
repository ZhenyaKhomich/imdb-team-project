import { TestBed } from '@angular/core/testing';
import type { SafeResourceUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrlPipe } from './safe-url.pipe';

describe('SafeUrlPipe', () => {
  let pipe: SafeUrlPipe;
  let sanitizerSpy: jasmine.SpyObj<DomSanitizer>;

  beforeEach(() => {
    sanitizerSpy = jasmine.createSpyObj<DomSanitizer>('DomSanitizer', [
      'bypassSecurityTrustResourceUrl',
    ]);

    TestBed.configureTestingModule({
      providers: [
        SafeUrlPipe,
        { provide: DomSanitizer, useValue: sanitizerSpy },
      ],
    });

    pipe = TestBed.inject(SafeUrlPipe);
  });

  it('call sanitizer', () => {
    const testUrl = 'https://example.com/video.mp4';
    const fakeSafeUrl: SafeResourceUrl = {
      changingThisBreaksApplicationSecurity: testUrl,
    } satisfies SafeResourceUrl;

    sanitizerSpy.bypassSecurityTrustResourceUrl.and.returnValue(fakeSafeUrl);

    const result = pipe.transform(testUrl);

    expect(sanitizerSpy.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
      testUrl
    );
    expect(result).toBe(fakeSafeUrl);
  });
});
