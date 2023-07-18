// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const apiURl = "http://localhost:8099/api";
export const echantillonStatus={
  New:{
    name:"New",
    color:"info"
  },
  Sent:{
    name:"Sent",
    color:"primary"
  },
  Received:{
    name:"Received",
    color:"success"
  },
  ToVerifiy:{
    name:"To Verify",
    color:"warning"
  }
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
