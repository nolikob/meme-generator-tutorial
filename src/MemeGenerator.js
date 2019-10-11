import React, {Component} from "react";

class MemeGenerator extends Component {
    constructor(){
        super();
        this.state = {
            topText: "",
            bottomText: "",
            rndImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.checkChanges = this.checkChanges.bind(this);
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes").then(
            response => response.json()
        ).then(response => {
            this.setState({allMemeImgs: response.data.memes})
        });
    }

    checkChanges(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const randomNumber = Math.floor(Math.random(this.state.allMemeImgs.length)*100);
        this.setState(prevState => {
            const newState = {...prevState};
            newState.rndImg = prevState.allMemeImgs[randomNumber].url;
            return newState
        });
    }

    render() {
        return(
            <main>
                <form onSubmit={this.onSubmit} className="meme-form">
                    <input 
                        type="text" 
                        name="topText" 
                        value={this.state.topText} 
                        onChange={this.checkChanges} 
                        placeholder="Top text"
                    />
                    <input 
                        type="text" 
                        name="bottomText" 
                        value={this.state.bottomText} 
                        onChange={this.checkChanges} 
                        placeholder="Bottom text"
                    />
                    <button>Submit</button>
                </form>
                <div className="meme">
                    <img src={this.state.rndImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </main>
        );
    }
}

export default MemeGenerator;