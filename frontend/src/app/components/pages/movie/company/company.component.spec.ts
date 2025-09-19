import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { CompanyComponent } from './company.component';
import { UpperCasePipe } from '@angular/common';
import { By } from '@angular/platform-browser';
import type { CompanyCredit } from '../../../../shared/types/movies';

describe('CompanyComponent', () => {
  let fixture: ComponentFixture<CompanyComponent>;

  const mockData: CompanyCredit[] = [
    {
      company: { id: '1', name: 'Warner Bros' },
      countries: [{ name: 'USA' }],
      yearsInvolved: { startYear: 2000, endYear: 2020 },
      attributes: ['vod', 'theatrical'],
      category: 'production',
    },
    {
      company: { id: '2', name: 'Paramount Pictures' },
      countries: [{ name: 'UK' }],
      yearsInvolved: { startYear: 1995, endYear: 2010 },
      attributes: ['video'],
      category: 'distribution',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyComponent, UpperCasePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyComponent);
  });

  it('list companies', () => {
    fixture.componentRef.setInput('data', mockData);

    fixture.detectChanges();

    const companies = fixture.debugElement.queryAll(By.css('.company'));
    expect(companies.length).toBe(2);

    const firstTitle = companies[0].query(By.css('.title')).nativeElement
      .textContent;
    expect(firstTitle).toContain('Warner Bros');

    const firstCountry = companies[0].queryAll(By.css('.line span'))[1]
      .nativeElement.textContent;
    expect(firstCountry).toContain('USA');

    const firstYears = companies[0].queryAll(By.css('.line span'))[3]
      .nativeElement.textContent;
    expect(firstYears).toContain('2000');
    expect(firstYears).toContain('2020');
  });

  it('uppercase', () => {
    fixture.componentRef.setInput('data', [mockData[0]]);
    fixture.detectChanges();

    const attributes = fixture.debugElement.queryAll(By.css('.att .item'));
    expect(attributes.length).toBe(2);
    expect(attributes[0].nativeElement.textContent.trim()).toBe('VOD');
    expect(attributes[1].nativeElement.textContent.trim()).toBe('THEATRICAL');
  });
});
