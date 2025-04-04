import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private/',
        '/admin/',
        '/includes/',
        '/misc/',
        '/modules/', 
        '/profiles/',
        '/scripts/',
        '/themes/',
        '/CHANGELOG.txt',
        '/cron.php',
        '/INSTALL.mysql.txt',
        '/INSTALL.pgsql.txt', 
        '/INSTALL.sqlite.txt',
        '/install.php',
        '/INSTALL.txt',
        '/LICENSE.txt',
        '/MAINTAINERS.txt',
        '/update.php',
        '/UPGRADE.txt',
        '/xmlrpc.php',
        '/admin/',
        '/comment/reply/',
        '/filter/tips/',
        '/node/add/',
        '/search/',
        '/user/register/',
        '/user/password/',
        '/user/login/',
        '/user/logout/',
        '/?q=admin/',
        '/?q=comment/reply/',
        '/?q=filter/tips/',
        '/?q=node/add/',
        '/?q=search/',
        '/?q=user/password/',
        '/?q=user/register/',
        '/?q=user/login/',
        '/?q=user/logout/'
        ,'/download/'
      ],
    },
    sitemap: 'https://www.adeptia.com/sitemap.xml',
  }
}