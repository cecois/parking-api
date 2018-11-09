const __ = require('underscore')
,AXIOS = require('axios')
;

const _GET = async(U,P)=>{

return new Promise((resolve,reject)=>{
	AXIOS.get(U,P)
	  .then(function (response) {
	    resolve(response);
	  })
	  .catch(function (error) {
	    console.log(error);
			reject(error);
	  });
})//promise
}//_GET

const _TINIFY = async(U)=>{
	return new Promise((resolve,reject)=>{

//resolve result of tinifying package

	})//promise
}//tinify

const _CAPIFY = async(U)=>{
	return new Promise((resolve,reject)=>{

//resolve result of capture package

	})//promise
}//capify

const _TWEET = async(U,IMG)=>{
	return new Promise((resolve,reject)=>{

//resolve result of tweet package

	})//promise
}//tweet

const main = async () =>{

//get lowest id where carto.sent IS NULL
let lows = await _GET('https://cecmcgee.carto.com/api/v2/sql?',{params:{q:"SELECT min(objectid) as low FROM atl_tax_parcel_parking WHERE sent IS NULL"}})
let low = lows.data.rows[0].low
if(typeof low !== 'number'){reject("no low id found")}

// gen tiny urlk
let uri = await _TINIFY("http://lots.milleria.org/#/"+low)
// optionally pull screencap
let cap = await _CAPIFY("http://lots.milleria.org/#/"+low)
//tweet short bio
let tweet = await _TWEET(uri,cap);
//update carto set sent=true (or timestamp maybe)

}

main();
