#!/usr/bin/env node
'use strict';

var program = require('commander'),
		renderer = require('./lib/renderer'),
		path = require('path');

var pkg = require(path.join(__dirname, 'package.json'));

program
	.version(pkg.version)
	.description(pkg.description);

program
	.command('top')
	.description('List top stories on hacker news')
	.action(function () {
		renderer.top(10);
	});

program.parse(process.argv);

if(!process.argv.slice(2).length) {
	program.outputHelp();
}