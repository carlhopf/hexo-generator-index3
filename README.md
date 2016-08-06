## Introduction

Filtered index generator for [Hexo]. Based on official
index generator and [hexo-generator-index2]. Support filtering based on
post front-matter. Also added support for multiple index pages,
each with custom filtering etc.

## Installation

``` bash
$ npm install hexo-generator-index3 --save
$ npm uninstall hexo-generator-index --save
```

## Options

```yaml
index_generator:
  index:
    per_page: 0
    order_by: -date
    layout:
      - index
    include:
      - key type index
  blog:
    per_page: 0
    order_by: -date
    include:
      - key type blog
  apps:
    per_page: 0
    order_by: -date
    include:
      - category Apps
```

- **per_page**: Posts displayed per page. (0 = disable pagination)
- **order_by**: Posts order. (Order by date descending by default)
- **include**: Posts filter include option
- **exclude**: Posts filter exclude option

Include/exclude option is `attribute value` format, available attribute are:

- category: Post category
- tag: Post tag
- path: Post source path
- key: Custom front-matter key/value
- layout: Layout values, defaults to ['index', 'archive'].


## License

MIT

[Hexo]: http://hexo.io/
[hexo-generator-index2]: https://github.com/Jamling/hexo-generator-index2
