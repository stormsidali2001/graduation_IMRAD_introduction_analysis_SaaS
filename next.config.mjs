/** @type {import('next').NextConfig} */
const nextConfig = {

    
    experimental:{
        
        serverComponentsExternalPackages:["bcrypt"]
    },
webpack: (config) => {
config.externals = [...config.externals, 'bcrypt'];
return config;
},
};

export default nextConfig;
