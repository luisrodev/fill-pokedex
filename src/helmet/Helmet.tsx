import { Helmet } from "react-helmet-async";
import constants from "~/constants";

export const HelmetData = () => (
  <Helmet>
    <meta name="description" content={constants.metadata.description} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={constants.metadata.title} />
    <meta property="og:description" content={constants.metadata.description} />
    <meta property="og:image" content="/images/desktop-background.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="https://fillpokedex.xyz" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={constants.metadata.title} />
    <meta name="twitter:description" content={constants.metadata.description} />
    <meta name="twitter:image" content="/images/desktop-background.png" />
    <title>{constants.metadata.title}</title>
  </Helmet>
);
