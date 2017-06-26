'use strict';

var pagination = require('hexo-pagination');
var funcs = [];

funcs['category'] = function(post, value) {
	var ret = false;

	post.categories.forEach(function(item, i) {
		if (item.name == value) {
			ret = true;
			return;
		}
	});

	return ret;
};

funcs['tag'] = function(post, value) {
	var ret = false;

	post.tags.forEach(function(item, i) {
		if (item.name == value) {
			ret = true;
			return;
		}
	});

	return ret;
};

funcs['path'] = function(post, value) {
	var ret = false;
	ret = post.source.indexOf(value) > -1;
	return ret;
};

funcs['key'] = function(post, key, value) {
	var postValue = post[key];
	
	if (!postValue) return false;
	
	if (postValue instanceof Array) {
		return postValue.indexOf(value) !== -1;
	} else if (postValue === value) {
		return true;
	}
	
	return false;
};

var parse = function (locals, index) {

};

module.exports = function(locals) {
	var config = this.config;
	var paginationDir = config.pagination_dir || 'page';

	var indexes = config.index_generator;

	var posts = Object.keys(indexes).reduce(function(memo, key) {
    var index = indexes[key];
    var posts = locals.posts.sort(index.order_by);

    if (index.include || index.exclude) {
      var util = require('util');
      var include = index.include || [];
      var exclude = index.exclude || [];

      if (!util.isArray(include)) {
        include = [include];
      }
      if (!util.isArray(exclude)) {
        exclude = [exclude];
      }

      posts = posts.filter(function(post) {
        var ret = false;

        if (include.length > 0) {
          for (var i = 0; i < include.length; i++) {
            var str = include[i].split(' ');
            ret = funcs[str[0]](post, ...str.slice(1));

            if (ret) {
              break;
            }
          }
        }

        if (exclude.length > 0) {
          var ex = false;
          for (var i = 0; i < exclude.length; i++) {
            var str = exclude[i].split(' ');
            ex = funcs[str[0]].call(this, post, str[1]);

            if (ex) {
              break;
            }
          }
          ret = ret && !ex;
        }

        return ret;
      });
    }

    var path = key === 'index' ? '' : key;

    var posts = pagination(path, posts, {
  		perPage: index.per_page,
  		layout: index.layout,
  		format: paginationDir + '/%d/',
  		data: {
  			__index: key === 'index',
  		},
  	});

    return memo.concat(posts);
	}, []);

  return posts;
};
