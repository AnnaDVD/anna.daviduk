import { AfterViewInit, Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import Typed from 'typed.js';
import { ContactusComponent } from "../contact/contact.component";
import { SkillsComponent } from "../skills/skills.component";
import { ProjectsComponent } from "../projects/projects.component";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContactusComponent, SkillsComponent, ProjectsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  activeSection: string = 'home';
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
    // Update active section based on scroll position
    const sections = document.querySelectorAll('section');
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');

      // Determine if the section is in the viewport
      if (sectionTop <= window.innerHeight / 2 && sectionTop + sectionHeight > window.innerHeight / 2) {
        currentSection = sectionId || '';
      }
    });

    this.activeSection = currentSection;
   }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    const options = {
      strings: ["Front-end developer", "Webmaster", "Designer", "Dreamer"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true
    };

    const typed = new Typed('.multiple-text', options);
  }
  }

  scrollToSection(sectionId: string): void {
    if (isPlatformBrowser(this.platformId)) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
    this.animateSkills();
    }
  }

  animateSkills() {
    if (isPlatformBrowser(this.platformId)) {
    const progressBars = document.querySelectorAll('.progress-bar');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target as HTMLElement;
          const width = progressBar.getAttribute('style')?.match(/width: (\d+)%/);
          if (width) {
            progressBar.style.width = width[1] + '%';
            progressBar.style.transition = 'width 2s ease-in-out';
          }
        }
      });
    });

    progressBars.forEach(bar => {
      observer.observe(bar);
    });
  }
}
}

