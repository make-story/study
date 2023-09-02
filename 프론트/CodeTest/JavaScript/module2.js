
import('./dynamic').then(function() {
    console.log('dynamic');
}).catch(function(err) {
	console.error('dynamic error', err);
}); 
module.exports = 'module2';