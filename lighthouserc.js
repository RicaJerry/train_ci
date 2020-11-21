// configuration li ci

module.export = {
    ci: {
        collect: {
            // TODO: Add configuration 
            /**
             * staticDistDir : './public' => site static 
             * statServerCommand : 'npm run start' => dynamic site example
             */

            staticDistDir: './public',
            url: ['http://localhost:8080']
        },
        assert: {

        },
        /**
         * https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1580152437799-46441.report.html
         */
        upload: {
            // TODO: Add configuration
            target: 'temporary-public-storage',
        },
        server: {

        }
    }
}