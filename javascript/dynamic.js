/*
var template1 = require('../template/test.ejs');
var compiled = require('../template/test.handlebars');

var test = 'dynamic';
console.log(template1({'test': 'ysm'}));
console.log(compiled());
console.log(test);
*/

// dynamic import 
import('./module1').then(function() {
	console.log('module1');
}).catch(function(err) {
	console.error('dynamic error (module1)', err);
});
import('./module2').then(function() {
	console.log('module2');
}).catch(function(err) {
	console.error('dynamic error (module2)', err);
});
