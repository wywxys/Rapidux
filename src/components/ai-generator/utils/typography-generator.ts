// Typography CSS code generator utilities

export interface TypographySettings {
  headingFont: string;
  bodyFont: string;
}

export function generateTypographyCSS(settings: TypographySettings): string {
  return `/* Typography Settings */

/* Heading Font */
h1, h2, h3, h4, h5, h6 {
  font-family: "${settings.headingFont}", sans-serif;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

h1 {
  font-size: 2.25rem; /* 36px */
}

h2 {
  font-size: 1.875rem; /* 30px */
}

h3 {
  font-size: 1.5rem; /* 24px */
}

h4 {
  font-size: 1.25rem; /* 20px */
}

h5 {
  font-size: 1.125rem; /* 18px */
}

h6 {
  font-size: 1rem; /* 16px */
}

/* Body Font */
body, p, span, div, a, button, input, textarea, select {
  font-family: "${settings.bodyFont}", sans-serif;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
}

/* Text Sizes */
.text-xs {
  font-size: 0.75rem; /* 12px */
}

.text-sm {
  font-size: 0.875rem; /* 14px */
}

.text-base {
  font-size: 1rem; /* 16px */
}

.text-lg {
  font-size: 1.125rem; /* 18px */
}

.text-xl {
  font-size: 1.25rem; /* 20px */
}

.text-2xl {
  font-size: 1.5rem; /* 24px */
}

/* Font Weights */
.font-light {
  font-weight: 300;
}

.font-normal {
  font-weight: 400;
}

.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

.font-bold {
  font-weight: 700;
}`;
}
