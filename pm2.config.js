module.exports = {
    apps: [
        {
            name: 'selenium-and-pm2-test',
            script: 'dist/src/main.js',
            watch: false,
            instances: 1,
            exec_mode: 'fork',
            max_memory_restart: '200M',
        }
    ]
}
