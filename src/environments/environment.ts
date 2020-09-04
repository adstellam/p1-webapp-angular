// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	jwtModuleWhitelist: 'localhost:22081',
	apiUrl: 'http://localhost:22081/api',
	sseUrl: 'http://localhost:22082',
	rtdWssUrl: 'ws://localhost:22091',
	hosWssUrl: 'ws://localhost:22092',
	mtsWssUrl: 'ws://localhost:22093',
	cubejsApiUrl: 'http://localhost:22030',
	googleMapApiKey: 'AIzaSyD7Ukxn4iOeZANb0NzhhqDbxUXHIGkt7y0',
	videoStoreUrl: ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
