module.exports = {
  apps: [
    {
      name: 'fake-payment-backend',
      script: 'dist/app.js',
      watch: false,
      exec_mode: 'cluster',
      instances: 'max',
      max_memory_restart: '512M',
      listen_timeout: 3000,
      kill_timeout: 6000,
      combine_logs: true,
    },
  ],
}
