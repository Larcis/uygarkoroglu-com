import React from 'react';
import '../index.css';
import { isMobile } from "react-device-detect";

let thumbTypes = {
    meme: "thumb bluebg orangeborder", 
    aboutme: "aboutmethumb redbg orangeborder",
    works: "thumb orangebg skinborder"
}

export default class Thumb extends React.Component{
    getNeighbours(id){
        let [gridId, row, col] =  id.split('_');
        row = parseInt(row);
        col = parseInt(col);
        let coords = [
            {x: row,   y: col-1},
            {x: row,   y: col+1},
            {x: row+1, y: col},
            {x: row-1, y: col},
            {x: row-1, y: col-1},
            {x: row+1, y: col-1},
            {x: row-1, y: col+1},
            {x: row+1, y: col+1}
        ];
        let neighbours = [];
        for(let i = 0; i < coords.length; i++)
            neighbours.push(document.getElementById(gridId + "_" + coords[i].x + "_" + coords[i].y));
        return neighbours;
    }
    numOfRealNeighbours(arr){
        let count = 0;
        for(let i = 0; i < arr.length;i++){
            if(arr[i]) count++;
        }
        return count;
    }
    applyScaleLogic(div){
        let neighbours = this.getNeighbours(div.id);
        if(this.numOfRealNeighbours(neighbours) !== 8) return;
        for(let i = 0; i < neighbours.length; i++)
            if(neighbours[i]) neighbours[i].classList.add('scale-down');
        div.classList.add('scale-up');

    }
    removeScaleLogic(div){
        let neighbours = this.getNeighbours(div.id);
        if(this.numOfRealNeighbours(neighbours) !== 8) return;
        for(let i = 0; i < neighbours.length; i++)
            if(neighbours[i]) neighbours[i].classList.remove('scale-down');
        div.classList.remove('scale-up');
    }
    render(){
        return (
            <div  className={thumbTypes[this.props.thumbType]} id={this.props.id }>
                <img 
                    loading="lazy"
                    className="image" 
                    alt="" 
                    src={this.props.data.pp}  
                    onClick={this.props.data.func} 
                    onMouseEnter={(e)=>{
                        if(isMobile) return;
                        let div = e.target.parentElement;
                        this.applyScaleLogic(div);
                    }}
                    onMouseLeave={(e)=>{
                        if(isMobile) return;
                        let div = e.target.parentElement;
                        this.removeScaleLogic(div);
                    }}
                    />
                <p>{this.props.data.text}</p>
            </div>
        );
    }

}