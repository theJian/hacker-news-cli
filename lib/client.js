'use strict';
var request = require('request');

var config = {
	baseURL: 'https://hacker-news.firebaseio.com',
	apiVersion: 'v0'
};

function sendRequest(path, cb) {
	path.replace(/^\//, "");

	var url = [config.baseURL, config.apiVersion, path].join("/");

	request(url, function (err, response, body) {
		cb(err, response, body);
	});
}

function fetchTopStories (cb) {
	sendRequest('topstories.json', function (err, response, body) {
		if(!err && response.statusCode == 200) {
			cb(null, JSON.parse(body));
		}
	});
}

function getItem (id, cb) {
	sendRequest('item/' + id + '.json', function (err, response, body) {
		if(!err && response.statusCode == 200) {
			cb(null, JSON.parse(body));
		}
	});
}

function getStoryItemList (storyIdList, cb) {
	var storyItemList = [];

	(function next (i, len) {
		if(i < len) {
			getItem(storyIdList[i], function (err, item) {
				if(!err) {
					storyItemList.push(item);
					next(i + 1, len);
				}
			});
		} else {
			cb(null, storyItemList);
		}
	})(0, storyIdList.length);
}

function getTopStories (count, cb) {
	fetchTopStories(function (err, storyIdList) {
		if(!err) {
			getStoryItemList(storyIdList.slice(0, count), cb);
		}
	});
}

module.exports = {
	getTopStories: getTopStories,
	fetchTopStories: fetchTopStories
};