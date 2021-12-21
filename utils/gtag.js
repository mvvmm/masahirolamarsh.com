/**
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/pages
 */
const pageView = (url) => {
  window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
    page_path: url,
    // Always debug in dev
    debug_mode: process.env.NODE_ENV === "development",
  });
};

export { pageView };