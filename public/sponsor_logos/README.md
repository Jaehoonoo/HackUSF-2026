# Sponsor Logos

Place sponsor and partner logos here and update the arrays in `/components/sponsors/page.js`

## How to Add a Logo

1. Add the image file to this folder (e.g., `google.png`)
2. Update the sponsors/partners arrays in `/components/sponsors/page.js`:

```javascript
const sponsors = [
  { name: "Google", logo: "/sponsor_logos/google.png", size: "large" },
  // ...
];
```

## Size Options
- `"large"` - 220x220px bubble (for main sponsors)
- `"medium"` - 160x160px bubble (default)
- `"small"` - 120x120px bubble

## Image Guidelines
- Use transparent PNG files for best results
- Recommended size: 400x400px minimum
- Logos will auto-fit within the bubble (65% of bubble size)
- Set `logo: null` to show a placeholder with the sponsor name
