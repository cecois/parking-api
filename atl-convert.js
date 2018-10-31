const __ = require('underscore')
,FS = require('fs')
;


const getSupply = async () =>{

	return new Promise((resolve,reject)=>{

		FS.readFile('./dev/atl-tax-parcel-parking.geojson',(err,res)=>{

					if(err){reject(err)} else {

						resolve(JSON.parse(res))

}//fs.Readfile.if.err.else

})//readfile

})//promise
}//extant

const setSupply = async (G) =>{

	return new Promise((resolve,reject)=>{

__.each(G,(g)=>{
	console.log("g",g);
})

resolve()

})//promise
}//extant


const main = async () =>{
const raw = await getSupply();
var supply = await setSupply(raw);

}

main();