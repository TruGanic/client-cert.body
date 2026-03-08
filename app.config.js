// Load .env into process.env when present (requires: npm install dotenv)
try {
  require("dotenv").config();
} catch (_) {
  // dotenv not installed; set EXPO_PUBLIC_* in shell or use another env loader
}

export default ({ config }) => {
  return {
    ...config,
  };
};
