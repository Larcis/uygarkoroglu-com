import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import GridWrapper from './components/GridWrapper.js';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-173023235-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function redirect(url){
	window.location = url;
	ReactGA.event({
		category: 'User',
		action: 'Clicked to ' + url
	});

}

ReactDOM.render(<GridWrapper 
	data={[{
		"text": `Uygar Köroğlu - YTU CE`,
		"pp": require("./images/me.jpeg"),
		"func": ()=> redirect("https://www.linkedin.com/in/uygar-k%C3%B6ro%C4%9Flu-439a58148/")
	}]}
	gridId="1"
	thumbType="aboutme"
	/>, document.getElementById('me'));


let nof_memes = 24
let memes = [];
function fetchMemes(){
	fetch(`https://meme-api.herokuapp.com/gimme/${nof_memes}`).then((r)=>{
		r.json().then(data => {
			for(let i = 0; i < data.count; i++){
				let meme = data.memes[i];
				if(!meme.nsfw)
					memes.push({
						"text": meme.title,
						"pp": meme.url,
						"func": ()=> redirect(meme.postLink)
					});
			}
			
			ReactDOM.render(<GridWrapper 
				data={memes}
				gridId="3"
				thumbType="meme"
				/>, document.getElementById('memes'));
		});
	});
}
fetchMemes();
let interval = setInterval(()=>{
	fetchMemes();
	console.log("fetching memes...");
	if(memes.length > 130) clearInterval(interval);
}, 5000);


let works =[
	{
		"text": "A* on Image",
		"pp": require("./images/astar.png"),
		"func": ()=> redirect("https://larcis.github.io/yapayZekaHw1/")
	},
	{
		"text": "Generating Latin Squares with Genetic Algorithm",
		"pp": require("./images/latinsquare.JPG"),
		"func": ()=> redirect("https://larcis.github.io/LatinSquareWithGA/")
	},
	{
		"text": "Tic-Tac-Toe with Minimax algorithm",
		"pp": require("./images/tictactoe.png"),
		"func": ()=> redirect("https://larcis.github.io/yapayZekaDonemProjesi/")
	},
	{
		"text": "Simple maze solving with Genetic Algorithm",
		"pp": require("./images/mazesolve.JPG"),
		"func": ()=> redirect("https://larcis.github.io/yapayZekaHw2/")
	},
	{
		"text": "My Github",
		"pp": require("./images/github.png"),
		"func": ()=> redirect("https://github.com/Larcis")
	},
];

ReactDOM.render(<GridWrapper 
	data={works}
	gridId="2"
	thumbType="works"
	/>, document.getElementById('works'));