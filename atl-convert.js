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


const getSupply = async () =>{

	return new Promise((resolve,reject)=>{

		FS.readFile('./dev/atl-tax-parcel-parking.geojson',async (err,res)=>{

					if(err){reject(err)} else {

						resolve(JSON.parse(res))

}//fs.Readfile.if.err.else

})//readfile

})//promise
}//extant

const setSupply = async (G) =>{

	return new Promise((resolve,reject)=>{

__.each(G.features,(g)=>{
	let adj=adjectives[Math.floor(Math.random()*adjectives.length)]
	console.log("rando",adj)
})

resolve()

})//promise
}//extant


const main = async () =>{
const raw = await getSupply();
var supply = await setSupply(raw);

}

main();