require('dotenv').load();

const __ = require('underscore')
,AXIOS = require('axios')
,MOMENT = require('moment')
,MONGO = require('mongodb').MongoClient
,TWITTER = require('twitter')
,TINY = require('tinyurl')
,PUPPETEER = require('puppeteer')
// ,CONFIG = require("./Config.json")
// ,CLOUDINARY = require('cloudinary')
// ,CLOUD = require("cloudinary-direct")
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

const TWITR = new TWITTER({
  consumer_key: process.env.TW_API_KEY,
  consumer_secret: process.env.TW_API_SECRET,
  access_token_key: '',
  access_token_secret: ''
});

const _SET_NEW_LOW=(nid)=>{
 return new Promise(function(resolve, reject) {

  var Q = { "id":nid }

  const uri = "mongodb+srv://app:"+process.env.MONGOPSSWD+"@cl00-uacod.mongodb.net/parking?retryWrites=true";
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
  console.log("fetching lowest id...")
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

const _GETBIO = async(I)=>{

console.log("fetching bio for ",I)
   let bio = await _GET('https://cecmcgee.carto.com/api/v2/sql?',{params:{q:"SELECT bio_short FROM atl_tax_parcel_parking WHERE cartodb_id="+I}})
  return new Promise((resolve,reject)=>{
if(!bio){reject("no bio found at carto")}
   resolve(__.first(bio.data.rows).bio_short);
})//promise
}//_GET

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

  // console.log("screencapping...",U)
  let fi = F

  const browser = await PUPPETEER.launch({slowMo: 500});
  const page = await browser.newPage();
  page.setViewport({width:1024,height:768})
  await page.goto(U);
  let sc = await page.screenshot({path: fi});

  await browser.close();
  return sc;

}//capify

const _TWEET = async(T,IMG)=>{
	return new Promise((resolve,reject)=>{

// Load your image
var img = FS.readFileSync(IMG);

// Make post request on media endpoint. Pass file data as media parameter
TWITR.post('media/upload', {media: img}, function(error, media, response) {
if(error){console.log(error);reject(error)}
  if (!error) {

    // If successful, a media object will be returned.
    console.log(media);

    // Lets tweet it
    var status = {
      status: T,
      media_ids: media.media_id_string // Pass the media id string
    }

    TWITR.post('statuses/update', status, function(error, tweet, response) {
if(error){console.log(error);reject(error)}
      if (!error) {
        console.log(tweet);
        resolve(tweet);
      }
    });

  }
});

	})//promise
}//tweet

const _GETMAP = async()=>{
  console.log("fetching random map")
  return new Promise((resolve,reject)=>{

    resolve(maps[Math.floor(Math.random()*maps.length)])

  })//promise
}//tweet

const main = async () =>{

//get lowest id frm mongo
let lowob = await _GET_LOW()
// console.log("lowob (full)",lowob);
let low=lowob[0].id
if(typeof low == 'undefined'){console.log("no low id found")}else{console.log("lowest id is ",low)}

let map = await _GETMAP();
console.log("random map is ",map)
let bio = await _GETBIO(low);
console.log("bio is ",map)
// console.log("bio",bio);

let uri = "http://lots.milleria.org/#/"+map+"/-84.86732482910156,33.608900856100234,-83.83323669433595,33.897777013859475/"+low

let capfile = '/tmp/'+low+".png"

// pull screencap
let cap = await _CAPIFY(uri,capfile)

// place it
// let capurl = await _UPCAP(capfile)
// console.log("capurl",capurl);

// gen tiny uri
let url = await _TINIFY(uri)
// console.log("uri",url);

let tweet = bio+" "+url
console.log("tweeting: ",tweet);

//tweet short bio
let tweeted = await _TWEET(tweet,capfile);
console.log("tweeted",tweeted);
//update carto set sent=true (or timestamp maybe)
// let finalize = await _GET('https://cecmcgee.carto.com/api/v2/sql?',{params:{q:"update atl_tax_parcel_parking set sent="}})

// let set_new_low=await _SET_NEW_LOW(low);
	// console.log("updated sent status",set_new_low);

}

main();
