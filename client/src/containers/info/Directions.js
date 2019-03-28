import React, { Component } from 'react';
import '../../App.css';

class Directions extends Component {

    render() {
        console.log(this.props.index)
        console.log(this.props.directions)
        // {this.props.directions[this.props.index] ?
        //     const items = this.props.directions[this.props.index].map((_, i) => 
        //         <div 
        //             key={i} 
        //             dangerouslySetInnerHTML={{ __html: this.props.directions[this.props.index][i] }}
        //         />
        //     )
        // :
        //     <div></div>
        // }
        // const items = this.props.directions[this.props.index].map((_, i) => 
        //     <div 
        //         key={i} 
        //         dangerouslySetInnerHTML={{ __html: this.props.directions[this.props.index][i] }}
        //     />
        // )
        return (
            <div>
                {this.props.directions ?
                    this.props.directions.map((_, i) => 
                        <div 
                            key={i} 
                            dangerouslySetInnerHTML={{ __html: this.props.directions[i] }}
                        />
                    )
                :
                    <div></div>
                }
            </div>
        )
    }

}

export default Directions;