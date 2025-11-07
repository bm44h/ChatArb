import type { NextConfig } from "next";

const nextConfig: NextConfig = {

    webpack(config, { isServer, dev }) {
    // إعدادات خاصة لحل مشكلة onnxruntime-node
    config.externals.push({
      'onnxruntime-node': 'commonjs onnxruntime-node',
    });

    // هذا يخبر Webpack بمعالجة ملفات .node كملفات أصول
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });
    return config;
  }
};

export default nextConfig;
