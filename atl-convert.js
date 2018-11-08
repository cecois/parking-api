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

const opinons_o_facts =
["I never vote."
,"the scent of leather makes me puke."
,"I own a medical-grade stethoscope."
,"I find drug addicts to be tiresome."
,"gangster movies depress my opinion of humanity."
,"necklass guys make me nervous but they're usuall ok."
,"I need a new laptop bag."
,"I don't own a TV (I do)."
,"I've never laughed at a single insurance commercial and I'm proud of it."
,"I don't have the guts to buy a wig."
,"I always felt insecure in record stores so I'm glad they're gone."
,"they spray my cracks every spring but the weeds always find a way."
,"I've fallen off both a horse and a golf cart."
,"I can't identify types of trees fer shit."
,"I had no idea Flo-Jo died!"
,"I follow too many celebrities on Instagram."
,"any impression of Owen Wilsom kills me."
,"any impression of Jimmy Stewart kills me."
,"I wish IMDB was less visually busy."
,"I think I don't know what Cricket Wireless is."
,"mix-n-match deals give me agita."
,"I've never been impressed by a dishwasher."
,"chocolate is gross."
,"I wish I invented eVite but I also wish there wz something better."
,"wooden bowls, man. Love em.."
,"I'm bad at Twitter. The RT confuses me."
,"vacuuming area rugs? Not terrible."
,"I don't understand commonwealth versus state."
,"I'm terrified of being stabbed."
,"I shiver at the thought of trauma to the throat."
,"neck injuries worry me."
,"I'd pull the plug if necessary."
,"I think cars honking in traffic is hilarious."
,"I instantly forgive anybody w/ bad teeth."
,"muscle guys - I honestly respect you."
,"sometimes I think prison sounds ok, most times it sounds like a nightmare."
,"sports? Fun. Athletes? Meh."
,"I'm *not* Sparticus! One of those guys is, I think."
,"laser tag sucks."
,"AAA batteries: ugh, amiright?"
,"I don't have the stomach for skateboarding videos."
,"I'm kind of surprised Texas hasn't seceded already."
,"I feel bad about magazines."
,"I think Snickers needs to slow its roll."
,"my oil stains bring all the boys to the yard."
,"love paisley, hate plaid."
,"if there are two things and one has stripes? Stripes. "
,"I never cried at a song, never will."
,"if imma sit yr dog imma snoop yr house."
,"if you call something a ‘floater’ be assured I’m thinking of only one thing."
,"I think McDonalds food smells bad no matter where you are."
,"Subway restaurants? I like yr sandwiches but you stink up the world."
,"I think there are too many semen-in-the-hair mainstream movies."
,"I hope to see the soles of those #PostMalone Crocs ryyyl soon."
,"my favorite movie is a documentary. Believe it."
,"I've seen more road rage than the 110, I bet."
,"I appreciate drag queens but I don't wanna hang out with 'em, is that ok?"
,"video games are sooooo advanced!"
,"I say order the lobster but you're gonna be jealous of my jalapeño burger fo sho."
,"I wonder what Priscilla Presley does all day in 2018."
,"I've never been surprised by a single entry on the most-popular-baby-names list."
,"everything rly puts evrything into perspective."
,"imma basic bitch when it comes to Christmas."
,"are blackberries the perfect food er wut?"
,"it's a gig economy, so..."
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

		let G=OG

__.each(G.features,(g)=>{

let towns=__.filter(pantheon,(f)=>{
	return (f.countryCode3=='USA' || f.countryCode3=='CAN'|| f.countryCode3=='MEX')
})
let town=towns[Math.floor(Math.random()*towns.length)]
let celeb=pantheon[Math.floor(Math.random()*pantheon.length)]

	let o=
	{
		adjective:adjectives[Math.floor(Math.random()*adjectives.length)]
		,statement:opinons_o_facts[Math.floor(Math.random()*opinons_o_facts.length)]
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
	
g.properties.bio = "I'm #atl parking lot "+g.properties.OBJECTID+" at "+g.properties.SITEADDRES.toLowerCase()+". I'm vry "+o.adjective+"; originally from "+o.hometown+"; and the celebrity whose car I would most like to park is "+o.celebrity+". Oh also: "+o.statement
g.properties.bio_short = "I'm #atl parking lot "+g.properties.OBJECTID+" at "+g.properties.SITEADDRES.toLowerCase()+". I'm vry "+o.adjective+"; originally from "+o.hometown+". Interested? "
// return g;
})//map
// G.features=features
resolve(G)

})//promise
}//extant


const main = async () =>{

const raw = await getSupply();
const pantheon = await getPantheon();
const supply = await setSupply(raw,pantheon);
FS.writeFile('/tmp/lots-atl.geojson',JSON.stringify(supply),(e,d)=>{
	if(e){reject(e)}
		console.log("written to /tmp/lots-atl.geojson")
})
}

main();
