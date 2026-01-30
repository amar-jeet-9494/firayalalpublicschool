export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
      sitemap: 'https://firayalalpublicschool.edu.in/sitemap.xml',
    }
  }
