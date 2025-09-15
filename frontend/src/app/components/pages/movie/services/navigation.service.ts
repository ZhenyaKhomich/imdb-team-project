import { Injectable, signal } from '@angular/core';

export interface Section {
  id: string;
  title: string;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class NavigationService {
  public readonly _sections = signal<Section[]>([]);
  public readonly _activeSectionId = signal<string>('');
  public sectionElements = new Map<string, HTMLElement>();

  public readonly sections = this._sections.asReadonly();
  public readonly activeSectionId = this._activeSectionId.asReadonly();

  public registerSection(
    id: string,
    title: string,
    element: HTMLElement
  ): void {
    this.sectionElements.set(id, element);
    this._sections.update((sections) => {
      if (!sections.find((s) => s.id === id)) {
        return [...sections, { id, title, active: false }];
      }
      return sections;
    });
  }

  public setActiveSection(id: string): void {
    this._activeSectionId.set(id);
    this._sections.update((sections) =>
      sections.map((s) => ({ ...s, active: s.id === id }))
    );
  }

  public unregisterSection(id: string): void {
    this.sectionElements.delete(id);
    this._sections.update((sections) => sections.filter((s) => s.id !== id));
  }

  public scrollToSection(sectionId: string): void {
    const element = this.sectionElements.get(sectionId);
    if (element) {
      const yOffset = -64;
      const yPosition =
        element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({
        top: yPosition,
        behavior: 'smooth',
      });

      this.setActiveSection(sectionId);
    }
  }

  public initScrollTracking(): void {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const handleScroll = (): void => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        this.updateActiveSectionOnScroll();
        ticking = false;
      });
    };

    this.setActiveSection('section1');

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  private updateActiveSectionOnScroll(): void {
    const sections = this._sections();
    if (sections.length === 0) return;

    let closestSection: { id: string; distance: number } | null = null;

    for (const section of sections) {
      const element = this.sectionElements.get(section.id);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const distanceFromTop = Math.abs(rect.top);

      if (!closestSection || distanceFromTop < closestSection.distance) {
        closestSection = { id: section.id, distance: distanceFromTop };
      }
    }

    if (closestSection && closestSection.id !== this._activeSectionId()) {
      this.setActiveSection(closestSection.id);
    }
  }
}
