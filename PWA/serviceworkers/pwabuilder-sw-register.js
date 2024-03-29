// https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps-edgehtml/get-started

// Subscribe this PWA to push notifications from the server
navigator.serviceWorker.ready
	.then(function (registration) {
		// Check if the user has an existing subscription
		return registration.pushManager.getSubscription()
			.then(async function (subscription) {
				if (subscription) {
					return subscription;
				}
				
				// Otherwise subscribe with the server public key
				const response = await fetch('./vapidPublicKey');
				const vapidPublicKey = await response.text();
				const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
				
				return registration.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: convertedVapidKey
				});
			});
	}).then(function (subscription) {
		// Send the subscription details to the server
		fetch('./register', {
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				subscription: subscription
			}),
		});
		
		// Create a button to mimic server pushes for testing purposes
		var button = document.createElement('input');
		button.type = 'button';
		button.id = 'notify';
		button.value = 'Send Notification';
		document.body.appendChild(button);
		document.getElementById('notify').addEventListener('click', function () {
			fetch('./sendNotification', {
				method: 'post',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify({
					subscription: subscription
				}),
			});
		});
	});

// Utility function for browser interoperability
function urlBase64ToUint8Array(base64String) {
	var padding = '='.repeat((4 - base64String.length % 4) % 4);
	var base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');
		
	var rawData = window.atob(base64);
	var outputArray = new Uint8Array(rawData.length);
	
	for (var i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}