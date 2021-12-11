module.exports = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    domains: ["cdn.masahirolamarsh.com"],
  },
};
