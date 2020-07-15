import React from 'react';
import '../index.css';
import Thumb from './Thumb.js';


export default class Grid extends React.Component{
    constructor(props){
        super(props);
        this.nof_columns = this.props.nof_columns;
    }
    getThumbs(index, row){
        let thumbs = [];
        for(let i= 0; i < this.nof_columns; i++){
            if((i+index) < this.props.nof_thumbs){
                thumbs.push(
                    <Thumb 
                        data={this.props.data[i + index]} 
                        id={this.props.gridId+"_"+row+"_"+i} 
                        key={this.props.gridId+"_col_"+i}
                        thumbType={this.props.thumbType}
                        />
                );
            }
        }
        return thumbs;
    }
    getRows(){
        let grid = [];
        let i = 0;
        let row = 0;
        for(i = 0; i < this.props.nof_thumbs; i+=this.nof_columns){
            grid.push(
                <div className="row" key={this.props.gridId+"_row_"+row}>
                    {
                        this.getThumbs(i, row++)
                    }
                </div>
            );
        }
        return grid;
    }
    render(){
        return (
            <div className="grid">
                {
                    this.getRows()
                }
            </div>
        );
    }

}