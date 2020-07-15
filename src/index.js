import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Thumb from './components/Thumb.js';
import Grid from './components/Grid.js';
import { isMobile } from "react-device-detect";



function redirect(url){
	window.location = url;
}

let d = {
	"text": "Uygar Köroğlu",
	"pp":"https://cdn.mos.cms.futurecdn.net/vChK6pTy3vN3KbYZ7UU7k3-1200-80.jpg",
	"func": ()=> redirect("https://larcis.github.io/QrReaderWebPage/")
};

let nof_thumbs = 10;
async function fetchMemes(url){
	let response = await fetch(url);
	return response;
}

fetchMemes(`https://meme-api.herokuapp.com/gimme/${nof_thumbs}`).then((r)=>{
	r.json().then(data => {
		console.log(data)
		let d = [];
		for(let i = 0; i < data.count; i++){
			let meme = data.memes[i];
			if(!meme.nsfw)
				d.push({
					"text": meme.title,
					"pp": meme.url,
					"func": ()=> redirect(meme.postLink)
				});
		}
		
		ReactDOM.render(<GridWrapper 
			data={d}
			gridId="1"
			thumbType="meme"
			/>, document.getElementById('root'));
	});
})

function GridWrapper(props){
	let columns = 4;
	if(isMobile)
		columns = 2;
	return <Grid
			gridId={"desktop"+props.gridId}
			thumbType={props.thumbType} 
			nof_columns={columns} 
			nof_thumbs={props.data.length} 
			data={props.data}
		/>;
}

