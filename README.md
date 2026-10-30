# AUREL Private Aviation

An image-led, responsive private charter landing page built with the Next.js App Router, TypeScript, Tailwind CSS, Motion for React, GSAP ScrollTrigger, Lenis and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

`npm run build` runs the standalone TypeScript check, then creates a Webpack production build. The Webpack flag avoids a Turbopack worker-port restriction in the managed workspace. `next.config.ts` selects Next's TypeScript API mode for the same workspace compatibility reason.

## Inquiry form

The charter form is a front-end demonstration. It validates the required trip and contact fields in the browser, then explains that the inquiry has not been sent or confirmed. Add a booking service or server action before using it to collect live requests. The page intentionally contains sample contact details and placeholder legal copy.

Aircraft class labels and photos are illustrative. Passenger capacity, range, cabin configuration and availability must be confirmed for each charter request.

## Images

Images are local JPEG assets in `public/images` and are rendered through `next/image` for responsive sizing and format optimization.

- `hero.jpg`, `aircraft-hero.jpg`, `private-aircraft.jpg` — Unsplash private aircraft photography
- `cabin.jpg` — Unsplash private aircraft cabin photography
- `wing.jpg` — Unsplash aircraft above clouds
- `coast.jpg`, `dubai.jpg`, `seychelles.jpg` — Unsplash destination photography

Source pages: [hero aircraft](https://unsplash.com/s/photos/luxury-jet), [aircraft at sunset](https://unsplash.com/photos/white-airplane-on-airport-during-daytime-Emvf_emPMdY), [private aircraft](https://unsplash.com/s/photos/private-aircraft), [cabin](https://unsplash.com/photos/luxurious-interior-of-a-private-jet-with-comfortable-seating-ogUyaf8JWA4), [wing view](https://unsplash.com/photos/a-view-of-the-wing-of-a-plane-above-the-clouds-chpz1Du6PrI), [coast](https://unsplash.com/photos/a-serene-beach-with-crystal-clear-turquoise-water-5LPMJ_vA3yk), [Dubai](https://unsplash.com/photos/a-view-of-a-city-with-a-lot-of-tall-buildings-CK9BTsQ-I1Y), [Seychelles](https://unsplash.com/fr/photos/une-vue-aerienne-dune-ile-au-milieu-de-locean-vXtb1JUQYf0).

## Motion choices

- Motion handles the hero entrance, menu and destination-image transition.
- GSAP and ScrollTrigger handle reveals, image parallax, the route drawing and desktop pinned storytelling.
- Lenis shares GSAP's ticker and keeps anchor navigation and reduced-motion behavior enabled.
- The experience sequence becomes a natural vertical story on mobile. The motion system honors `prefers-reduced-motion`.
- No 3D viewer is loaded. The current direction is based on real aircraft photography and there is no verified aircraft model to present.
# Luxury-planes-frontend
