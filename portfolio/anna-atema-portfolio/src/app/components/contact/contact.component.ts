import { Component, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';

interface ContactFormControls {
  from_name: FormControl<string>;
  from_email: FormControl<string>;
  message: FormControl<string>;
  from_telephone: FormControl<string>;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactusComponent implements AfterViewInit {
  @ViewChild('buttonElement') buttonElement!: ElementRef;
  form: FormGroup<ContactFormControls>;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      from_name: ['', Validators.required],
      from_email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      from_telephone: ['']
    }) as FormGroup<ContactFormControls>;
  }

  ngOnInit(): void {
    // Optional: Initialize EmailJS here if needed
  }

  ngAfterViewInit() {
    const button = this.buttonElement.nativeElement;
    button.addEventListener('mousemove', this.onButtonMouseMove.bind(this));
    button.addEventListener('mouseleave', this.onButtonMouseLeave.bind(this));
  }

  onButtonMouseMove(evt: MouseEvent): void {
    const button = evt.currentTarget as HTMLElement;
    const movX = evt.clientX - button.getBoundingClientRect().x;
    // Add any visual feedback based on movX if needed
  }

  onButtonMouseLeave(evt: MouseEvent): void {
    const button = evt.currentTarget as HTMLElement;
    const movX = evt.clientX - button.getBoundingClientRect().x;
    // Add any visual feedback based on movX if needed
  }

  async send() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      emailjs.init('NiO7U7kKCueXSIP7a');

      const response = await emailjs.send("service_gft29vo", "template_rk14yhl", {
        from_name: this.form.get('from_name')?.value,
        to_name: 'Admin',
        from_email: this.form.get('from_email')?.value,
        message: this.form.get('message')?.value,
      });

      console.log('Email sent successfully:', response);
      this.successMessage = 'Message has been sent';
      this.form.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      this.successMessage = 'Failed to send message. Please try again.';
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -50;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
