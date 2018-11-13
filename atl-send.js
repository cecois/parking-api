const __ = require('underscore')
,AXIOS = require('axios')
,MOMENT = require('moment')
,MONGO = require('mongodb').MongoClient
,TWEET = require('tweet-tweet')
,TINY = require('tinyurl')
,SCREENSHOT = require('screenshot-stream')
,FS = require('fs')
;

const _SET_NEW_LOW=(nid)=>{
			return new Promise(function(resolve, reject) {

var Q = { "id":nid }

const uri = "mongodb+srv://app:7GT8Cdl*fq4Z@cl00-uacod.mongodb.net/parking?retryWrites=true";
MONGO.connect(uri, { useNewUrlParser: true }, function(err, client) {
   const col = client.db("parking").collection("atl_parcel_parking");
   // perform actions on the collection object
   col.updateOne(
   Q,
   { $set: { "sent": new Date() } }
)
client.close();
resolve(nid);
});//connect


	});//Promise
	}

const _GET_LOW=()=>{
			return new Promise(function(resolve, reject) {

var Q = {"sent":{$eq:null}}

const uri = "mongodb+srv://app:7GT8Cdl*fq4Z@cl00-uacod.mongodb.net/parking?retryWrites=true";
MONGO.connect(uri, { useNewUrlParser: true }, function(err, client) {
   const col = client.db("parking").collection("atl_parcel_parking");
   // perform actions on the collection object
   col.find(Q).sort({id:+1}).limit(1).toArray(function(err, docs) {
				if(err){reject(err)}
   client.close();
    resolve(docs);
  });//toarray

});//connect

	});//Promise
	}

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

const _TINIFY = async (U) => {

	return new Promise((resolve,reject)=>{

    TINY.shorten(U, (res)=>{
    resolve(res);
});

})//promise
};//tinify

const _CAPIFY = async(U,I)=>{
	return new Promise((resolve,reject)=>{

console.log("screencapping...",U)
let fi = '/tmp/'+I+".png"

//resolve result of capture package
// SCREENSHOT(U, '1024x768', {crop: false,delay:15}).then(buf => {
	
//     FS.writeFileSync(fi, buf,(e,s)=>{
//     	if(e){reject(e)}
// console.log("resolving screencap at file:///"+fi)
//     		resolve(fi);
//     });
// });

const stream = SCREENSHOT(U, '1024x768', {delay:22,transparent:true});

stream.pipe(FS.createWriteStream(fi),(e,s)=>{
	if(e){reject(e)}
		resolve(s);
});

	})//promise
}//capify

const _TWEET = async(U,IMG)=>{
	return new Promise((resolve,reject)=>{

//resolve result of tweet package

	})//promise
}//tweet

const main = async () =>{

//get lowest id where carto.sent IS NULL
// let lows = await _GET('https://cecmcgee.carto.com/api/v2/sql?',{params:{q:"SELECT min(objectid) as low FROM atl_tax_parcel_parking WHERE sent IS NULL"}})
let lowob = await _GET_LOW()
let low=lowob[0].id
if(typeof low == 'undefined'){console.log("no low id found")}
	console.log("low id is ",low);

// gen tiny urlk
// http://lots.milleria.org/#/-84.44001674652101,33.76972975651641,-84.42782878875734,33.7770338179588/44280

// let uri = await _TINIFY("http://lots.milleria.org/#/-84.80196744203569,33.51972469906646,-84.02193814516069,33.9872905868748/"+low)
// console.log("uri",uri);

// optionally pull screencap
let cap = await _CAPIFY("http://lots.milleria.org/#/-84.80196744203569,33.51972469906646,-84.02193814516069,33.9872905868748/"+low,low)
console.log("cap",cap);
//tweet short bio
// let tweet = await _TWEET(uri,cap);
//update carto set sent=true (or timestamp maybe)
// let finalize = await _GET('https://cecmcgee.carto.com/api/v2/sql?',{params:{q:"update atl_tax_parcel_parking set sent="}})

// let set_new_low=await _SET_NEW_LOW(low);
// 	console.log("updated sent status",set_new_low);

}

main();
