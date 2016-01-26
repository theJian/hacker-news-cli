'use strict';
var inquirer = require('inquirer'),
		openurl = require('openurl'),
		client = require('./client');

function top (count) {
	client.getTopStories(count, function (err, storyItemList) {
		if(!err) {
			inquirer.prompt([
				{
					type: "list",
					name: "topStory",
					message: "Hacker News | Top",
					choices: formatTopChoices(storyItemList)
				}	
			], function (answers) {
				var url = answers['topStory'];
				openurl.open(url);
			});
		}
	});
}

function formatTopChoices (items) {
	var choices = [];
	items.forEach(function (item, index) {
		var line = '';
		var title = item.title,
				author = item.by,
				score = item.score;
		line += title + ' By: ' + author + ' ' + score + ' points';

		var choice = {
			name: line,
			value: item.url
		};
		choices.push(choice);
	});
	return choices;
}

module.exports = {
	top: top
};