const __ = require('underscore')
,FS = require('fs')
;

const adjectives =
["flat"
,"level"
,"horizontal"
,"smooth"
,"even"
,"uniform"
,"weedy"
,"intopographic"
,"shallow"
,"tranquil"
,"recumbent"
,"toneless"
,"unvaried"
,"characterless"
,"lifeless"
];

const adverbs =
["vry"
,"quite"
,"extremely"
,"noticeably"
,"terribly"
,"considerably"
];


const getPantheon = async () =>{

	return new Promise((resolve,reject)=>{

		FS.readFile('./dev/pantheon.json',async (err,res)=>{

					if(err){reject(err)} else {

						resolve(JSON.parse(res))

}//fs.Readfile.if.err.else

})//readfile

})//promise
}//getPantheon

const getSupply = async () =>{

	return new Promise((resolve,reject)=>{

		FS.readFile('./dev/atl-tax-parcel-parking.geojson',async (err,res)=>{

					if(err){reject(err)} else {

						resolve(JSON.parse(res))

}//fs.Readfile.if.err.else

})//readfile

})//promise
}//getSupply

const setSupply = async (OG,pantheon) =>{

	return new Promise((resolve,reject)=>{

		let G = OG

let features =__.map(OG.features,(g)=>{

let towns=__.filter(pantheon,(f)=>{
	return (f.countryCode3=='USA' || f.countryCode3=='CAN'|| f.countryCode3=='MEX')
})
let town=towns[Math.floor(Math.random()*towns.length)]
let celeb=pantheon[Math.floor(Math.random()*pantheon.length)]

	let o=
	{
		adjective:adjectives[Math.floor(Math.random()*adjectives.length)]
		,hometown:(town.countryCode3=='USA' && town.birthstate!=='')?town.birthcity+", "+town.birthstate:town.birthcity+", "+town.countryCode3
		,celebrity:celeb.occupation.toLowerCase()+" "+celeb.name
	}
	delete g.properties.ORDSTATUS;
	delete g.properties.LOWPARCELI;
	delete g.properties.PARCELID;
	delete g.properties.BUILDING;
	delete g.properties.UNIT;
	delete g.properties.STATEDAREA;
	delete g.properties.LGLSTARTDT;
	delete g.properties.CVTTXCD;
	delete g.properties.CVTTXDSCRP;
	delete g.properties.SCHLTXCD;
	delete g.properties.SCHLDSCRP;
	delete g.properties.USECD;
	delete g.properties.USEDSCRP;
	delete g.properties.NGHBRHDCD;
	delete g.properties.CLASSCD;
	delete g.properties.CLASSDSCRP;
	delete g.properties.LIVUNITS;
	delete g.properties.SITESTATE;
	delete g.properties.SITEZIP;
	delete g.properties.PRPRTYDSCR;
	delete g.properties.CNVYNAME;
	delete g.properties.OWNERNME1;
	delete g.properties.OWNERNME2;
	delete g.properties.PSTLADDRES;
	delete g.properties.PSTLADDR_1;
	delete g.properties.PSTLCITY;
	delete g.properties.PSTLSTATE;
	delete g.properties.PSTLZIP5;
	delete g.properties.PSTLZIP4;
	delete g.properties.FLOORCOUNT;
	delete g.properties.BLDGAREA;
	delete g.properties.RESFLRAREA;
	delete g.properties.RESYRBLT;
	delete g.properties.RESSTRTYP;
	delete g.properties.STRCLASS;
	delete g.properties.CLASSMOD;
	delete g.properties.LNDVALUE;
	delete g.properties.TOT_APPR;
	delete g.properties.IMPR_APPR;
	delete g.properties.LANDASSESS;
	delete g.properties.IMPRASSESS;
	delete g.properties.LANDAPPR;
	delete g.properties.PRVASSDVAL;
	delete g.properties.CNTASSDVAL;
	delete g.properties.ASSDVALYRC;
	delete g.properties.ASSDPCNTCG;
	delete g.properties.PRVTXBLVAL;
	delete g.properties.CNTTXBLVAL;
	delete g.properties.TXBLVALYRC;
	delete g.properties.TXBLPCNTCH;
	delete g.properties.PRVWNTTXOD;
	delete g.properties.PRVSMRTXOD;
	delete g.properties.TOTPRVTXTO;
	delete g.properties.CNTWNTTXOD;
	delete g.properties.CNTSMRTXOD;
	delete g.properties.TOTCNTTXOD;
	delete g.properties.TXODYRCHG;
	delete g.properties.TXODPCNTCH;
	delete g.properties.WATERSERV;
	delete g.properties.SEWERSERV;
	delete g.properties.LASTUPDATE;
	delete g.properties.EXT_MIN_X;
	delete g.properties.EXT_MIN_Y;
	delete g.properties.EXT_MAX_X;
	delete g.properties.EXT_MAX_Y;
	delete g.properties.CREATED_US;
	delete g.properties.CREATED_DA;
	delete g.properties.LAST_EDITE;
	delete g.properties.LAST_EDI_1;
	delete g.properties.GLOBALID;
	delete g.properties.ORDNAME;
	delete g.properties.ORDLINK;

g.properties.bio = "I'm lot "+g.properties.OBJECTID+" at "+g.properties.SITEADDRES.toLowerCase()+". I'm vry "+o.adjective+"; originally from "+o.hometown+"; and the celebrity whose car I would most like to park is "+o.celebrity+"."
return g;
})//map

G.features=features;
resolve(G)

})//promise
}//extant


const main = async () =>{

const raw = await getSupply();
const pantheon = await getPantheon();
const supply = await setSupply(raw,pantheon);
FS.writeFile('/tmp/lots-atl.geojson',JSON.stringify(supply),(e,d)=>{
	if(e){reject(e)}
		console.log("written to /tmp/lots.geojson")
})
}

main();
