(function () {
  "use strict";

  window.PORTFOLIO_SITE_CONFIG = Object.assign({}, window.PORTFOLIO_SITE_CONFIG, {
    contactEndpoint: "https://script.google.com/macros/s/AKfycbwNH3P0TNGcGSGEnp0wzkJws5ezGai6dOapJXPGmmMWp3-x2MmMq6l_VkuNNUEnCq4Wkg/exec",
    contactTransport: "gas_iframe",
    contactTrustedOrigins: [
      "https://script.google.com",
      "https://script.googleusercontent.com"
    ]
  });
})();
