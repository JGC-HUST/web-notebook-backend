Application created by [ThinkJS](http://www.thinkjs.org)

## Install dependencies

```
npm install
```

## Start server

```
npm start
```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```

## Database Table

```SQL
-- user
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL UNIQUE,
  `password` varchar(100) NOT NULL,
	`email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- cate
CREATE TABLE `cate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `owner` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `owner_fk_1` FOREIGN KEY (`owner`) REFERENCES `user` (`id`),
  CONSTRAINT uc_PersonID UNIQUE (`id`, `title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- article
CREATE TABLE `article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` TEXT NOT NULL,
  `cate` int(10) unsigned NOT NULL,
	`time` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `cate_fk_1` FOREIGN KEY (`cate`) REFERENCES `cate` (`id`),
  CONSTRAINT uc_PersonID UNIQUE (`id`, `title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
