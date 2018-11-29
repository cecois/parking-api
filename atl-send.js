const __ = require('underscore')
,AXIOS = require('axios')
,MOMENT = require('moment')
,MONGO = require('mongodb').MongoClient
,TWEET = require('tweet-tweet')
,TINY = require('tinyurl')
,PUPPETEER = require('puppeteer')
// ,CLOUDINARY = require('cloudinary')
,FS = require('fs')
,maps = [
"dark_all",
"light_all",
"esri_natgeo",
"mapnik_bw",
"stamen_toner",
"stamen_toner_lite",
"stamen_watercolor",
"waze_us",
"yandex",
"mapbox_ashton_pencil",
"stamen_pinterest",
"mapbox_lutz_woodcut",
"mapbox_lutz_spacestation",
"mapbox_financialtimes",
"mapbox_infoamazonia_color",
"mapnik_mono",
"mapbox_mslee_blueprint",
"mapbox_mslee_winter",
"mapbox_saman_standardoil",
"mapbox_edenhalperin_camouflage",
"mapbox_comic",
"mapbox_emerald",
"mapbox_contrast",
"mapbox_outdoors",
"mapbox_wheatpaste"
]
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

const _CAPIFY = async(U,F)=>{

  console.log("screencapping...",U)
  let fi = F

  const browser = await PUPPETEER.launch({slowMo: 500});
  const page = await browser.newPage();
  page.setViewport({width:1024,height:768})
  await page.goto(U);
  let sc = await page.screenshot({path: fi});

  await browser.close();
  return sc;

}//capify

const _UPCAP = async(I)=>{
	return new Promise((resolve,reject)=>{

// CLOUDINARY.v2.uploader.upload(I,{upload_preset:'unsigned',tags:['parking','atl']},
    // function(error, result) {
    	if(error){reject(error);}
    	resolve()
    // });

})//promise
}//upcap

const _TWEET = async(U,IMG)=>{
	return new Promise((resolve,reject)=>{

//resolve result of tweet package

	})//promise
}//tweet

const _GETMAP = async()=>{
	return new Promise((resolve,reject)=>{

    resolve(maps[Math.floor(Math.random()*maps.length)])

	})//promise
}//tweet

const main = async () =>{

//get lowest id where carto.sent IS NULL
// let lows = await _GET('https://cecmcgee.carto.com/api/v2/sql?',{params:{q:"SELECT min(objectid) as low FROM atl_tax_parcel_parking WHERE sent IS NULL"}})
let lowob = await _GET_LOW()
let low=lowob[0].id
if(typeof low == 'undefined'){console.log("no low id found")}

	let map = await _GETMAP();

let uri = "http://lots.milleria.org/#/"+map+"/-84.86732482910156,33.608900856100234,-83.83323669433595,33.897777013859475/"+low
console.log("cap",uri);

let capfile = '/tmp/'+low+".png"

// optionally pull screencap
let cap = await _CAPIFY(uri,capfile)
console.log("capfile",capfile)

// place it
// let capurl = await _UPCAP(capfile)
// console.log("capurl",capurl);

// gen tiny urik
// let url = await _TINIFY(uri)
// console.log("uri",url);


//tweet short bio
// let tweet = await _TWEET(uri,cap);
//update carto set sent=true (or timestamp maybe)
// let finalize = await _GET('https://cecmcgee.carto.com/api/v2/sql?',{params:{q:"update atl_tax_parcel_parking set sent="}})

// let set_new_low=await _SET_NEW_LOW(low);
// 	console.log("updated sent status",set_new_low);

}

main();
