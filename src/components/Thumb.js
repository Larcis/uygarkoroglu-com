import React from 'react';
import '../index.css';
import { isMobile } from "react-device-detect";

export default class Thumb extends React.Component{
    getNeighbours(id){
        let [row, col] =  id.split('_');
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
            neighbours.push(document.getElementById(coords[i].x+"_"+coords[i].y));
        return neighbours;
    }
    applyScaleLogic(div){
        let neighbours = this.getNeighbours(div.id);
        for(let i = 0; i < neighbours.length; i++)
            if(neighbours[i]) neighbours[i].classList.add('scale-down');
        div.classList.add('scale-up');

    }
    removeScaleLogic(div){
        let neighbours = this.getNeighbours(div.id);
        for(let i = 0; i < neighbours.length; i++)
            if(neighbours[i]) neighbours[i].classList.remove('scale-down');
        div.classList.remove('scale-up');
    }
    render(){
        return (
            <div  className="thumb bluebg orangeborder" id={this.props.id }>
                <img 
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