# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bulleo Soins is a French-language website for a perinatal care business in Tarbes, France. The site promotes wellness services for pregnant women and new mothers, including prenatal massage, wrapped baths for newborns, rebozo care, and baby workshops.

## Architecture

### Technology Stack
- **Frontend**: Pure HTML with inline CSS and JavaScript
- **Styling**: Tailwind CSS (CDN)
- **Forms**: EmailJS for contact form handling
- **Payments**: Stripe integration for payment processing
- **Analytics**: Google Tag Manager (GTM-MZT366F6)

### File Structure
- `index.html` - Main single-page application (260+ KB monolithic file)
- `index_original.html` - Backup of original index
- `success.html` - Payment success page
- `assets/favicon/` - Favicon and PWA assets
- `memory-bank/` - Documentation templates (mostly empty)

## Development Notes

### Critical Considerations
- **No build system**: This is a static HTML site with no build process, package.json, or dependency management
- **Inline everything**: All CSS and JavaScript is embedded directly in HTML files
- **CDN dependencies**: Uses CDN links for Tailwind CSS, EmailJS, Stripe, and Font Awesome
- **Large file size**: index.html exceeds 256KB - use offset/limit when reading

### SEO & Schema
The site includes comprehensive SEO metadata:
- Open Graph tags for social sharing
- Schema.org structured data for local business
- Google Business integration
- Geo-location metadata for Tarbes, France

### External Services
- **EmailJS**: Form submissions
- **Stripe**: Payment processing with buy buttons
- **Google Tag Manager**: Analytics tracking
- **Cookie Consent**: TermsFeed integration